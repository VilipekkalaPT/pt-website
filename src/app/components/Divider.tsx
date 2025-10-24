import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return (
    <hr
      className={twMerge("border-t border-border-default-secondary", className)}
    />
  );
}
