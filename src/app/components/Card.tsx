import Image from "next/image";
import cn from "classnames";
import Link from "next/link";

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
interface CardMediaProps {
  imageUrl: string;
  alt: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface Card {
  children: React.ReactNode;
  className?: string;
}

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

export default function Card({ children, className, href }: CardProps) {
  const defaultClassName = cn(
    "rounded-lg overflow-hidden shadow-lg p-6",
    className
  );

  return href ? (
    <Link href={href} className={defaultClassName}>
      {children}
    </Link>
  ) : (
    <div className={defaultClassName}>{children}</div>
  );
}

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return <div className={className}>{children}</div>;
};

export const CardMedia = ({ imageUrl, alt }: CardMediaProps) => {
  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={100}
      height={100}
      className="block w-full h-auto"
    />
  );
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};
