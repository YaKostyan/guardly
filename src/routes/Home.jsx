import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button.jsx";
import MissionCard from "../components/MissionCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
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
          <div className="hero-ctas">
            <Button href="#/demo" icon={Play}>
              Почати безкоштовно
            </Button>
            <Button href="#/missions" variant="ghost" icon={ArrowRight}>
              Переглянути місії
            </Button>
          </div>
          <div className="hero-stats" aria-label="Статистика Guardly">
            <div>
              <strong>12K+</strong>
              <span>Учнів</span>
            </div>
            <div>
              <strong>48+</strong>
              <span>Місій</span>
            </div>
            <div>
              <strong>3 хв</strong>
              <span>Середня місія</span>
            </div>
          </div>
        </div>

        <div className="hero-product" aria-label="Приклад місії Guardly">
          <div className="mission-live">
            <div className="mission-live-head">
              <span>Фішинг · Рівень 2</span>
              <strong>0:47</strong>
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
            {choice && (
              <div className={`live-feedback ${choice === "B" ? "correct" : "wrong"}`} role="status">
                {choiceFeedback[choice]}
              </div>
            )}
          </div>
          <div className="xp-widget">
            <div>
              <span>Прогрес розділу</span>
              <strong>1 240 XP</strong>
              <div className="xp-track">
                <span />
              </div>
            </div>
            <div className="streak">
              <strong>9</strong>
              <span>днів</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad white">
        <SectionHeader
          eyebrow="Проблема реальна"
          title="Діти стикаються з онлайн-пастками там, де грають і спілкуються"
          subtitle="Guardly тренує рішення у середовищах, які вже знайомі дитині."
        />
        <div className="stats-grid">
          <article>
            <strong>1 з 3</strong>
            <p>дітей 8–15 років отримували підозрілі повідомлення в месенджерах.</p>
          </article>
          <article>
            <strong>67%</strong>
            <p>підлітків не завжди відрізняють фейкове посилання з першого погляду.</p>
          </article>
          <article>
            <strong>4 хв</strong>
            <p>іноді достатньо, щоб втратити доступ до ігрового або поштового акаунта.</p>
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
          <Button href="#/demo" variant="white" icon={Play}>
            Почати безкоштовно
          </Button>
          <Button href="#/schools" variant="outline-white">
            Для шкіл і курсів
          </Button>
        </div>
      </section>
    </>
  );
}
