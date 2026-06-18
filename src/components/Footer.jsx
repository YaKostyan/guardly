const productLinks = [
  ["#/missions", "Місії"],
  ["#/demo", "Демо-квест"],
  ["#/schools", "Для шкіл"],
  ["#/pricing", "Ціни"],
];

const companyLinks = [
  ["#/", "Про Guardly"],
  ["#/", "Блог"],
  ["#/", "Прес-кіт"],
];

const supportLinks = [
  ["#/", "Допомога"],
  ["#/", "Політика приватності"],
  ["#/", "Умови"],
  ["#/", "Контакти"],
];

function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      {links.map(([href, label]) => (
        <a key={label} href={href}>
          {label}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="#/" aria-label="Guardly">
            <img src="/logo.png" alt="" />
            <span>Guardly</span>
          </a>
          <p>Тренажер цифрової безпеки для дітей, батьків і шкіл.</p>
        </div>
        <FooterColumn title="Продукт" links={productLinks} />
        <FooterColumn title="Компанія" links={companyLinks} />
        <FooterColumn title="Підтримка" links={supportLinks} />
      </div>
      <div className="footer-bottom">
        <p>© 2026 Guardly. Усі права захищені.</p>
        <p>Безпечний інтернет починається з практики.</p>
      </div>
    </footer>
  );
}
