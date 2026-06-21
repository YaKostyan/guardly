import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/game.css";
import "./styles/about.css";
import "./styles/company.css";
import "./styles/responsive.css";
import "./styles/launch.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
