import Image from "next/image";
import cn from "classnames";
interface CardHeaderProps {
  avatar: React.ReactNode;
  title: string;
  subTitle: string;
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

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden shadow-lg p-6", className)}>
      {children}
    </div>
  );
}

export const CardHeader = ({
  avatar,
  title,
  subTitle,
  className,
}: CardHeaderProps) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        {avatar}
        <div className="ml-4">
          <p className="font-semibold text-gray-600">{title}</p>
          <p className="text-sm font-medium text-gray-400">{subTitle}</p>
        </div>
      </div>
    </div>
  );
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
