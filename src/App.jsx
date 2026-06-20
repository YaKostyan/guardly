import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import Missions from "./routes/Missions.jsx";
import Parents from "./routes/Parents.jsx";
import Schools from "./routes/Schools.jsx";
import Pricing from "./routes/Pricing.jsx";
import DemoQuest from "./routes/DemoQuest.jsx";
import Privacy from "./routes/Privacy.jsx";
import AnalyticsConsent from "./components/AnalyticsConsent.jsx";
import { bootstrapAnalytics, trackPageView } from "./lib/analytics.js";

const routes = {
  "/": Home,
  "/missions": Missions,
  "/parents": Parents,
  "/schools": Schools,
  "/pricing": Pricing,
  "/demo": DemoQuest,
  "/privacy": Privacy,
};

const routeMeta = {
  "/": ["Guardly — тренажер цифрової безпеки", "Безкоштовна інтерактивна місія з цифрової безпеки для дітей, батьків і шкіл."],
  "/missions": ["Місії Guardly", "Каталог коротких сценаріїв про фішинг, скам, паролі та AI-фейки."],
  "/parents": ["Guardly для батьків", "Практичне навчання цифрової безпеки для дітей та зрозумілий прогрес для батьків."],
  "/schools": ["Guardly для шкіл", "Готові інтерактивні сценарії з кібербезпеки для уроків і курсів."],
  "/pricing": ["Ціни Guardly", "Поточний безкоштовний демо-квест і попередні плани розвитку Guardly."],
  "/demo": ["Безкоштовні Robux чи пастка? — Guardly", "Безпечна інтерактивна місія про фейковий подарунок Robux."],
  "/privacy": ["Приватність Guardly", "Як Guardly працює з аналітикою та даними у відкритій бета-версії."],
};

function readRoute() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const Page = routes[route] || Home;
  const isGameRoute = route === "/demo";

  useEffect(() => {
    const handleRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", handleRoute);
    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  useEffect(() => {
    bootstrapAnalytics();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const [title, description] = routeMeta[route] || routeMeta["/"];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    trackPageView(route);
  }, [route]);

  return (
    <>
      {!isGameRoute && <Navbar activeRoute={routes[route] ? route : "/"} />}
      <main className={isGameRoute ? "game-route-main" : ""}>
        <Page />
      </main>
      {!isGameRoute && <Footer />}
      <AnalyticsConsent />
    </>
  );
}
