import { Menu, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";

const navItems = [
  ["/missions", "Місії"],
  ["/parents", "Батькам"],
  ["/schools", "Школам"],
  ["/pricing", "Ціни"],
];

export default function Navbar({ activeRoute }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [activeRoute]);

  return (
    <nav className="navbar">
      <a className="nav-logo" href="#/" aria-label="Guardly">
        <img src="/logo.png" alt="" />
        <span>Guardly</span>
      </a>

      <button
        className="nav-menu"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`nav-panel ${open ? "is-open" : ""}`}>
        <ul className="nav-links">
          {navItems.map(([route, label]) => (
            <li key={route}>
              <a href={`#${route}`} aria-current={activeRoute === route ? "page" : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Button href="#/demo" icon={Play} className="nav-cta">
          Почати безкоштовно
        </Button>
      </div>
    </nav>
  );
}
