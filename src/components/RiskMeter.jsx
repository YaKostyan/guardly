export default function RiskMeter({ risk }) {
  const safeRisk = Math.max(0, Math.min(risk, 100));
  const label = safeRisk >= 70 ? "Критичний" : safeRisk >= 45 ? "Високий" : "Помірний";

  return (
    <div className="risk-meter">
      <div className="meter-meta">
        <span>Ризик</span>
        <strong>{label}</strong>
      </div>
      <div className="risk-track" aria-label={`Рівень ризику ${safeRisk}%`}>
        <span style={{ width: `${safeRisk}%` }} />
      </div>
    </div>
  );
}
