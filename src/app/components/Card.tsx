import cn from "classnames";
import Link from "next/link";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  href,
  onClick,
}: CardProps) {
  const defaultClassName = cn(
    "flex flex-col justify-between border border-gray-200 rounded-lg overflow-hidden shadow-lg p-4",
    className
  );

  return href ? (
    <Link href={href} className={defaultClassName}>
      {children}
    </Link>
  ) : (
    <div className={defaultClassName} onClick={onClick}>
      {children}
    </div>
  );
}

export const CardHeader = ({ className, children }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};
