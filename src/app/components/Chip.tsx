import Link from "next/link";
import cn from "classnames";

interface ChipProps {
  label: string;
  iconRight?: React.ReactNode;
  href?: string;
  className?: string;
}

export default function Chip({ label, iconRight, href, className }: ChipProps) {
  const chipClassName = cn(
    "px-2 py-1 bg-gray-800 rounded-md flex items-center gap-1",
    className
  );

  const content = (
    <>
      <span className="text-gray-100">{label}</span>
      {iconRight}
    </>
  );

  return href ? (
    <Link href={href} className={chipClassName}>
      {content}
    </Link>
  ) : (
    <div className={chipClassName}>{content}</div>
  );
}
