import { Ban, ExternalLink, Forward, KeyRound, MessageSquareWarning, ShieldAlert } from "lucide-react";

const actionIcons = {
  "open-link": ExternalLink,
  "login-only": KeyRound,
  "block-report": Ban,
  "send-friend": Forward,
};

export default function FinalActionPanel({ mission, actions, onChoose }) {
  return (
    <section className="decision-scene">
      <div className="decision-stage-copy">
        <span>03 · Фінальне рішення</span>
        <h1>Ти викрив підробку.<br />Що робитимеш тепер?</h1>
        <p>Останній крок впливає на безпеку акаунта. Обери одну дію.</p>
      </div>
      <div className="suspect-profile-card">
        <div className="profile-cover"><ShieldAlert size={30} /></div>
        <div className="profile-avatar-large">RD<i /></div>
        <div className="profile-details">
          <span>ПІДОЗРІЛИЙ ПРОФІЛЬ</span>
          <h2>{mission.sender.nickname}</h2>
          <p>Учасник сервера від сьогодні · Спільних друзів немає</p>
          <div><strong>Gift helper</strong><span>Неофіційна роль</span></div>
        </div>
      </div>
      <div className="decision-actions-v2">
        {actions.map((action) => {
          const Icon = actionIcons[action.id] || MessageSquareWarning;
          return (
            <button type="button" key={action.id} onClick={() => onChoose(action)}>
              <span><Icon size={21} /></span>
              <div><b>{action.letter}</b><strong>{action.label}</strong></div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
