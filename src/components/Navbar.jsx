import { Menu, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";

const navItems = [
  ["/about", "Про Guardly"],
  ["/missions", "Місії"],
  ["/parents", "Батькам"],
  ["/schools", "Школам"],
  ["/pricing", "Ціни"],
];

export default function Navbar({ activeRoute }) {
  const [open, setOpen] = useState(false);
  const logoUrl = `${import.meta.env.BASE_URL}logo.png`;

  useEffect(() => {
    setOpen(false);
  }, [activeRoute]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <nav className={`navbar ${open ? "menu-open" : ""}`}>
      <a className="nav-logo" href="#/" aria-label="Guardly">
        <img src={logoUrl} alt="" />
        <span>Guardly</span>
      </a>

      <button
        className="nav-menu"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="site-navigation"
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div id="site-navigation" className={`nav-panel ${open ? "is-open" : ""}`}>
        <div className="nav-mobile-title">Навігація</div>
        <ul className="nav-links">
          {navItems.map(([route, label]) => (
            <li key={route}>
              <a href={`#${route}`} aria-current={activeRoute === route ? "page" : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Button href="#/demo" icon={Play} className="nav-cta" analytics={{ name: "cta_click", params: { source: "navigation", target: "demo" } }}>
          Почати безкоштовно
        </Button>
        <p className="nav-mobile-note">Перша місія без реєстрації та картки.</p>
      </div>
      {open && <button className="nav-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Закрити меню" />}
    </nav>
  );
}
