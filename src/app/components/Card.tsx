import cn from "classnames";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  glassmorphism?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  href,
  glassmorphism,
  onClick,
  ...props
}: CardProps) {
  const defaultClassName =
    "flex flex-col justify-between rounded-2xl overflow-hidden shadow-lg";

  return href ? (
    <Link
      href={href}
      className={twMerge(
        cn(defaultClassName, className, {
          "glass-effect": glassmorphism,
        })
      )}
    >
      {children}
    </Link>
  ) : (
    <div
      className={twMerge(
        cn(defaultClassName, className, {
          "glass-effect": glassmorphism,
        })
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export const CardHeader = ({ className, children }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={twMerge(cn("p-4", className))}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardContentProps) => {
  return <div className={twMerge(cn("px-4 pb-4", className))}>{children}</div>;
};
