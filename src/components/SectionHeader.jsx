export default function SectionHeader({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={`section-header ${align === "center" ? "section-header-center" : ""}`}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
