import { twMerge } from "tailwind-merge";
import Link from "next/link";
import cn from "classnames";

interface ChipProps {
  color:
    | "black"
    | "pink"
    | "green"
    | "blue"
    | "cyan"
    | "orange"
    | "blue-1000"
    | "none"
    | "ghost";
  label: string;
  glassmorphism?: boolean;
  iconRight?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Chip({
  color,
  label,
  glassmorphism,
  iconRight,
  href,
  className,
}: ChipProps) {
  const chipClassName = twMerge(
    cn(
      "px-4 py-2 rounded-3xl flex items-center gap-1.5",
      {
        "bg-border-default-primary border border-border-neutral-secondary":
          color === "black",
        "bg-pink text-text-brand-primary": color === "pink",
        "bg-cyan text-text-brand-primary": color === "cyan",
        "bg-green": color === "green",
        "bg-blue-800": color === "blue",
        "bg-orange-800": color === "orange",
        "bg-blue-1000": color === "blue-1000",
        "bg-transparent text-text-brand-secondary border border-border-brand-primary":
          color === "none",
        "bg-transparent p-2 font-light text-sm": color === "ghost",
        "glass-effect": glassmorphism,
      },
      className
    )
  );

  const content = (
    <div className={chipClassName}>
      {label}
      {iconRight}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <>{content}</>;
}
