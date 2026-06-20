import { BarChart3, Database, ShieldCheck } from "lucide-react";
import { hasAnalyticsConfig, resetAnalyticsConsent } from "../lib/analytics.js";

export default function Privacy() {
  function changeConsent() {
    resetAnalyticsConsent();
    window.location.reload();
  }

  return (
    <>
      <section className="page-hero compact-hero privacy-hero">
        <div>
          <p className="hero-badge"><span className="dot" />Приватність</p>
          <h1>Мінімум даних. <em>Зрозумілі правила.</em></h1>
          <p>Guardly зараз працює як відкрита frontend-бета без акаунтів, платежів і введення справжніх даних дитини.</p>
        </div>
      </section>

      <section className="section-pad offwhite privacy-section">
        <div className="privacy-grid">
          <article>
            <span><ShieldCheck size={22} /></span>
            <div><h2>Демо не збирає особисті дані</h2><p>У місії не потрібно вводити ім'я, email, пароль, номер телефону чи дані акаунтів Roblox і Discord.</p></div>
          </article>
          <article>
            <span><BarChart3 size={22} /></span>
            <div><h2>Аналітика лише після згоди</h2><p>Якщо Google Analytics підключено, Guardly вимірює перегляди сторінок і дії у квесті тільки після дозволу та без введених у грі персональних даних.</p></div>
          </article>
          <article>
            <span><Database size={22} /></span>
            <div><h2>Що зберігається у браузері</h2><p>Локально зберігається лише вибір щодо аналітики. Ігрові відповіді не створюють профіль і не передаються як персональні дані.</p></div>
          </article>
        </div>

        <div className="privacy-note">
          <p className="section-eyebrow">Поточний статус</p>
          <h2>Guardly — тестова версія продукту</h2>
          <p>Функції сімейного кабінету, оплати та шкільної статистики показані як напрям розвитку й поки не підключені до серверної частини.</p>
          {hasAnalyticsConfig() ? (
            <button type="button" onClick={changeConsent}>Змінити вибір аналітики</button>
          ) : (
            <small>Зовнішня аналітика на цій версії ще не активована.</small>
          )}
        </div>
      </section>
    </>
  );
}
