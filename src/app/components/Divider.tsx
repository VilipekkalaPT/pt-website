import cn from "classnames";
import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return (
    <hr className={twMerge(cn("border-t border-gray-300 my-4", className))} />
  );
}
