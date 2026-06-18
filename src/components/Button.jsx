import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  href,
  icon: Icon = ArrowRight,
  variant = "signal",
  className = "",
  ...props
}) {
  const Component = href ? "a" : "button";

  return (
    <Component className={`btn btn-${variant} ${className}`.trim()} href={href} {...props}>
      <span>{children}</span>
      {Icon ? <Icon size={17} strokeWidth={2.2} aria-hidden="true" /> : null}
    </Component>
  );
}
