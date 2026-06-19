import { useMemo, useState } from "react";
import { ArrowRight, Headphones, Play, ShieldCheck } from "lucide-react";
import ChatInvestigationScene from "./ChatInvestigationScene.jsx";
import DomainPuzzle from "./DomainPuzzle.jsx";
import EvidencePanel from "./EvidencePanel.jsx";
import FinalActionPanel from "./FinalActionPanel.jsx";
import GameHud from "./GameHud.jsx";
import ResultScreen from "./ResultScreen.jsx";
import XPToast from "./XPToast.jsx";

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

  return { evidenceXp, domainXp, finalXp, bonusXp, penaltyXp, score, rank, outcome };
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
    if (item.type === "evidence") {
      if (foundEvidenceIds.includes(item.id)) return;
      setFoundEvidenceIds((current) => [...current, item.id]);
      setRisk((current) => clampRisk(current - 4));
      showToast("Доказ знайдено", mission.scoring.evidence);
      return;
    }
    if (clickedDecoyIds.includes(item.id)) return;
    setClickedDecoyIds((current) => [...current, item.id]);
    applyPenalty({ text: "Хибний слід. Фокус зменшено." });
  }

  function openDangerLink() {
    if (openedLink || phase !== "chat") return;
    const danger = mission.chatMessages.find((message) => message.dangerAction)?.dangerAction;
    setOpenedLink(true);
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
      showToast(nextCount >= mission.requiredDomainCorrect ? "Сайт викрито" : "Ризик позначено", nextCount >= mission.requiredDomainCorrect ? mission.scoring.domainComplete : 0);
      return;
    }
    setDomainWrongIds((current) => [...current, option.id]);
    applyPenalty({ text: "Це не доводить шахрайство." });
  }

  function finishMission(action) {
    setSelectedAction(action);
    setFinishReason("complete");
    window.setTimeout(() => setPhase("result"), 280);
  }

  function retry() {
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
  }

  if (phase === "briefing") {
    return (
      <section className="mission-game-v2 mission-intro">
        <a className="game-exit" href="#/missions">Вийти з місії</a>
        <div className="intro-signal" aria-hidden="true">
          <ShieldCheck size={34} />
          <span />
        </div>
        <p className="intro-kicker">Guardly · Демо-місія 01</p>
        <h1>{mission.title}</h1>
        <p className="intro-copy">{mission.briefing}</p>
        <div className="mission-order">
          <Headphones size={20} aria-hidden="true" />
          <div>
            <span>Твоє завдання</span>
            <strong>Знайди 3 сигнали небезпеки. Не тисни навмання: кожна помилка забирає фокус.</strong>
          </div>
        </div>
        <button className="game-start" type="button" onClick={() => setPhase("chat")}>
          <Play size={18} fill="currentColor" aria-hidden="true" />
          Увійти в чат
        </button>
        <p className="intro-footnote">6 фокуса · 3 етапи · приблизно 4 хвилини</p>
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
            onInspect={inspectHotspot}
            onOpenDangerLink={openDangerLink}
          />
          <EvidencePanel
            foundEvidence={foundEvidence}
            requiredEvidence={mission.requiredEvidence}
            mistakes={mistakes}
            openedLink={openedLink}
          />
          {foundEvidenceIds.length >= mission.requiredEvidence && (
            <button className="scene-next" type="button" onClick={() => setPhase("domain")}>
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
          onContinue={() => setPhase("action")}
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
