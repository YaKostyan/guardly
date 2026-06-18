import { useMemo, useState } from "react";
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
  const bonusXp =
    selectedAction?.correct && finishReason === "complete" && focus >= 4 && !openedLink
      ? mission.scoring.highFocusBonus
      : 0;
  const score = Math.max(0, evidenceXp + domainXp + finalXp + penaltyXp + bonusXp);
  const rank = getRank(mission.ranks, score);
  const outcome =
    finishReason === "focus" || !selectedAction?.correct
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
  };
}

export default function MissionGame({ mission }) {
  const evidenceSignals = useMemo(
    () => mission.hotspots.filter((item) => item.type === "evidence"),
    [mission],
  );
  const hotspotById = useMemo(
    () => new Map(mission.hotspots.map((item) => [item.id, item])),
    [mission],
  );

  const [started, setStarted] = useState(false);
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
  const [finished, setFinished] = useState(false);
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

  const domainUnlocked = foundEvidenceIds.length >= mission.requiredEvidence;
  const domainCompleted = domainCorrectIds.length >= mission.requiredDomainCorrect;
  const finalUnlocked = domainUnlocked && domainCompleted && focus > 0;
  const liveXp = Math.max(
    0,
    foundEvidenceIds.length * mission.scoring.evidence +
      (domainCompleted ? mission.scoring.domainComplete : 0) +
      penaltyXp,
  );
  const stage = finished ? 4 : finalUnlocked ? 3 : domainUnlocked ? 2 : started ? 1 : 1;
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
    setToast({ text, xp, key: Date.now() });
    window.setTimeout(() => setToast(null), 1150);
  }

  function applyPenalty({ focusPenalty = 1, riskPenalty = 10, xpPenalty = mission.scoring.wrongClick, text }) {
    const nextFocus = Math.max(0, focus - focusPenalty);
    setFocus(nextFocus);
    setRisk((current) => clampRisk(current + riskPenalty));
    setMistakes((current) => current + 1);
    setPenaltyXp((current) => current + xpPenalty);
    showToast(text, xpPenalty);

    if (nextFocus === 0) {
      setFinishReason("focus");
      setFinished(true);
    }
  }

  function inspectHotspot(item) {
    if (!item || finished) return;

    if (item.type === "evidence") {
      if (foundEvidenceIds.includes(item.id)) return;
      setFoundEvidenceIds((current) => [...current, item.id]);
      setRisk((current) => clampRisk(current - 4));
      showToast("Доказ знайдено", mission.scoring.evidence);
      return;
    }

    if (clickedDecoyIds.includes(item.id)) return;
    setClickedDecoyIds((current) => [...current, item.id]);
    applyPenalty({
      text: "Це не головна ознака. Шукай уважніше.",
    });
  }

  function openDangerLink() {
    if (openedLink || finished) return;
    const danger = mission.chatMessages.find((message) => message.dangerAction)?.dangerAction;
    setOpenedLink(true);
    applyPenalty({
      focusPenalty: danger?.focusPenalty || 2,
      riskPenalty: danger?.riskPenalty || 24,
      xpPenalty: mission.scoring.openedLink,
      text: "Посилання відкрито. Ризик зріс.",
    });
  }

  function selectDomainOption(option) {
    if (!domainUnlocked || domainCompleted || finished) return;
    if (domainCorrectIds.includes(option.id) || domainWrongIds.includes(option.id)) return;

    if (option.correct) {
      const nextCorrectCount = domainCorrectIds.length + 1;
      setDomainCorrectIds((current) => [...current, option.id]);
      setRisk((current) => clampRisk(current - 5));
      showToast(
        nextCorrectCount >= mission.requiredDomainCorrect ? "Домен перевірено" : "Ризик домену знайдено",
        nextCorrectCount >= mission.requiredDomainCorrect ? mission.scoring.domainComplete : 0,
      );
      return;
    }

    setDomainWrongIds((current) => [...current, option.id]);
    applyPenalty({
      text: "Хибний слід у домені.",
    });
  }

  function finishMission() {
    if (!finalUnlocked || !selectedAction) return;
    setFinishReason("complete");
    setFinished(true);
  }

  function retry() {
    setStarted(false);
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
    setFinished(false);
    setFinishReason(null);
    setToast(null);
  }

  return (
    <section className="mission-game investigation-game">
      <GameHud
        mission={mission}
        xp={finished ? result.score : liveXp}
        evidenceCount={foundEvidenceIds.length}
        totalEvidence={evidenceSignals.length}
        focus={focus}
        maxFocus={mission.startFocus}
        risk={risk}
        stage={stage}
      />

      <div className="xp-toast-slot" aria-live="polite">
        <XPToast toast={toast} />
      </div>

      {!started ? (
        <div className="game-briefing">
          <div>
            <p className="section-eyebrow">Брифінг</p>
            <h3>Розслідуй повідомлення</h3>
            <p>{mission.briefing}</p>
          </div>
          <button className="mp-primary" type="button" onClick={() => setStarted(true)}>
            Почати розслідування
          </button>
        </div>
      ) : finished ? (
        <ResultScreen
          mission={mission}
          result={result}
          foundEvidence={foundEvidence}
          missedEvidence={missedEvidence}
          onRetry={retry}
        />
      ) : (
        <div className="investigation-board">
          <ChatInvestigationScene
            mission={mission}
            foundEvidence={foundEvidenceIds}
            clickedDecoys={clickedDecoyIds}
            openedLink={openedLink}
            onInspect={inspectHotspot}
            onOpenDangerLink={openDangerLink}
          />

          <div className="investigation-panel">
            <EvidencePanel
              foundEvidence={foundEvidence}
              requiredEvidence={mission.requiredEvidence}
              domainUnlocked={domainUnlocked}
              domainCompleted={domainCompleted}
              finalUnlocked={finalUnlocked}
              mistakes={mistakes}
              openedLink={openedLink}
            />

            <DomainPuzzle
              puzzle={mission.domainPuzzle}
              locked={!domainUnlocked}
              requiredCorrect={mission.requiredDomainCorrect}
              correctSelections={domainCorrectIds}
              wrongSelections={domainWrongIds}
              completed={domainCompleted}
              remainingEvidence={Math.max(mission.requiredEvidence - foundEvidenceIds.length, 0)}
              onSelect={selectDomainOption}
            />

            <FinalActionPanel
              actions={mission.actions}
              locked={!finalUnlocked}
              selectedId={selectedAction?.id}
              onSelect={setSelectedAction}
              onFinish={finishMission}
              lockReason={
                domainUnlocked
                  ? "Заверши доменну головоломку, щоб обрати дію."
                  : "Збери 3 докази і перевір домен."
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}
