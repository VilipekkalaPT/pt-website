"use client";

import cn from "classnames";

export type ButtonType = "primary" | "secondary";
interface ButtonProps {
  label: string;
  type: ButtonType;
  onClick: () => void;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  label,
  type,
  className,
  iconLeft,
  iconRight,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex py-2 px-4 text-base rounded-lg border-0 cursor-pointer",
        {
          "text-white bg-black": type === "primary",
          "text-gray-600 bg-gray-200 hover:bg-gray-600 hover:text-white":
            type === "secondary",
        },
        className
      )}
      onClick={onClick}
    >
      {iconLeft && iconLeft}
      {label}
      {iconRight && iconRight}
    </button>
  );
}
