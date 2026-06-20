import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../components/Button.jsx";
import MissionCard from "../components/MissionCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { missionCategories, missions } from "../data/missions.js";

const levels = ["Усі рівні", "Рівень 1", "Рівень 2", "Рівень 3"];

export default function Missions() {
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("Усі рівні");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return missions.filter((mission) => {
      const categoryMatch = category === "all" || mission.category === category;
      const levelMatch = level === "Усі рівні" || `Рівень ${mission.level}` === level;
      const search = `${mission.title} ${mission.description} ${mission.platforms.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return categoryMatch && levelMatch && search;
    });
  }, [category, level, query]);

  return (
    <>
      <section className="page-hero compact-hero">
        <div>
          <p className="hero-badge">
            <span className="dot" />
            Каталог місій
          </p>
          <h1>
            Обери загрозу і потренуй <em>рішення.</em>
          </h1>
          <p>
            Місії побудовані на коротких ситуаціях: повідомлення, посилання, подарунок,
            запит на код або AI-фейк. Усе українською і на знайомих дітям платформах.
          </p>
        </div>
      </section>

      <section className="section-pad offwhite">
        <SectionHeader
          eyebrow="Фільтри"
          title="Знайди потрібну місію"
          subtitle="Фільтруй за темою, рівнем складності або платформою."
        />

        <div className="filter-bar">
          <div className="search-box">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              placeholder="Пошук за темою або платформою"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <label className="select-box">
            <Filter size={18} aria-hidden="true" />
            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              {levels.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="chip-row" aria-label="Категорії місій">
          {missionCategories.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={category === value ? "active" : ""}
              onClick={() => setCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mission-count">{filtered.length} місій знайдено</div>
        <div className="missions-grid">
          {filtered.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Спробуй формат на демо-квесті.</h2>
        <p>Чотири ситуації, миттєвий фідбек і результат без реєстрації.</p>
        <Button href="#/demo" analytics={{ name: "cta_click", params: { source: "missions_bottom", target: "demo" } }}>Запустити демо</Button>
      </section>
    </>
  );
}
