import { LockKeyhole, SearchCheck } from "lucide-react";

export default function DomainPuzzle({
  puzzle,
  locked,
  requiredCorrect,
  correctSelections,
  wrongSelections,
  completed,
  remainingEvidence,
  onSelect,
}) {
  return (
    <section className={`domain-puzzle ${locked ? "locked" : ""} ${completed ? "completed" : ""}`}>
      <div className="panel-head">
        <div>
          <p className="section-eyebrow">Доменна головоломка</p>
          <h3>{puzzle.title}</h3>
        </div>
        {locked ? <LockKeyhole size={20} aria-hidden="true" /> : <SearchCheck size={20} aria-hidden="true" />}
      </div>

      {locked ? (
        <p className="locked-note">
          Знайди ще {remainingEvidence} сигнал(и), щоб відкрити перевірку домену.
        </p>
      ) : (
        <>
          <div className="domain-compare-game">
            <div>
              <span>Офіційний</span>
              <strong>{puzzle.officialDomain}</strong>
            </div>
            <div className="suspect-domain">
              <span>Підозрілий</span>
              <strong>{puzzle.suspiciousDomain}</strong>
            </div>
          </div>

          <p className="domain-intro">{completed ? "Перевірка домену завершена." : puzzle.intro}</p>

          <div className="domain-options">
            {puzzle.options.map((option) => {
              const isCorrectSelected = correctSelections.includes(option.id);
              const isWrongSelected = wrongSelections.includes(option.id);
              return (
                <button
                  type="button"
                  className={`${isCorrectSelected ? "correct" : ""} ${isWrongSelected ? "wrong" : ""}`}
                  key={option.id}
                  onClick={() => onSelect(option)}
                  disabled={isCorrectSelected || isWrongSelected || completed}
                >
                  <span>{isCorrectSelected ? "Ризик знайдено" : isWrongSelected ? "Хибний слід" : "Перевірити"}</span>
                  <strong>{option.title}</strong>
                  {(isCorrectSelected || isWrongSelected) && <small>{option.detail}</small>}
                </button>
              );
            })}
          </div>

          <div className="domain-progress-note">
            {correctSelections.length}/{requiredCorrect} правильних ризиків
          </div>
        </>
      )}
    </section>
  );
}
