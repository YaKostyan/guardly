import { ChevronDown } from "lucide-react";
import Button from "../components/Button.jsx";
import PricingCard from "../components/PricingCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { pricingPlans } from "../data/pricing.js";

const faqs = [
  ["Чи потрібна картка для демо?", "Ні. Перший квест відкривається без картки і без реєстрації."],
  ["Чи можна використовувати Guardly у класі?", "Так. Для шкіл передбачені готові уроки, статистика класу і сценарії для обговорення."],
  ["На яких платформах побудовані сценарії?", "Сценарії побудовані на Telegram, Roblox, Discord, TikTok, фейкових банківських повідомленнях і AI-фейках."],
  ["Чи потрібен батькам технічний досвід?", "Ні. Звіти написані простою мовою і пояснюють, яку навичку варто повторити."],
];

export default function Pricing() {
  return (
    <>
      <section className="page-hero compact-hero">
        <div>
          <p className="hero-badge">
            <span className="dot" />
            Ціни
          </p>
          <h1>
            Простий вибір для <em>родини</em> або класу.
          </h1>
          <p>Перша місія безкоштовно. Завжди. Без картки.</p>
        </div>
      </section>

      <section className="section-pad offwhite">
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      <section className="school-offer">
        <div>
          <p className="section-eyebrow">Для шкіл та IT-курсів</p>
          <h2>Готові уроки без зайвого навантаження на викладача</h2>
          <p>
            Даємо сценарії, матеріали для заняття, статистику класу і теми для повторення
            після кожного блоку.
          </p>
        </div>
        <Button href="#/schools" variant="white">
          Отримати пропозицію
        </Button>
      </section>

      <section className="section-pad white">
        <SectionHeader eyebrow="FAQ" title="Часті запитання" />
        <div className="faq-grid">
          {faqs.map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary>
                <span>{question}</span>
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
