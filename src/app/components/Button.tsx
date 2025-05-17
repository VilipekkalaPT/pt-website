"use client";

import cn from "classnames";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "ghost";
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
        "flex items-center gap-2 py-2 px-4 text-base rounded-lg cursor-pointer",
        {
          "border-0 text-white bg-black": variant === "primary",
          "border-0 text-gray-600 bg-gray-200 hover:bg-gray-600 hover:text-white":
            variant === "secondary",
          "py-4 border border-gray-300 rounded hover:bg-gray-100":
            variant === "outlined",
          "border-0 bg-white": variant === "ghost",
        },
        className
      )}
      onClick={onClick}
      aria-label={`${label} button`}
      type="button"
      role="button"
      disabled={props.disabled}
      {...props}
    >
      {iconLeft && iconLeft}
      {label}
      {iconRight && iconRight}
    </button>
  );
}
