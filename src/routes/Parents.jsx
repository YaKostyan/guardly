import { Award, BarChart3, Bell, Lock, Users } from "lucide-react";
import Button from "../components/Button.jsx";
import SectionHeader from "../components/SectionHeader.jsx";

const features = [
  [BarChart3, "Прогрес у реальному часі", "Місії, теми, помилки і сильні сторони дитини на одному екрані."],
  [Bell, "Сповіщення про слабкі місця", "Якщо одна тема повторно викликає помилки, Guardly підкаже, що повторити."],
  [Users, "До 3 дітей в акаунті", "Окремий прогрес, XP і рекомендації для кожної дитини."],
  [Award, "Сертифікати", "Після розділів дитина отримує видимий результат, який мотивує рухатись далі."],
  [Lock, "Безпека даних", "Без реклами, продажу даних і зайвого збору особистої інформації."],
];

export default function Parents() {
  return (
    <>
      <section className="page-hero split-hero">
        <div>
          <p className="hero-badge">
            <span className="dot" />
            Батькам
          </p>
          <h1>
            Ти бачиш, що дитина вміє <em>онлайн.</em>
          </h1>
          <p>
            Дашборд показує, які загрози дитина вже розпізнає, де помиляється і яку тему
            краще повторити. Без стеження. Тільки прогрес.
          </p>
          <Button href="#/demo" analytics={{ name: "cta_click", params: { source: "parents_hero", target: "demo" } }}>Спробувати безкоштовно</Button>
        </div>
        <div className="dashboard-preview">
          <div className="dash-head">
            <span>Профіль</span>
            <strong>Марта · 11 років</strong>
          </div>
          <div className="dash-stat">
            <strong>74%</strong>
            <span>готовність до фішингових сценаріїв</span>
          </div>
          <div className="dash-list">
            <span className="good">Фішинг: стабільно</span>
            <span className="warn">AI-фейки: повторити</span>
            <span className="good">Паролі: добре</span>
          </div>
        </div>
      </section>

      <section className="section-pad white">
        <SectionHeader
          eyebrow="Для родини"
          title="Все, що потрібно батькам, в одному місці"
          subtitle="Не заборони, а розуміння. Дитина практикується, а ти бачиш реальний прогрес."
        />
        <div className="feature-grid">
          {features.map(([Icon, title, text]) => (
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
        <SectionHeader eyebrow="Сумніви" title="Guardly не лякає — він готує" />
        <div className="concern-grid">
          <article>
            <h3>«Це не налякає дитину?»</h3>
            <p>Місії подані як короткі квести. Дитина вчиться діяти, а не боятися інтернету.</p>
          </article>
          <article>
            <h3>«Це не забере весь час?»</h3>
            <p>Середня місія займає 3–5 хвилин і легко вписується в тижневий розклад.</p>
          </article>
          <article>
            <h3>«Чи буде цікаво?»</h3>
            <p>XP, рівні, стрік і сертифікати дають відчутний прогрес без зайвого тиску.</p>
          </article>
        </div>
      </section>
    </>
  );
}
