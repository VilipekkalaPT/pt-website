"use client";

import { twMerge } from "tailwind-merge";
import cn from "classnames";
import { useRouter } from "next/navigation";

import Button from "app/components/Button";

interface ButtonGroupProps {
  infoButtonText1: string;
  infoButtonText2: string;
  button1Url: string;
  button2Url: string;
  className?: string;
}

export default function ButtonGroup({
  infoButtonText1,
  infoButtonText2,
  button1Url,
  button2Url,
  className,
}: ButtonGroupProps) {
  const router = useRouter();

  return (
    <div className={twMerge(cn("flex justify-center gap-4"), className)}>
      <Button
        label={infoButtonText1}
        variant="primary"
        glassmorphism
        hasShadow
        onClick={() => router.push(button1Url)}
      />
      <Button
        label={infoButtonText2}
        variant="primary"
        glassmorphism
        hasShadow
        onClick={() => router.push(button2Url)}
      />
    </div>
  );
}
