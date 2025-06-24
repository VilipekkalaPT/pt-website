import cn from "classnames";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outlined" | "ghost";
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
      className={cn(
        "py-3 px-3 text-base rounded-full cursor-pointer",
        {
          "bg-black text-white": variant === "primary",
          "bg-gray-200 text-black": variant === "secondary",
          "border border-black text-black": variant === "outlined",
          "text-white": variant === "ghost",
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon}
    </button>
  );
}
