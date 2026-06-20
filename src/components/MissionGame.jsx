import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Clock3, LockKeyhole, MessageCircle, SearchCheck, ShieldCheck } from "lucide-react";
import ChatInvestigationScene from "./ChatInvestigationScene.jsx";
import DomainPuzzle from "./DomainPuzzle.jsx";
import EvidencePanel from "./EvidencePanel.jsx";
import FinalActionPanel from "./FinalActionPanel.jsx";
import GameHud from "./GameHud.jsx";
import ResultScreen from "./ResultScreen.jsx";
import XPToast from "./XPToast.jsx";
import { trackEvent } from "../lib/analytics.js";

function clampRisk(value) {
  return Math.max(0, Math.min(value, 100));
}

function getRank(ranks, score) {
  return ranks.find((rank) => score >= rank.minScore) || ranks[ranks.length - 1];
}

function calculateResult({ mission, evidenceCount, domainCompleted, selectedAction, focus, penaltyXp, openedLink, finishReason }) {
  const evidenceXp = evidenceCount * mission.scoring.evidence;
  const domainXp = domainCompleted ? mission.scoring.domainComplete : 0;
  const finalXp = selectedAction?.correct && finishReason === "complete" ? mission.scoring.finalCorrect : 0;
  const bonusXp = selectedAction?.correct && focus >= 4 && !openedLink ? mission.scoring.highFocusBonus : 0;
  const score = Math.max(0, evidenceXp + domainXp + finalXp + penaltyXp + bonusXp);
  const rank = getRank(mission.ranks, score);
  const outcome = finishReason === "focus" || !selectedAction?.correct
    ? "bad"
    : score >= 280
      ? "excellent"
      : "medium";

  return {
    evidenceXp,
    domainXp,
    finalXp,
    bonusXp,
    penaltyXp,
    score,
    rank,
    outcome,
    actionId: selectedAction?.id,
  };
}

