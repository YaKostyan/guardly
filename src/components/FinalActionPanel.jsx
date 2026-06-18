export default function FinalActionPanel({
  actions,
  locked,
  selectedId,
  onSelect,
  onFinish,
  lockReason,
}) {
  return (
    <section className={`final-action-panel ${locked ? "locked" : ""}`}>
      <div className="panel-head">
        <div>
          <p className="section-eyebrow">Фінальне рішення</p>
          <h3>Що робиш після перевірки?</h3>
        </div>
      </div>

      {locked ? <p className="locked-note">{lockReason}</p> : null}

      <div className="final-action-grid">
        {actions.map((action) => (
          <button
            type="button"
            className={selectedId === action.id ? "selected" : ""}
            key={action.id}
            onClick={() => onSelect(action)}
            disabled={locked}
          >
            <span>{action.letter}</span>
            <strong>{action.label}</strong>
          </button>
        ))}
      </div>

      <button
        className="mp-primary finish-action"
        type="button"
        onClick={onFinish}
        disabled={locked || !selectedId}
      >
        Завершити місію
      </button>
    </section>
  );
}
