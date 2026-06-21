import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import MissionCard from "../components/MissionCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import DemandPoll from "../components/DemandPoll.jsx";
import { missions } from "../data/missions.js";

const choices = [
  ["A", "Переходжу за посиланням, бо повідомлення термінове", "wrong"],
  ["B", "Перевіряю через офіційний застосунок банку", "correct"],
  ["C", "Пересилаю посилання другу для перевірки", "wrong"],
];

const choiceFeedback = {
  A: "Терміновість — частина пастки. Спершу перевір джерело.",
  B: "Правильно. Офіційний застосунок не залежить від посилання у повідомленні.",
  C: "Не передавай ризик іншому. Перевір повідомлення через офіційний канал.",
};

export default function Home() {
  const [choice, setChoice] = useState(null);
  const [timeLeft, setTimeLeft] = useState(47);

  useEffect(() => {
    if (choice || timeLeft === 0) return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [choice, timeLeft]);

  const timedOut = timeLeft === 0 && !choice;
  const timerLabel = `0:${String(timeLeft).padStart(2, "0")}`;

  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="dot" />
            Бета · відкритий доступ
          </p>
          <h1>
            Навчися думати швидше <em>шахрая.</em>
          </h1>
          <p className="hero-sub">
            Інтерактивні місії з інтернет-безпеки. Реальні загрози — фішинг, скам,
            крадіжка акаунтів у Roblox, Discord, Telegram і TikTok — у форматі
            коротких квестів.
          </p>
          <div className="hero-definition">
            <ShieldCheck size={22} aria-hidden="true" />
            <p><strong>Guardly - це тренажер безпечних рішень.</strong><span>Дитина розслідує знайому ситуацію, обирає дію та одразу бачить наслідок.</span></p>
            <a href="#/about">Що ми пропонуємо <ArrowRight size={15} /></a>
          </div>
          <div className="hero-ctas">
            <Button href="#/demo" icon={Play} analytics={{ name: "cta_click", params: { source: "home_hero", target: "demo" } }}>
              Почати безкоштовно
            </Button>
            <Button href="#/missions" variant="ghost" icon={ArrowRight} analytics={{ name: "cta_click", params: { source: "home_hero", target: "missions" } }}>
              Переглянути місії
            </Button>
          </div>
          <div className="hero-stats impact-stats" aria-label="Звернення про кіберзлочини серед людей до 20 років у США">
            <div>
              <strong>≈49</strong>
              <span>звернень щодня</span>
            </div>
            <div>
              <strong>17 993</strong>
              <span>звернення за 2024 рік</span>
            </div>
            <div>
              <strong>$22,5 млн</strong>
              <span>заявлених втрат</span>
            </div>
          </div>
          <a
            className="impact-stats-source"
            href="https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf"
            target="_blank"
            rel="noreferrer"
          >
            FBI IC3, США, 2024. Лише офіційно подані звернення; показник за день розраховано з річних даних.
          </a>
        </div>

        <div className="hero-product" aria-label="Приклад місії Guardly">
          <div className="mission-live">
            <div className="mission-live-head">
              <span>Фішинг · Рівень 2</span>
              <strong className={timeLeft <= 10 && !choice ? "urgent" : ""} aria-label={`Залишилось ${timeLeft} секунд`}>{timerLabel}</strong>
            </div>
            <p>
              Ти отримав повідомлення нібито від банку: «Підтверди картку за
              посиланням, інакше акаунт буде заблоковано». Що робиш?
            </p>
            <div className="live-choices">
              {choices.map(([key, label, state]) => (
                <button
                  key={key}
                  type="button"
                  className={
                    choice ? (state === "correct" ? "correct" : choice === key ? "wrong" : "") : ""
                  }
                  onClick={() => setChoice(key)}
                >
                  <span>{key}</span>
                  {label}
                </button>
              ))}
            </div>
            {(choice || timedOut) && (
              <div className={`live-feedback ${choice === "B" ? "correct" : "wrong"}`} role="status">
                {timedOut
                  ? "Час вийшов, але поспішати не потрібно. Спокійно перевір варіанти та обери відповідь."
                  : choiceFeedback[choice]}
              </div>
            )}
          </div>
          <div className="xp-widget">
            <div>
              <span>Нагорода демо</span>
              <strong>до 300 XP</strong>
              <div className="xp-track">
                <span />
              </div>
            </div>
            <div className="streak">
              <strong>4</strong>
              <span>хв</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad white">
        <SectionHeader
          eyebrow="Що вже працює"
          title="Один завершений сценарій, який можна перевірити просто зараз"
          subtitle="Не обіцянка майбутнього продукту, а готова інтерактивна місія з результатом."
        />
        <div className="stats-grid">
          <article>
            <strong>3 етапи</strong>
            <p>Чат, перевірка підозрілого сайту та фінальне рішення.</p>
          </article>
          <article>
            <strong>6 сигналів</strong>
            <p>Подарунок, тиск часу, фейковий домен та інші ознаки пастки.</p>
          </article>
          <article>
            <strong>1 чеклист</strong>
            <p>Короткий розбір для батьків після завершення місії.</p>
          </article>
        </div>
      </section>

      <section className="section-pad offwhite">
        <SectionHeader
          eyebrow="Як це працює"
          title="Три кроки — і ти вже думаєш інакше"
          subtitle="Не теорія. Короткі реальні сценарії з миттєвим поясненням."
        />
        <div className="steps">
          {[
            [
              "01",
              "Обери місію",
              "Фішинг, паролі, скам, AI-фейки або приватність — кожна місія займає 2–6 хвилин.",
            ],
            [
              "02",
              "Зіткнися із ситуацією",
              "Підозріле повідомлення, посилання, дзвінок або прохання. Тобі потрібно ухвалити рішення.",
            ],
            [
              "03",
              "Зрозумій схему",
              "Після вибору Guardly пояснює, що видало обман і як діяти правильно в реальності.",
            ],
          ].map(([number, title, text]) => (
            <article className="step" key={number}>
              <div>{number}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad white">
        <SectionHeader
          eyebrow="Місії"
          title="Сценарії з реального життя"
          subtitle="Загрози, які трапляються в Telegram, Discord, Roblox, TikTok та email."
        />
        <div className="missions-grid">
          {missions.slice(0, 6).map((mission) => (
            <MissionCard key={mission.id} mission={mission} compact />
          ))}
        </div>
      </section>

      <DemandPoll />

      <section className="audience-section">
        <SectionHeader
          eyebrow="Для кого"
          title="Для дітей. Для батьків. Для шкіл."
          subtitle="Один продукт — три точки входу без зміни логіки навчання."
        />
        <div className="audience-grid">
          <article>
            <div>🧒</div>
            <h3>Діти 8–15 років</h3>
            <p>XP, рівні, короткі рішення і знайомі платформи замість нудних лекцій.</p>
          </article>
          <article>
            <div>👩‍👦</div>
            <h3>Батьки</h3>
            <p>Дашборд показує прогрес, слабкі місця і теми, які варто повторити.</p>
          </article>
          <article>
            <div>🏫</div>
            <h3>Школи та курси</h3>
            <p>Готові уроки, статистика класу і сценарії, які легко додати в заняття.</p>
          </article>
        </div>
      </section>

      <section className="cta-section">
        <h2>Перша місія — безкоштовно. Назавжди.</h2>
        <p>Почни просто зараз — без реєстрації для першого кроку.</p>
        <div>
          <Button href="#/demo" variant="white" icon={Play} analytics={{ name: "cta_click", params: { source: "home_bottom", target: "demo" } }}>
            Почати безкоштовно
          </Button>
          <Button href="#/schools" variant="outline-white" analytics={{ name: "cta_click", params: { source: "home_bottom", target: "schools" } }}>
            Для шкіл і курсів
          </Button>
        </div>
      </section>
    </>
  );
}
