import { ArrowRight } from "lucide-react";
import { trackEvent } from "../lib/analytics.js";

export default function Button({
  children,
  href,
  icon: Icon = ArrowRight,
  variant = "signal",
  className = "",
  analytics,
  onClick,
  ...props
}) {
  const Component = href ? "a" : "button";

  function handleClick(event) {
    if (analytics) trackEvent(analytics.name, analytics.params);
    onClick?.(event);
  }

  return (
    <Component className={`btn btn-${variant} ${className}`.trim()} href={href} onClick={handleClick} {...props}>
      <span>{children}</span>
      {Icon ? <Icon size={17} strokeWidth={2.2} aria-hidden="true" /> : null}
    </Component>
  );
}
