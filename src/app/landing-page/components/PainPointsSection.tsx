"use client";

import cn from "classnames";
import { useState } from "react";
import { TypeLandingPagePainPointsFields } from "app/lib/types/contentful";
import RichTextRenderer from "app/components/RichTextRenderer";
import Button from "app/components/Button";
import { FLIP_ME } from "app/utils/variables";
import { twMerge } from "tailwind-merge";

interface PainPointsSectionProps {
  title: string;
  subtitle: string;
  painPoints: TypeLandingPagePainPointsFields[];
}

export default function PainPointsSection({
  title,
  subtitle,
  painPoints,
}: PainPointsSectionProps) {
  const [flippedCards, setFlippedCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const baseStyle =
    "absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 backface-hidden rotate-x-0";

  const toggleCard = (index: number) => {
    setFlippedCards((prev) =>
      prev.map((flipped, i) => (i === index ? !flipped : flipped))
    );
  };

  const mobileStyle = "flex-col h-[560px]";
  const desktopStyle = "md:flex-row md:h-[220px]";

  return (
    <div className="mt-12 w-4/5 mx-auto flex flex-col items-center text-center">
      <p className="heading mb-1">{title}</p>
      <p className="subheading text-text-secondary">{subtitle}</p>
      <div className={cn("mt-12 w-full gap-8 flex", mobileStyle, desktopStyle)}>
        {painPoints.map((point, index) => {
          return (
            <div
              key={index}
              className="w-full h-full [perspective:1000px]"
              role="button"
              tabIndex={0}
              aria-label={`Pain point: ${point.overlayText}`}
            >
              <div
                className={cn(
                  "w-full h-full relative bg-black/50 border-1 border-border-default-secondary rounded-lg transition-transform duration-700 [transform-style:preserve-3d]",
                  {
                    "rotate-y-180": flippedCards[index],
                  }
                )}
              >
                <div className={baseStyle}>
                  <RichTextRenderer
                    text={point.overlayText}
                    paragraphClassName="mb-4 body-strong"
                  />
                  <Button
                    label={FLIP_ME}
                    variant="ghost"
                    glassmorphism
                    onClick={() => toggleCard(index)}
                    className="p-2"
                  />
                </div>
                <div className={twMerge(`${baseStyle}`, "rotate-y-180")}>
                  <span className="mb-4 body-strong">{point.backText}</span>
                  <Button
                    label={FLIP_ME}
                    variant="ghost"
                    glassmorphism
                    onClick={() => toggleCard(index)}
                    className="p-2"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
