export default function FocusMeter({ focus, maxFocus }) {
  return (
    <div className="focus-meter" aria-label={`Фокус ${focus} з ${maxFocus}`}>
      <div className="meter-meta">
        <span>Фокус</span>
        <strong>
          {focus}/{maxFocus}
        </strong>
      </div>
      <div className="focus-dots">
        {Array.from({ length: maxFocus }, (_, index) => (
          <span key={index} className={index < focus ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}
