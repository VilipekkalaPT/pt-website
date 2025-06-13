import Link from "next/link";
import cn from "classnames";

interface ChipProps {
  color?:
    | "black"
    | "gray"
    | "green"
    | "light-green"
    | "yellow"
    | "blue"
    | "orange";
  label: string;
  iconRight?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Chip({
  color = "black",
  label,
  iconRight,
  href,
  className,
}: ChipProps) {
  const chipClassName = cn(
    "px-2 py-1 rounded-md flex items-center gap-1 text-sm",
    {
      "bg-gray-800": color === "black",
      "bg-gray-100": color === "gray",
      "bg-green-500/25": color === "green",
      "bg-green-800": color === "light-green",
      "bg-yellow-600": color === "yellow",
      "bg-blue-800": color === "blue",
      "bg-orange-800": color === "orange",
    },
    className
  );

  const content = (
    <div className={chipClassName}>
      <p
        className={cn({
          "text-gray-100": color === "black",
          "text-gray-900": color === "gray",
          "text-green-900": color === "green",
          "text-green-100": color === "light-green",
          "text-yellow-100": color === "yellow",
          "text-blue-200": color === "blue",
          "text-orange-200": color === "orange",
        })}
      >
        {label}
      </p>
      {iconRight}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : <>{content}</>;
}
