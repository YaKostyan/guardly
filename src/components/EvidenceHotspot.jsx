export default function EvidenceHotspot({
  item,
  state,
  onInspect,
  className = "",
  children,
}) {
  const isDone = state === "found" || state === "miss";

  return (
    <button
      type="button"
      className={`evidence-hotspot ${className} ${state || ""}`}
      onClick={() => onInspect(item)}
      disabled={isDone}
      aria-label={`Перевірити: ${item.title}`}
    >
      {children}
    </button>
  );
}
