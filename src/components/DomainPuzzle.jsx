import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleAlert, Lock, MoreVertical, RefreshCw, ShieldCheck, Star, X } from "lucide-react";

export default function DomainPuzzle({ puzzle, requiredCorrect, correctSelections, wrongSelections, completed, onSelect, onContinue }) {
  const options = new Map(puzzle.options.map((option) => [option.id, option]));

  function marker(id, children, className = "") {
    const option = options.get(id);
    const correct = correctSelections.includes(id);
    const wrong = wrongSelections.includes(id);
    return (
      <button
        type="button"
        className={`browser-clue ${className} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
        onClick={() => onSelect(option)}
        disabled={correct || wrong || completed}
        aria-label={`Перевірити: ${option.title}`}
      >
        {children}
        {(correct || wrong) && <i>{correct ? <Check size={12} /> : <X size={12} />}</i>}
      </button>
    );
  }

  return (
    <section className="domain-lab-scene">
      <div className="lab-instruction">
        <div className="lab-step-number">02</div>
        <div><span>Безпечна лабораторія</span><h1>Що не так із цим сайтом?</h1><p>Познач 3 деталі, які доводять, що сторінка підроблена. Помилковий вибір забирає фокус.</p></div>
        <strong>{correctSelections.length}/{requiredCorrect}</strong>
      </div>

      <div className="browser-window-game">
        <div className="browser-tabs">
          <div className="browser-dots"><i /><i /><i /></div>
          <div className="browser-tab"><span>R</span> Отримати 5000 Robux <X size={13} /></div>
          <div className="new-tab">+</div>
        </div>
        <div className="browser-toolbar">
          <ArrowLeft size={17} /><ArrowRight size={17} /><RefreshCw size={15} />
          <div className="browser-address">
            {marker("https-safe", <Lock size={14} />, "lock-clue")}
            <span>https://</span>
            {marker("domain-name", <b>rbx-gift</b>, "address-clue")}
            {marker("example-zone", <b>.example</b>, "address-clue")}
            <span>/claim-now</span>
          </div>
          <Star size={16} /><MoreVertical size={17} />
        </div>

        <div className="fake-site-page">
          <header className="fake-site-header">
            <div className="fake-wordmark">RBX<span>REWARDS</span></div>
            <nav><span>Головна</span><span>Нагороди</span><span>Підтримка</span></nav>
          </header>
          <div className="fake-site-main">
            <div className="reward-visual">
              <div className="reward-coin">R$</div>
              <i className="coin-one">R$</i><i className="coin-two">R$</i><i className="coin-three">R$</i>
              <strong>5 000</strong><span>ROBUX</span>
            </div>
            <div className="fake-login-card">
              <span className="fake-verified"><ShieldCheck size={14} /> Нагороду зарезервовано</span>
              <h2>Підтвердь свій акаунт</h2>
              <p>Увійди через Roblox, щоб миттєво отримати Robux.</p>
              <label>Ім'я користувача<input tabIndex="-1" readOnly placeholder="Твій логін" /></label>
              <label>Пароль<input tabIndex="-1" readOnly type="password" placeholder="••••••••" /></label>
              {marker("login-gift", <span>Увійти й отримати 5 000 Robux <ChevronRight size={16} /></span>, "login-clue")}
              <small>Залишилося 04:38 · Після завершення таймера нагорода зникне</small>
            </div>
          </div>
          <footer className="fake-site-footer">
            <span>© 2026 RBX Rewards</span>
            {marker("red-link", <span><CircleAlert size={13} /> Червона кнопка</span>, "color-clue")}
          </footer>
        </div>
      </div>

      <div className="lab-feedback-row">
        <div>
          <CircleAlert size={17} />
          <span>{completed ? "Три докази збігаються: це фішингова сторінка." : "Порада: дивись на адресу сайту та на те, що він просить зробити."}</span>
        </div>
        {completed && <button type="button" onClick={onContinue}>Повернутися до чату <ArrowRight size={17} /></button>}
      </div>
    </section>
  );
}
