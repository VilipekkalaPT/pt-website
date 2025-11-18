import cn from "classnames";
import { twMerge } from "tailwind-merge";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "ghost";
  icon: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function IconButton({
  variant,
  icon,
  className,
  onClick,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={twMerge(
        cn(
          "w-10 h-10 md:w-[52px] md:h-[52px] flex items-center justify-center rounded-full cursor-pointer",
          {
            "bg-black": variant === "primary",
            "bg-text-black-30/20 border border-border-brand-primary backdrop-blur-xs":
              variant === "secondary",
          },
          className
        )
      )}
      onClick={onClick}
      {...props}
    >
      {icon}
    </button>
  );
}
