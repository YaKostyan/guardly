import {
  CheckCircle2,
  Gamepad2,
  HeartHandshake,
  Play,
  School,
  ShieldCheck,
} from "lucide-react";
import Button from "../components/Button.jsx";

const offers = [
  {
    number: "01",
    label: "Дитині",
    title: "Практика у форматі гри",
    text: "Знайомі ситуації з Roblox, Discord і повідомлень стають короткими місіями, де потрібно шукати докази та приймати рішення.",
  },
  {
    number: "02",
    label: "Батькам",
    title: "Зрозумілий результат",
    text: "Після гри видно, що дитина помітила, де помилилася та яке правило варто спокійно повторити разом.",
  },
  {
    number: "03",
    label: "Школам",
    title: "Сценарій для обговорення",
    text: "Коротку місію можна пройти на уроці та використати як основу для розмови про реальні цифрові ситуації.",
  },
];

export default function About() {
  const logoUrl = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <>
      <section className="company-hero">
        <div className="company-lockup">
          <img src={logoUrl} alt="" />
          <div><strong>Guardly</strong><span>ВІДКРИТА БЕТА</span></div>
        </div>
        <h1>Місце, де дитина може помилитися <em>без справжніх наслідків.</em></h1>
        <div className="company-hero-bottom">
          <p>
            Ми створюємо Guardly, щоб дитина тренувала безпечні рішення до зустрічі з реальною пасткою, а не після втрати акаунта.
          </p>
          <Button href="#/demo" icon={Play} analytics={{ name: "cta_click", params: { source: "about_hero", target: "demo" } }}>
            Побачити, як це працює
          </Button>
        </div>
      </section>

      <section className="company-story">
        <div className="company-section-label">ЧОМУ GUARDLY</div>
        <div className="company-story-copy">
          <h2>Діти вже живуть онлайн. Навчання має відбуватися там само.</h2>
          <p>
            Правило «не натискай на підозрілі посилання» звучить просто. Але воно перестає бути простим, коли незнайомець обіцяє подарунок, використовує знайомий логотип і квапить.
          </p>
          <p>
            Тому ми не починаємо з лекції. Ми показуємо ситуацію, даємо дитині дослідити її, зробити вибір і одразу зрозуміти наслідок.
          </p>
          <blockquote>Не вчити боятися інтернету. Вчити зупинятися, перевіряти та звертатися по допомогу.</blockquote>
          <div className="company-principles-inline">
            <p><Gamepad2 size={19} /><span><strong>Без залякування</strong>Спокійно пояснюємо ризик і наступну безпечну дію.</span></p>
            <p><HeartHandshake size={19} /><span><strong>Без сорому</strong>Помилка стає частиною навчання, а не приводом сварити.</span></p>
            <p><ShieldCheck size={19} /><span><strong>Без справжніх даних</strong>Не просимо логін, пароль, оплату або доступ до акаунтів.</span></p>
          </div>
        </div>
      </section>

      <section className="company-offer">
        <header>
          <div className="company-section-label">ЩО МИ ПРОПОНУЄМО</div>
          <h2>Не ще один курс. Тренажер конкретних рішень.</h2>
        </header>
        <div className="company-offer-rows">
          {offers.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <small>{item.label}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="company-now">
        <div>
          <div className="company-section-label">ДЕ МИ ЗАРАЗ</div>
          <h2>Ми не вдаємо, що Guardly уже великий.</h2>
          <p>Це відкрита бета. Ми почали з однієї місії та доводимо її до зрозумілого продукту, перш ніж розширювати каталог.</p>
        </div>
        <div className="company-now-list">
          <p><CheckCircle2 size={18} /><span><strong>Вже працює</strong>Повна місія про фейкові Robux</span></p>
          <p><CheckCircle2 size={18} /><span><strong>Вже працює</strong>Докази, перевірка домену та наслідки</span></p>
          <p><CheckCircle2 size={18} /><span><strong>Вже працює</strong>Підсумок і чекліст для батьків</span></p>
          <p><School size={18} /><span><strong>Перевіряємо попит</strong>Нові місії, сімейний і шкільний формати</span></p>
          <Button href="#/demo" variant="white" icon={Play} analytics={{ name: "cta_click", params: { source: "about_now", target: "demo" } }}>
            Пройти першу місію
          </Button>
        </div>
      </section>
    </>
  );
}
