import { AlertTriangle, CheckCircle2, RotateCcw, Sparkles, Trophy } from "lucide-react";
import BadgeUnlock from "./BadgeUnlock.jsx";

export default function ResultScreen({
  mission,
  result,
  foundEvidence,
  missedEvidence,
  onRetry,
}) {
  const success = result.outcome !== "bad";
  const Icon = success ? CheckCircle2 : AlertTriangle;
  const title =
    result.outcome === "excellent"
      ? mission.result.excellentTitle
      : result.outcome === "medium"
        ? mission.result.mediumTitle
        : mission.result.badTitle;
  const copy =
    result.outcome === "excellent"
      ? mission.result.excellentExplanation
      : result.outcome === "medium"
        ? mission.result.mediumExplanation
        : mission.result.wrongExplanation;

  return (
    <section className={`result-screen ${success ? "success" : "warning"}`}>
      <div className="game-result-hero">
        <div className="result-icon">
          <Icon size={32} aria-hidden="true" />
        </div>
        <div>
          <p className="section-eyebrow">Ранг {result.rank.id}</p>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
      </div>

      <div className="result-grid">
        <div className="xp-result-card">
          <Trophy size={30} aria-hidden="true" />
          <span>Підсумковий XP</span>
          <strong className="xp-reveal">{result.score}</strong>
          <p>{result.rank.title}</p>
        </div>

        <BadgeUnlock badge={mission.badge} unlocked={success && result.rank.id !== "C"} />

        <div className="skill-card">
          <Sparkles size={22} aria-hidden="true" />
          <span>Навичка</span>
          <strong>{mission.badge.skill}</strong>
          <p>Перевіряй відправника, домен, запит на вхід і тиск часу до будь-якої дії.</p>
        </div>
      </div>

      <div className="score-breakdown">
        <div>
          <span>Докази</span>
          <strong>+{result.evidenceXp}</strong>
        </div>
        <div>
          <span>Домен</span>
          <strong>{result.domainXp ? `+${result.domainXp}` : "0"}</strong>
        </div>
        <div>
          <span>Рішення</span>
          <strong>{result.finalXp ? `+${result.finalXp}` : "0"}</strong>
        </div>
        <div>
          <span>Помилки</span>
          <strong>{result.penaltyXp}</strong>
        </div>
        <div>
          <span>Бонус фокуса</span>
          <strong>{result.bonusXp ? `+${result.bonusXp}` : "0"}</strong>
        </div>
      </div>

      <div className="result-review-grid">
        <div className="review-card">
          <p className="section-eyebrow">Знайдені докази</p>
          <ul>
            {foundEvidence.length ? (
              foundEvidence.map((signal) => <li key={signal.id}>{signal.title}</li>)
            ) : (
              <li>Докази не зібрано.</li>
            )}
          </ul>
        </div>
        <div className="review-card">
          <p className="section-eyebrow">{mission.result.missedTitle}</p>
          <ul>
            {missedEvidence.length ? (
              missedEvidence.map((signal) => <li key={signal.id}>{signal.title}</li>)
            ) : (
              <li>Ти знайшов усі ключові сигнали у чаті.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="parent-checklist">
        <p className="section-eyebrow">Чеклист для батьків</p>
        <ul>
          {mission.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mission-actions">
        <button className="mp-secondary" type="button" onClick={onRetry}>
          <RotateCcw size={17} aria-hidden="true" />
          Пройти ще раз
        </button>
        <a className="mp-primary link" href="#/missions">
          До місій
        </a>
      </div>
    </section>
  );
}
