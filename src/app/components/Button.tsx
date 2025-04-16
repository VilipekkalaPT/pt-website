"use client";

import cn from "classnames";

export type ButtonType = "primary" | "secondary";

interface ButtonProps {
  label: string;
  type: ButtonType;
  onClick: () => void;
  className?: string;
}

export default function Button({
  label,
  type,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "py-2 px-6 text-base rounded-lg border-0 cursor-pointer",
        {
          "text-white bg-black": type === "primary",
          "text-black bg-white": type === "secondary",
        },
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
