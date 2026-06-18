import MissionGame from "../components/MissionGame.jsx";
import { questDemo } from "../data/questDemo.js";

export default function DemoQuest() {
  return (
    <>
      <section className="page-hero compact-hero mission-hero">
        <div>
          <p className="hero-badge">
            <span className="dot" />
            Демо-місія
          </p>
          <h1>
            Безкоштовні Robux чи <em>пастка?</em>
          </h1>
          <p>
            Міні-гра Guardly: оглянь чат, збери докази, перевір домен і прийми рішення
            до того, як фокус закінчиться.
          </p>
        </div>
      </section>

      <section className="mission-player-section">
        <MissionGame mission={questDemo} />
      </section>
    </>
  );
}
