import {
  ArrowRight,
  Check,
  Gamepad2,
  HeartHandshake,
  Play,
  School,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Button from "../components/Button.jsx";

const offer = [
  {
    number: "01",
    icon: Gamepad2,
    title: "Ігрові місії",
    text: "Дитина потрапляє у знайому ситуацію з Roblox, Discord або повідомленнями та сама шукає ознаки пастки.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Рішення з наслідками",
    text: "Guardly оцінює не лише фінальну відповідь, а й уважність, помилки та докази, знайдені під час розслідування.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Розмова після гри",
    text: "Після місії батьки отримують короткий чекліст, щоб закріпити правило без допиту, лекції або залякування.",
  },
];

export default function About() {
  return (
    <>
      <section className="story-hero">
        <div className="story-hero-copy">
          <p className="hero-badge"><span className="dot" />Про Guardly</p>
          <h1>Безпека, яку дитина <em>не просто читає.</em> Вона її проживає.</h1>
          <p>
            Guardly перетворює інтернет-ризики на короткі місії. Дитина досліджує ситуацію, приймає рішення та бачить наслідок у безпечній симуляції.
          </p>
          <div className="hero-ctas">
            <Button href="#/demo" icon={Play} analytics={{ name: "cta_click", params: { source: "about_hero", target: "demo" } }}>
              Пройти демо-місію
            </Button>
            <button className="story-text-link" type="button" onClick={() => document.getElementById("story-offer")?.scrollIntoView({ behavior: "smooth" })}>
              Що ми пропонуємо <ArrowRight size={16} />
            </button>
          </div>
          <div className="story-trust">
            <span><ShieldCheck size={16} />Без реєстрації</span>
            <span><Sparkles size={16} />3-4 хвилини</span>
            <span><Check size={16} />Без справжнього ризику</span>
          </div>
        </div>

        <div className="story-product" aria-label="Приклад місії Guardly">
          <header>
            <span><ShieldCheck size={17} />GUARDLY</span>
            <small>НАВЧАЛЬНА СИМУЛЯЦІЯ</small>
          </header>
          <div className="story-product-task">
            <small>СИТУАЦІЯ 01</small>
            <strong>Незнайомець обіцяє 5000 Robux</strong>
          </div>
          <div className="story-message">
            <span>RD</span>
            <p><strong>RbxDrop_247</strong>Тільки швидко. Увійди через Roblox, і подарунок твій.</p>
          </div>
          <div className="story-investigation">
            <p><span>1</span><b>Знайди сигнали</b><small>Обіцянка, тиск, підозрілий домен</small></p>
            <p><span>2</span><b>Перевір сайт</b><small>rbx-gift не дорівнює roblox.com</small></p>
            <p><span>3</span><b>Обери дію</b><small>Заблокувати та поскаржитися</small></p>
          </div>
          <div className="story-product-footer"><span>Рішення змінює результат</span><b>+240 XP</b></div>
        </div>
      </section>

      <section className="story-origin">
        <div>
          <p className="section-eyebrow">Чому ми це робимо</p>
          <h2>Знати правило недостатньо, коли тебе кваплять.</h2>
        </div>
        <div>
          <p>
            Дитина може знати, що не можна ділитися паролем, і все одно розгубитися перед подарунком, знайомим логотипом або повідомленням «залишилося 5 хвилин».
          </p>
          <p>
            Тому Guardly тренує не запам'ятовування термінів, а момент рішення: зупинитися, помітити сигнал, перевірити та звернутися по допомогу.
          </p>
        </div>
      </section>

      <section className="story-offer" id="story-offer">
        <header>
          <p className="section-eyebrow">Що ми пропонуємо</p>
          <h2>Одна коротка місія має навчити однієї корисної звички.</h2>
        </header>
        <div className="story-offer-list">
          {offer.map(({ number, icon: Icon, title, text }) => (
            <article key={number}>
              <span>{number}</span>
              <div><Icon size={23} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-audience">
        <header>
          <p className="section-eyebrow">Для кого</p>
          <h2>Дитина грає. Дорослі допомагають закріпити досвід.</h2>
        </header>
        <div>
          <article><Gamepad2 size={21} /><span><strong>Дітям</strong>Знайомий формат, короткі рішення, XP та результат без довгих пояснень перед грою.</span></article>
          <article><HeartHandshake size={21} /><span><strong>Батькам</strong>Зрозуміла тема для спокійної розмови та конкретні питання після місії.</span></article>
          <article><School size={21} /><span><strong>Школам</strong>Сценарій, який можна пройти разом і використати як основу для обговорення на уроці.</span></article>
        </div>
      </section>

      <section className="story-beta">
        <div>
          <span>ВІДКРИТА БЕТА</span>
          <h2>Починаємо з однієї місії, але робимо її по-справжньому.</h2>
          <p>Зараз доступне завершене розслідування про фейкові Robux: чат, приховані докази, перевірка домену, наслідки та чекліст для батьків.</p>
        </div>
        <Button href="#/demo" variant="white" icon={Play} analytics={{ name: "cta_click", params: { source: "about_beta", target: "demo" } }}>
          Побачити Guardly у дії
        </Button>
      </section>
    </>
  );
}
