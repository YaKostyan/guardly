export default function XPToast({ toast }) {
  if (!toast) return null;
  const amount = Number(toast.xp || 0);
  const prefix = amount > 0 ? "+" : "";

  return (
    <div className={`xp-toast ${amount < 0 ? "penalty" : ""}`} role="status">
      <strong>{prefix}{amount} XP</strong>
      <span>{toast.text}</span>
    </div>
  );
}
