export default function ProgressBar({ current, total }) {
  const progress = Math.round((current / total) * 100);

  return (
    <div className="mp-progress" aria-label={`Прогрес місії ${progress}%`}>
      <div className="mp-progress-meta">
        <span>Прогрес місії</span>
        <strong>
          {current}/{total}
        </strong>
      </div>
      <div className="mp-progress-track">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
