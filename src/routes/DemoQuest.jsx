import MissionGame from "../components/MissionGame.jsx";
import { questDemo } from "../data/questDemo.js";

export default function DemoQuest() {
  return (
    <section className="demo-quest-screen">
      <MissionGame mission={questDemo} />
    </section>
  );
}
