import { Clock, Star } from "lucide-react";

export default function MissionCard({ mission, compact = false }) {
  return (
    <article className={`mission-card ${compact ? "mission-card-compact" : ""}`}>
      <div className={`mission-icon ${mission.tone}`}>{mission.icon}</div>
      <div className="mission-kicker">{mission.categoryLabel}</div>
      <h3>{mission.title}</h3>
      <p>{mission.description}</p>
      <div className="mission-meta">
        <span>
          <Clock size={14} aria-hidden="true" />
          {mission.duration}
        </span>
        <span>
          <Star size={14} aria-hidden="true" />
          Рів. {mission.level}
        </span>
        <strong>+{mission.xp} XP</strong>
      </div>
      <div className="mission-platforms">
        {mission.platforms.map((platform) => (
          <span key={platform}>{platform}</span>
        ))}
      </div>
    </article>
  );
}
