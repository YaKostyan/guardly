import { Check } from "lucide-react";
import { useState } from "react";
import Button from "./Button.jsx";

export default function PricingCard({ plan }) {
  const [interested, setInterested] = useState(false);

  return (
    <article className={`pricing-card ${plan.featured ? "featured" : ""}`}>
      {plan.badge ? <div className="pricing-badge">{plan.badge}</div> : null}
      <div className="pricing-name">{plan.name}</div>
      <p>{plan.description}</p>
      <div className="pricing-price">
        {plan.price}
        <span>{plan.period}</span>
      </div>
      {plan.prelaunch && <div className="pricing-prelaunch">Попередня ціна · оплата ще не підключена</div>}
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={16} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      {plan.prelaunch ? (
        <Button
          variant={plan.featured ? "signal" : "dark"}
          analytics={{ name: "plan_interest", params: { plan: plan.name, price: plan.price } }}
          onClick={() => setInterested(true)}
          disabled={interested}
        >
          {interested ? "Інтерес зафіксовано" : plan.cta}
        </Button>
      ) : (
        <Button href={plan.href} variant="dark" analytics={{ name: "plan_interest", params: { plan: plan.name, price: plan.price } }}>
          {plan.cta}
        </Button>
      )}
      {interested && <p className="pricing-interest-note" role="status">Дякуємо. Це допоможе визначити пріоритет запуску.</p>}
    </article>
  );
}
