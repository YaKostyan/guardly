import FocusMeter from "./FocusMeter.jsx";
import ProgressBar from "./ProgressBar.jsx";
import RiskMeter from "./RiskMeter.jsx";

export default function GameHud({
  mission,
  xp,
  evidenceCount,
  totalEvidence,
  focus,
  maxFocus,
  risk,
  stage,
}) {
  return (
    <header className="game-hud">
      <div className="hud-title">
        <p className="section-eyebrow">{mission.category}</p>
        <h2>{mission.title}</h2>
      </div>

      <div className="hud-stats">
        <div className="hud-card">
          <span>XP</span>
          <strong>{xp}</strong>
        </div>
        <div className="hud-card">
          <span>Докази</span>
          <strong>
            {evidenceCount}/{totalEvidence}
          </strong>
        </div>
        <FocusMeter focus={focus} maxFocus={maxFocus} />
        <RiskMeter risk={risk} />
      </div>

      <ProgressBar current={stage} total={4} />
    </header>
  );
}
