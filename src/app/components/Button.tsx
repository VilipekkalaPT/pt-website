"use client";

import cn from "classnames";

export type ButtonVariant = "primary" | "secondary" | "ghost";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: ButtonVariant;
  onClick?: () => void;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  label,
  variant,
  className,
  iconLeft,
  iconRight,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 py-2 px-4 text-base rounded-lg border-0 cursor-pointer",
        {
          "text-white bg-black": variant === "primary",
          "text-gray-600 bg-gray-200 hover:bg-gray-600 hover:text-white":
            variant === "secondary",
          "bg-white": variant === "ghost",
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {iconLeft && iconLeft}
      {label}
      {iconRight && iconRight}
    </button>
  );
}
