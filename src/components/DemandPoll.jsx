import { CheckCircle2, GraduationCap, Home, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "../lib/analytics.js";

const options = [
  ["child", UserRound, "Для дитини", "Хочу дати дитині безпечну практику"],
  ["family", Home, "Для родини", "Хочу бачити прогрес і теми для повторення"],
  ["school", GraduationCap, "Для школи", "Шукаю готовий формат для уроків"],
  ["curious", Sparkles, "Просто цікаво", "Стежу за ідеєю та хочу нові місії"],
];

export default function DemandPoll() {
  const [selected, setSelected] = useState(null);

  function select(value) {
    setSelected(value);
    trackEvent("demand_signal", { audience: value });
  }

  return (
    <section className="demand-section">
      <div className="demand-copy">
        <p className="section-eyebrow">Відкрита бета</p>
        <h2>Для кого ви відкрили Guardly?</h2>
        <p>Одна відповідь допоможе обрати, що розвивати першим: сімейний продукт, шкільний формат чи більше безкоштовних місій.</p>
      </div>
      <div className="demand-options" aria-label="Для кого Guardly">
        {options.map(([value, Icon, title, description]) => (
          <button
            type="button"
            className={selected === value ? "selected" : ""}
            key={value}
            onClick={() => select(value)}
            aria-pressed={selected === value}
          >
            <span>{selected === value ? <CheckCircle2 size={20} /> : <Icon size={20} />}</span>
            <div><strong>{title}</strong><small>{description}</small></div>
          </button>
        ))}
      </div>
      {selected && <p className="demand-thanks" role="status">Дякуємо. Ваш вибір зараховано без контактних даних.</p>}
    </section>
  );
}
