import { BookOpen, CheckCircle2, School, Users } from "lucide-react";
import Button from "../components/Button.jsx";
import SectionHeader from "../components/SectionHeader.jsx";

const schoolFeatures = [
  [BookOpen, "Готові уроки", "Сценарії, обговорення і короткі практичні завдання без підготовки з нуля."],
  [Users, "Статистика класу", "Видно, які теми клас проходить упевнено, а де потрібне повторення."],
  [School, "Для курсів і шкіл", "Працює як окремий модуль або частина уроку інформатики чи цифрової грамотності."],
];

export default function Schools() {
  return (
    <>
      <section className="page-hero split-hero">
        <div>
          <p className="hero-badge">
            <span className="dot" />
            Школам
          </p>
          <h1>
            Кібербезпека, яку можна провести <em>на уроці.</em>
          </h1>
          <p>
            Guardly дає готові місії, статистику класу і зрозумілі розбори, щоб учні
            практикували реальні рішення, а не просто слухали правила.
          </p>
          <Button href="#/demo" analytics={{ name: "cta_click", params: { source: "schools_hero", target: "demo" } }}>Показати демо</Button>
        </div>
        <div className="lesson-preview">
          <div className="lesson-row head">
            <span>Урок 02</span>
            <strong>Фішинг у месенджерах</strong>
          </div>
          <div className="lesson-row">
            <CheckCircle2 size={18} />
            <span>12 хв практики</span>
          </div>
          <div className="lesson-row">
            <CheckCircle2 size={18} />
            <span>5 ситуацій для групового обговорення</span>
          </div>
          <div className="lesson-row">
            <CheckCircle2 size={18} />
            <span>Звіт за темами після заняття</span>
          </div>
        </div>
      </section>

      <section className="section-pad white">
        <SectionHeader
          eyebrow="MVP для класу"
          title="Менше підготовки, більше практики"
          subtitle="Викладач бачить прогрес, а учні тренують рішення на коротких сценаріях."
        />
        <div className="feature-grid">
          {schoolFeatures.map(([Icon, title, text]) => (
            <article key={title}>
              <div className="feature-icon">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad offwhite">
        <SectionHeader eyebrow="Процес" title="Як це виглядає в школі" />
        <div className="steps">
          {[
            ["01", "Викладач обирає тему", "Фішинг, паролі, приватність, скам або AI-фейки."],
            ["02", "Учні проходять квест", "Кожне рішення одразу отримує пояснення і контекст."],
            ["03", "Клас бачить висновки", "Після уроку є статистика: що засвоєно, що повторити."],
          ].map(([number, title, text]) => (
            <article className="step" key={number}>
              <div>{number}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
