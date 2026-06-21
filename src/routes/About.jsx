import {
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  HeartHandshake,
  Play,
  School,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Button from "../components/Button.jsx";

const audiences = [
  {
    icon: Gamepad2,
    label: "Дітям 8-15 років",
    title: "Практика замість лекції",
    text: "Знайома ситуація з Roblox або Discord перетворюється на коротке розслідування з вибором, наслідками та XP.",
  },
  {
    icon: HeartHandshake,
    label: "Батькам",
    title: "Привід поговорити без залякування",
    text: "Після місії дорослий отримує короткий чекліст: що запитати, яке правило повторити та що показати дитині.",
  },
  {
    icon: School,
    label: "Школам і курсам",
    title: "Сценарій для живого обговорення",
    text: "Компактний формат можна пройти разом на уроці та розібрати рішення. Шкільний напрям зараз перевіряємо у відкритій бета-версії.",
  },
];

const method = [
  ["01", "Побачити ситуацію", "Дитина отримує повідомлення, посилання або прохання, схоже на те, що може трапитися насправді."],
  ["02", "Дослідити деталі", "Потрібно знайти сигнали ризику, відокремити докази від випадкових деталей і перевірити адресу сайту."],
  ["03", "Прийняти рішення", "Гравець обирає дію, бачить її наслідок і отримує коротке правило, яке легко згадати поза грою."],
];

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="hero-badge"><span className="dot" />Про Guardly</p>
          <h1>Тренажер рішень для <em>безпечного інтернету.</em></h1>
          <p>
            Guardly допомагає дітям помічати цифрові пастки до того, як вони натиснуть, введуть дані або перешлють ризик іншому.
            Не через довгі правила, а через короткі ігрові ситуації.
          </p>
          <div className="hero-ctas">
            <Button href="#/demo" icon={Play} analytics={{ name: "cta_click", params: { source: "about_hero", target: "demo" } }}>
              Спробувати місію
            </Button>
            <Button href="#/missions" variant="ghost" icon={ArrowRight} analytics={{ name: "cta_click", params: { source: "about_hero", target: "missions" } }}>
              Переглянути теми
            </Button>
          </div>
          <div className="about-trust-line">
            <span><ShieldCheck size={16} />Без реєстрації</span>
            <span><CheckCircle2 size={16} />Без справжніх посилань</span>
            <span><Sparkles size={16} />3-4 хвилини на демо</span>
          </div>
        </div>

        <div className="about-hero-path" aria-label="Як працює Guardly">
          <p>Одна місія. Три зміни у мисленні.</p>
          {method.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><small>{text}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-definition">
        <div>
          <p className="section-eyebrow">Коротка відповідь</p>
          <h2>Що саме пропонує Guardly?</h2>
        </div>
        <div className="about-definition-copy">
          <p>
            <strong>Безпечний простір для тренування помилок.</strong> Дитина бачить реалістичний сценарій, досліджує його та пробує дію без ризику для справжнього акаунта.
          </p>
          <p>
            Guardly пояснює не лише правильну відповідь, а й логіку: який сигнал був важливим, чому рішення небезпечне та що робити у схожій ситуації.
          </p>
        </div>
      </section>

      <section className="about-offer">
        <header>
          <p className="section-eyebrow">Цінність для кожного</p>
          <h2>Один сценарій, різна користь</h2>
          <p>Дитина тренується, батьки отримують основу для розмови, а викладачі бачать готовий формат для обговорення.</p>
        </header>
        <div className="about-audience-grid">
          {audiences.map(({ icon: Icon, label, title, text }) => (
            <article key={label}>
              <div><Icon size={22} /></div>
              <span>{label}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-principle">
        <div className="about-principle-copy">
          <p className="section-eyebrow">Наш підхід</p>
          <h2>Не вчимо боятися інтернету.</h2>
          <p>Вчимо зупинитися, перевірити та обрати безпечну дію.</p>
        </div>
        <div className="about-principle-list">
          <p><SearchCheck size={20} /><span><strong>Спочатку докази</strong>Гравець сам знаходить сигнали, а не отримує готову відповідь.</span></p>
          <p><Gamepad2 size={20} /><span><strong>Наслідок має значення</strong>Результат залежить від дослідження, помилок і фінального рішення.</span></p>
          <p><ShieldCheck size={20} /><span><strong>Безпечна симуляція</strong>У грі немає справжнього входу, платежів або переходу на небезпечні сайти.</span></p>
        </div>
      </section>

      <section className="about-beta">
        <div>
          <p className="section-eyebrow">Відкрита бета</p>
          <h2>Що вже можна спробувати</h2>
          <p>Guardly розвивається відкрито. Зараз доступна одна завершена безкоштовна місія про фейкові Robux.</p>
        </div>
        <ul>
          <li><CheckCircle2 size={18} />Інтерактивний чат із прихованими доказами</li>
          <li><CheckCircle2 size={18} />Перевірка підозрілого домену</li>
          <li><CheckCircle2 size={18} />XP, рейтинг і пояснення наслідків</li>
          <li><CheckCircle2 size={18} />Підсумковий чекліст для батьків</li>
        </ul>
      </section>

      <section className="about-final-cta">
        <p>Найкращий спосіб зрозуміти Guardly</p>
        <h2>Пройди одну місію як гравець.</h2>
        <Button href="#/demo" variant="white" icon={Play} analytics={{ name: "cta_click", params: { source: "about_bottom", target: "demo" } }}>
          Почати безкоштовно
        </Button>
      </section>
    </>
  );
}
