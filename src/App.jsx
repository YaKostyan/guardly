import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import Missions from "./routes/Missions.jsx";
import Parents from "./routes/Parents.jsx";
import Schools from "./routes/Schools.jsx";
import Pricing from "./routes/Pricing.jsx";
import DemoQuest from "./routes/DemoQuest.jsx";

const routes = {
  "/": Home,
  "/missions": Missions,
  "/parents": Parents,
  "/schools": Schools,
  "/pricing": Pricing,
  "/demo": DemoQuest,
};

function readRoute() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const Page = routes[route] || Home;

  useEffect(() => {
    const handleRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", handleRoute);
    return () => window.removeEventListener("hashchange", handleRoute);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  return (
    <>
      <Navbar activeRoute={routes[route] ? route : "/"} />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}
