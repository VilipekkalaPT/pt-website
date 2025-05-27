import Link from "next/link";
import cn from "classnames";

interface ChipProps {
  variant: "primary" | "secondary";
  label: string;
  iconRight?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Chip({
  variant,
  label,
  iconRight,
  href,
  className,
}: ChipProps) {
  const chipClassName = cn(
    "px-2 py-1 rounded-md flex items-center gap-1 text-sm",
    {
      "bg-gray-800": variant === "primary",
      "bg-gray-100": variant === "secondary",
    },
    className
  );

  const content = (
    <div className={chipClassName}>
      <p
        className={cn({
          "text-gray-100": variant === "primary",
          "text-gray-900": variant === "secondary",
        })}
      >
        {label}
      </p>
      {iconRight}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <>{content}</>;
}
