const productLinks = [
  ["#/missions", "Місії"],
  ["#/demo", "Демо-квест"],
  ["#/schools", "Для шкіл"],
  ["#/pricing", "Ціни"],
];

const audienceLinks = [
  ["#/parents", "Для батьків"],
  ["#/schools", "Для шкіл"],
];

const trustLinks = [
  ["#/privacy", "Приватність"],
  ["https://github.com/YaKostyan/guardly", "GitHub"],
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
  const logoUrl = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="#/" aria-label="Guardly">
            <img src={logoUrl} alt="" />
            <span>Guardly</span>
          </a>
          <p>Тренажер цифрової безпеки для дітей, батьків і шкіл.</p>
        </div>
        <FooterColumn title="Продукт" links={productLinks} />
        <FooterColumn title="Для кого" links={audienceLinks} />
        <FooterColumn title="Довіра" links={trustLinks} />
      </div>
      <div className="footer-bottom">
        <p>© 2026 Guardly. Усі права захищені.</p>
        <p>Безпечний інтернет починається з практики.</p>
      </div>
    </footer>
  );
}
