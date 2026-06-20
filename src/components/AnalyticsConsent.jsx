import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  getAnalyticsConsent,
  hasAnalyticsConfig,
  setAnalyticsConsent,
} from "../lib/analytics.js";

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(
    () => hasAnalyticsConfig() && !getAnalyticsConsent(),
  );

  if (!visible) return null;

  function choose(value) {
    setAnalyticsConsent(value);
    setVisible(false);
  }

  return (
    <aside className="analytics-consent" aria-label="Налаштування аналітики">
      <div className="consent-icon"><ShieldCheck size={20} aria-hidden="true" /></div>
      <div className="consent-copy">
        <strong>Аналітика використання</strong>
        <p>Допомагає зрозуміти, які сторінки й місії корисні. Відповіді не створюють особистий профіль.</p>
        <a href="#/privacy">Докладніше</a>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-decline" onClick={() => choose("denied")}>Лише необхідне</button>
        <button type="button" className="consent-accept" onClick={() => choose("granted")}>Дозволити</button>
      </div>
    </aside>
  );
}
