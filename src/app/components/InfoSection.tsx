import { ArrowDownIcon } from "@heroicons/react/24/outline";
import cn from "classnames";

interface InfoSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function InfoSection({
  title,
  subtitle,
  className,
}: InfoSectionProps) {
  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      <ArrowDownIcon className="size-12 text-icon-secondary stroke-2" />
      <p className="heading mt-6">{title}</p>
      {subtitle && (
        <p className="subheading mt-1 text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