export default function MissionGame({ mission }) {
  const evidenceSignals = useMemo(() => mission.hotspots.filter((item) => item.type === "evidence"), [mission]);
  const hotspotById = useMemo(() => new Map(mission.hotspots.map((item) => [item.id, item])), [mission]);
  const [phase, setPhase] = useState("briefing");
  const [foundEvidenceIds, setFoundEvidenceIds] = useState([]);
  const [clickedDecoyIds, setClickedDecoyIds] = useState([]);
  const [domainCorrectIds, setDomainCorrectIds] = useState([]);
  const [domainWrongIds, setDomainWrongIds] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [focus, setFocus] = useState(mission.startFocus);
  const [risk, setRisk] = useState(mission.startRisk);
  const [mistakes, setMistakes] = useState(0);
  const [penaltyXp, setPenaltyXp] = useState(0);
  const [openedLink, setOpenedLink] = useState(false);
  const [finishReason, setFinishReason] = useState(null);
  const [toast, setToast] = useState(null);
  const [tutorialActive, setTutorialActive] = useState(true);
  const completionTracked = useRef(false);

  const foundEvidence = useMemo(
    () => foundEvidenceIds.map((id) => hotspotById.get(id)).filter(Boolean),
    [foundEvidenceIds, hotspotById],
  );
  const missedEvidence = useMemo(
    () => evidenceSignals.filter((item) => !foundEvidenceIds.includes(item.id)),
    [evidenceSignals, foundEvidenceIds],
  );
  const domainCompleted = domainCorrectIds.length >= mission.requiredDomainCorrect;
  const liveXp = Math.max(
    0,
    foundEvidenceIds.length * mission.scoring.evidence +
      (domainCompleted ? mission.scoring.domainComplete : 0) +
      penaltyXp,
  );
  const stage = phase === "briefing" ? 0 : phase === "chat" ? 1 : phase === "domain" ? 2 : phase === "action" ? 3 : 4;
  const result = calculateResult({
    mission,
    evidenceCount: foundEvidenceIds.length,
    domainCompleted,
    selectedAction,
    focus,
    penaltyXp,
    openedLink,
    finishReason,
  });

  useEffect(() => {
    if (phase === "briefing") completionTracked.current = false;
    if (phase === "result" && !completionTracked.current) {
      completionTracked.current = true;
      trackEvent("mission_complete", {
        mission_id: mission.id,
        outcome: result.outcome,
        rank: result.rank.id,
        score: result.score,
        evidence_count: foundEvidenceIds.length,
        mistakes,
      });
    }
  }, [phase]);

  function showToast(text, xp) {
    const key = Date.now();
    setToast({ text, xp, key });
    window.setTimeout(() => setToast((current) => (current?.key === key ? null : current)), 1300);
  }

  function finishByFocus() {
    setFinishReason("focus");
    setPhase("result");
  }

  function applyPenalty({ focusPenalty = 1, riskPenalty = 10, xpPenalty = mission.scoring.wrongClick, text }) {
    const nextFocus = Math.max(0, focus - focusPenalty);
    setFocus(nextFocus);
    setRisk((current) => clampRisk(current + riskPenalty));
    setMistakes((current) => current + 1);
    setPenaltyXp((current) => current + xpPenalty);
    showToast(text, xpPenalty);
    if (nextFocus === 0) window.setTimeout(finishByFocus, 450);
  }

  function inspectHotspot(item) {
    if (!item || phase !== "chat") return;
    if (tutorialActive) {
      if (item.id !== "free-robux") return;
      setTutorialActive(false);
      trackEvent("mission_tutorial_complete", { mission_id: mission.id });
    }
    if (item.type === "evidence") {
      if (foundEvidenceIds.includes(item.id)) return;
      setFoundEvidenceIds((current) => [...current, item.id]);
      setRisk((current) => clampRisk(current - 4));
      trackEvent("evidence_found", { mission_id: mission.id, evidence_id: item.id });
      showToast("Доказ знайдено", mission.scoring.evidence);
      return;
    }
    if (clickedDecoyIds.includes(item.id)) return;
    setClickedDecoyIds((current) => [...current, item.id]);
    trackEvent("mission_mistake", { mission_id: mission.id, reason: "decoy", target_id: item.id });
    applyPenalty({ text: "Хибний слід. Фокус зменшено." });
  }

  function openDangerLink() {
    if (openedLink || phase !== "chat") return;
    const danger = mission.chatMessages.find((message) => message.dangerAction)?.dangerAction;
    setOpenedLink(true);
    trackEvent("mission_mistake", { mission_id: mission.id, reason: "opened_link" });
    applyPenalty({
      focusPenalty: danger?.focusPenalty || 2,
      riskPenalty: danger?.riskPenalty || 24,
      xpPenalty: mission.scoring.openedLink,
      text: "Ти відкрив неперевірене посилання.",
    });
  }

  function selectDomainOption(option) {
    if (domainCompleted || phase !== "domain") return;
    if (domainCorrectIds.includes(option.id) || domainWrongIds.includes(option.id)) return;
    if (option.correct) {
      const nextCount = domainCorrectIds.length + 1;
      setDomainCorrectIds((current) => [...current, option.id]);
      setRisk((current) => clampRisk(current - 5));
      trackEvent("domain_signal_found", { mission_id: mission.id, signal_id: option.id });
      if (nextCount >= mission.requiredDomainCorrect) trackEvent("domain_puzzle_complete", { mission_id: mission.id });
      showToast(nextCount >= mission.requiredDomainCorrect ? "Сайт викрито" : "Ризик позначено", nextCount >= mission.requiredDomainCorrect ? mission.scoring.domainComplete : 0);
      return;
    }
    setDomainWrongIds((current) => [...current, option.id]);
    trackEvent("mission_mistake", { mission_id: mission.id, reason: "domain_decoy", target_id: option.id });
    applyPenalty({ text: "Це не доводить шахрайство." });
  }

  function finishMission(action) {
    trackEvent("final_action_selected", { mission_id: mission.id, action_id: action.id, correct: action.correct });
    setSelectedAction(action);
    setFinishReason("complete");
    window.setTimeout(() => setPhase("result"), 280);
  }

  function retry() {
    trackEvent("mission_retry", { mission_id: mission.id });
    setPhase("briefing");
    setFoundEvidenceIds([]);
    setClickedDecoyIds([]);
    setDomainCorrectIds([]);
    setDomainWrongIds([]);
    setSelectedAction(null);
    setFocus(mission.startFocus);
    setRisk(mission.startRisk);
    setMistakes(0);
    setPenaltyXp(0);
    setOpenedLink(false);
    setFinishReason(null);
    setToast(null);
    setTutorialActive(true);
  }

  function skipTutorial() {
    setTutorialActive(false);
    trackEvent("mission_tutorial_skip", { mission_id: mission.id });
  }

  if (phase === "briefing") {
    return (
      <section className="mission-game-v2 mission-intro">
        <header className="intro-topbar">
          <a className="intro-brand" href="#/" aria-label="Guardly">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
            <span>Guardly</span>
          </a>
          <div className="intro-safe-label">
            <ShieldCheck size={16} aria-hidden="true" />
            Без входу та реєстрації
          </div>
          <a className="game-exit" href="#/missions">До списку місій</a>
        </header>

        <div className="intro-content">
          <p className="intro-kicker">Безпечна навчальна симуляція</p>
          <h1>
            Безкоштовні Robux: <span>перевір пропозицію</span>
          </h1>
          <p className="intro-copy">
            Ти побачиш вигадану переписку та потренуєшся помічати шахрайські сигнали,
            не ризикуючи справжнім акаунтом.
          </p>

          <div className="intro-safety-note">
            <div><LockKeyhole size={20} aria-hidden="true" /></div>
            <p>
              <strong>Тут безпечно</strong>
              <span>Ми не просимо логін, пароль чи особисті дані. Усі посилання працюють лише всередині гри.</span>
            </p>
          </div>

          <div className="intro-steps" aria-label="Етапи місії">
            <div>
              <span><MessageCircle size={18} aria-hidden="true" /></span>
              <p><b>1. Переглянь чат</b><small>Звертай увагу на деталі</small></p>
            </div>
            <div>
              <span><SearchCheck size={18} aria-hidden="true" /></span>
              <p><b>2. Перевір сайт</b><small>Порівняй адресу й запити</small></p>
            </div>
            <div>
              <span><ShieldCheck size={18} aria-hidden="true" /></span>
              <p><b>3. Обери дію</b><small>Захисти свій акаунт</small></p>
            </div>
          </div>

          <div className="intro-action-row">
            <button className="game-start" type="button" onClick={() => { trackEvent("mission_start", { mission_id: mission.id }); setPhase("chat"); }}>
              Розпочати місію
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p>Можна помилятися — це тренування.</p>
          </div>

          <div className="intro-meta">
            <span><Clock3 size={14} aria-hidden="true" /> 3–4 хвилини</span>
            <span><ShieldCheck size={14} aria-hidden="true" /> Без справжніх посилань</span>
            <span><SearchCheck size={14} aria-hidden="true" /> Пояснення після гри</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mission-game-v2 phase-${phase}`}>
      <GameHud mission={mission} xp={phase === "result" ? result.score : liveXp} focus={focus} maxFocus={mission.startFocus} risk={risk} stage={stage} />
      <div className="game-toast-layer" aria-live="polite"><XPToast toast={toast} /></div>

      {phase === "chat" && (
        <div className="game-scene-layout">
          <ChatInvestigationScene
            mission={mission}
            foundEvidence={foundEvidenceIds}
            clickedDecoys={clickedDecoyIds}
            openedLink={openedLink}
            tutorialActive={tutorialActive}
            onInspect={inspectHotspot}
            onOpenDangerLink={openDangerLink}
            onSkipTutorial={skipTutorial}
          />
          <EvidencePanel
            foundEvidence={foundEvidence}
            requiredEvidence={mission.requiredEvidence}
            mistakes={mistakes}
            openedLink={openedLink}
          />
          {foundEvidenceIds.length >= mission.requiredEvidence && (
            <button className="scene-next" type="button" onClick={() => { trackEvent("mission_phase", { mission_id: mission.id, phase: "domain" }); setPhase("domain"); }}>
              Перевірити сайт у безпечному режимі
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {phase === "domain" && (
        <DomainPuzzle
          puzzle={mission.domainPuzzle}
          requiredCorrect={mission.requiredDomainCorrect}
          correctSelections={domainCorrectIds}
          wrongSelections={domainWrongIds}
          completed={domainCompleted}
          onSelect={selectDomainOption}
          onContinue={() => { trackEvent("mission_phase", { mission_id: mission.id, phase: "action" }); setPhase("action"); }}
        />
      )}

      {phase === "action" && (
        <FinalActionPanel mission={mission} actions={mission.actions} onChoose={finishMission} />
      )}

      {phase === "result" && (
        <ResultScreen mission={mission} result={result} foundEvidence={foundEvidence} missedEvidence={missedEvidence} onRetry={retry} />
      )}
    </section>
  );
}
