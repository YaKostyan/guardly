import { Check } from "lucide-react";
import Button from "./Button.jsx";

export default function PricingCard({ plan }) {
  return (
    <article className={`pricing-card ${plan.featured ? "featured" : ""}`}>
      {plan.badge ? <div className="pricing-badge">{plan.badge}</div> : null}
      <div className="pricing-name">{plan.name}</div>
      <p>{plan.description}</p>
      <div className="pricing-price">
        {plan.price}
        <span>{plan.period}</span>
      </div>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={16} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Button href={plan.href} variant={plan.featured ? "signal" : "dark"}>
        {plan.cta}
      </Button>
    </article>
  );
}
