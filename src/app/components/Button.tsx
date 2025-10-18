"use client";

import cn from "classnames";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined"
  | "outline-tertiary"
  | "ghost";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: ButtonVariant;
  onClick?: () => void;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  glassmorphism?: boolean;
  hasShadow?: boolean;
}

export default function Button({
  label,
  variant,
  className,
  iconLeft,
  iconRight,
  hasShadow,
  glassmorphism,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        cn(
          "flex items-center gap-2 p-3 leading-4 rounded-full cursor-pointer appearance-none no-underline border-0 select-none tap-transparent overflow-hidden focus:outline-none",
          {
            "bg-blue text-text-black-30": variant === "primary",
            "bg-white text-text-black-30": variant === "secondary",
            "bg-none border border-border-brand-primary":
              variant === "outlined",
            "bg-white/25 border border-text-default-tertiary":
              variant === "outline-tertiary",
            "bg-none": variant === "ghost",
            "cursor-not-allowed opacity-50": props.disabled,
            "glass-effect": glassmorphism,
            "outside-shadow": hasShadow,
          }
        ),
        className
      )}
      onClick={onClick}
      aria-label={`${label} button`}
      type="button"
      disabled={props.disabled}
      {...props}
    >
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      {label}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}
