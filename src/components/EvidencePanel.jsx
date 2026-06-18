import { CheckCircle2, LockKeyhole, Search, ShieldAlert } from "lucide-react";

export default function EvidencePanel({
  foundEvidence,
  requiredEvidence,
  domainUnlocked,
  domainCompleted,
  finalUnlocked,
  mistakes,
  openedLink,
}) {
  const remaining = Math.max(requiredEvidence - foundEvidence.length, 0);

  return (
    <aside className="evidence-panel game-inventory">
      <div className="evidence-panel-head">
        <div>
          <p className="section-eyebrow">Інвентар доказів</p>
          <h3>Сигнали ризику</h3>
        </div>
        <div className="evidence-count">{foundEvidence.length}</div>
      </div>

      <div className="evidence-goal">
        <Search size={18} aria-hidden="true" />
        <span>
          {domainUnlocked
            ? "Перевірка домену відкрита."
            : `Знайди ще ${remaining} сигнал(и), щоб відкрити перевірку домену.`}
        </span>
      </div>

      <div className="evidence-list">
        {foundEvidence.length ? (
          foundEvidence.map((signal) => (
            <div className="evidence-item" key={signal.id}>
              <CheckCircle2 size={16} aria-hidden="true" />
              <div>
                <strong>{signal.title}</strong>
                <p>{signal.detail}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="evidence-empty">
            Оглянь чат. Клікай те, що справді виглядає ризиково.
          </div>
        )}
      </div>

      <div className={`unlock-row ${domainUnlocked ? "ready" : ""}`}>
        {domainUnlocked ? <CheckCircle2 size={16} /> : <LockKeyhole size={16} />}
        <span>Доменна головоломка</span>
      </div>
      <div className={`unlock-row ${domainCompleted ? "ready" : ""}`}>
        {domainCompleted ? <CheckCircle2 size={16} /> : <LockKeyhole size={16} />}
        <span>Домен перевірено</span>
      </div>
      <div className={`unlock-row ${finalUnlocked ? "ready" : ""}`}>
        {finalUnlocked ? <CheckCircle2 size={16} /> : <LockKeyhole size={16} />}
        <span>Фінальне рішення</span>
      </div>

      <div className={`mistake-card ${openedLink ? "danger" : ""}`}>
        <ShieldAlert size={17} aria-hidden="true" />
        <span>
          Помилки: {mistakes}
          {openedLink ? " · посилання відкрито" : ""}
        </span>
      </div>
    </aside>
  );
}
