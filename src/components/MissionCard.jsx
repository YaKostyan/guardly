import { ArrowRight, Clock, LockKeyhole, Star } from "lucide-react";

export default function MissionCard({ mission, compact = false }) {
  const available = mission.id === "robux-scam";

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
      <div className={`mission-card-action ${available ? "available" : "locked"}`}>
        {available ? (
          <a href="#/demo">
            Розпочати місію
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        ) : (
          <span>
            <LockKeyhole size={14} aria-hidden="true" />
            Незабаром
          </span>
        )}
      </div>
    </article>
  );
}
