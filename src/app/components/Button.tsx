"use client";

import cn from "classnames";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "ghost";
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
          "flex items-center gap-2 p-3 text-base rounded-full cursor-pointer appearance-none no-underline border-0 select-none tap-transparent overflow-hidden focus:outline-none",
          {
            "bg-blue text-text-black-30": variant === "primary",
            "bg-white text-text-black-30": variant === "secondary",
            "bg-none border-1 border-border-brand-primary":
              variant === "outlined",
            "bg-none": variant === "ghost",
            "cursor-not-allowed opacity-50": props.disabled,
            "glass-effect": glassmorphism,
            "outside-shadow": hasShadow,
          }
          // {
          //   "shadow-[inset_0.7px_0.7px_rgba(193,249,255,0.9),inset_-0.7px_-0.7px_rgba(193,249,255,0.9)]":
          //     hasShadow === "inset",
          //   "0_0_15px_rgba(255,255,255,0.4),0_1px_8px_rgba(0,0,0,0.12)]":
          //     shadowType === "outset",
          //   "shadow-[inset_0.7px_0.7px_rgba(193,249,255,0.9),inset_-0.7px_-0.7px_rgba(193,249,255,0.9),0_0_15px_rgba(255,255,255,0.4),0_1px_8px_rgba(0,0,0,0.12)]":
          //     shadowType === "both",
          // }
        ),
        className
      )}
      onClick={onClick}
      aria-label={`${label} button`}
      type="button"
      disabled={props.disabled}
      {...props}
    >
      {iconLeft}
      {label}
      {iconRight}
    </button>
  );
}
