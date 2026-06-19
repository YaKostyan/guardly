import { Check, Crosshair, Eye, Link2, ShieldAlert } from "lucide-react";

export default function EvidencePanel({ foundEvidence, requiredEvidence, mistakes, openedLink }) {
  const remaining = Math.max(requiredEvidence - foundEvidence.length, 0);
  return (
    <aside className="detective-notebook">
      <div className="notebook-title">
        <div><Crosshair size={18} /><span>Режим детектива</span></div>
        <strong>{Math.min(foundEvidence.length, requiredEvidence)}/{requiredEvidence}</strong>
      </div>
      <p className="notebook-objective">
        {remaining ? `Знайди ще ${remaining} ${remaining === 1 ? "сигнал" : "сигнали"}` : "Доказів достатньо. Час перевірити сайт."}
      </p>
      <div className="evidence-slots">
        {Array.from({ length: requiredEvidence }, (_, index) => {
          const item = foundEvidence[index];
          return item ? (
            <div className="evidence-slot filled" key={item.id}><Check size={15} /><span>{item.title}</span></div>
          ) : (
            <div className="evidence-slot" key={index}><Eye size={15} /><span>Невідомий сигнал</span></div>
          );
        })}
      </div>
      <div className="notebook-status">
        <span><ShieldAlert size={14} /> Помилки: {mistakes}</span>
        {openedLink && <span className="danger"><Link2 size={14} /> Посилання відкрито</span>}
      </div>
    </aside>
  );
}
