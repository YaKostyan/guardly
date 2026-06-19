import { ChevronLeft, Crosshair, Zap } from "lucide-react";

const phaseLabels = ["Брифінг", "Чат", "Сайт", "Рішення", "Результат"];

export default function GameHud({ mission, xp, focus, maxFocus, risk, stage }) {
  const logoUrl = `${import.meta.env.BASE_URL}logo.png`;
  const riskLabel = risk >= 70 ? "Критичний" : risk >= 45 ? "Високий" : "Контрольований";

  return (
    <header className="game-hud-v2">
      <a className="hud-exit" href="#/missions" aria-label="Вийти з місії">
        <ChevronLeft size={19} aria-hidden="true" />
      </a>
      <div className="hud-brand">
        <img src={logoUrl} alt="" />
        <div>
          <span>Guardly / Місія 01</span>
          <strong>{mission.title}</strong>
        </div>
      </div>
      <div className="hud-phase" aria-label={`Етап ${stage} з 4`}>
        <span>{phaseLabels[stage]}</span>
        <div>{[1, 2, 3, 4].map((item) => <i key={item} className={stage >= item ? "active" : ""} />)}</div>
      </div>
      <div className="hud-live-stats">
        <div className="hud-xp"><Zap size={15} fill="currentColor" /> <strong>{xp}</strong><span>XP</span></div>
        <div className="hud-focus" aria-label={`Фокус ${focus} з ${maxFocus}`}>
          <Crosshair size={15} />
          <div>{Array.from({ length: maxFocus }, (_, index) => <i key={index} className={index < focus ? "active" : ""} />)}</div>
          <strong>{focus}</strong>
        </div>
        <div className={`hud-risk risk-${risk >= 70 ? "high" : risk >= 45 ? "medium" : "low"}`}>
          <span>Ризик</span><strong>{riskLabel}</strong>
        </div>
      </div>
    </header>
  );
}
