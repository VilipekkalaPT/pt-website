import Link from "next/link";
import cn from "classnames";

interface ChipProps {
  variant?: "success" | "default" | "white";
  label: string;
  iconRight?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Chip({
  variant = "default",
  label,
  iconRight,
  href,
  className,
}: ChipProps) {
  const chipClassName = cn(
    "px-2 py-1 rounded-md flex items-center gap-1 text-sm",
    {
      "bg-gray-800": variant === "default",
      "bg-gray-100": variant === "white",
      "bg-green-500/25": variant === "success",
    },
    className
  );

  const content = (
    <div className={chipClassName}>
      <p
        className={cn({
          "text-gray-100": variant === "default",
          "text-gray-900": variant === "white",
          "text-green-900": variant === "success",
        })}
      >
        {label}
      </p>
      {iconRight}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <>{content}</>;
}
