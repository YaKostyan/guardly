export default function EvidenceHotspot({
  item,
  state,
  onInspect,
  className = "",
  disabled = false,
  describedBy,
  children,
}) {
  const isDone = state === "found" || state === "miss";

  return (
    <button
      type="button"
      className={`evidence-hotspot ${className} ${state || ""}`}
      onClick={() => onInspect(item)}
      disabled={isDone || disabled}
      aria-label={`Перевірити: ${item.title}`}
      aria-describedby={describedBy}
    >
      {children}
    </button>
  );
}
