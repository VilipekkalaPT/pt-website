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
  const [flipCard, setFlipCard] = useState<number | null>(null);

  const baseStyle =
    "absolute inset-0 flex flex-col items-center justify-center text-center p-4 [backface-visibility:hidden]";

  return (
    <div className="mt-20 w-2/3 mx-auto flex flex-col items-center">
      <p className="text-2xl mb-1">{title}</p>
      <p className="text-xl text-text-secondary mb-10">{subtitle}</p>
      <div className="w-full h-[200px] flex gap-4">
        {painPoints.map((point, index) => {
          return (
            <div
              key={index}
              className="group w-full h-full [perspective:1000px]"
              role="button"
              tabIndex={0}
              aria-label={`Pain point: ${point.overlayText}`}
            >
              <div
                className={cn(
                  "w-full h-full relative bg-black/50 border-1 border-border-secondary rounded-lg transition-transform duration-700 [transform-style:preserve-3d]",
                  {
                    "rotate-y-180": flipCard === index,
                  }
                )}
              >
                <div className={baseStyle}>
                  <RichTextRenderer
                    text={point.overlayText}
                    paragraphClassName="mb-4 text-lg"
                  />
                  <Button
                    label={FLIP_ME}
                    variant="ghost"
                    shadowType="inset"
                    onClick={() =>
                      setFlipCard(flipCard === index ? null : index)
                    }
                  />
                </div>

                <div
                  className={twMerge(
                    `${baseStyle}`,
                    "[transform:rotateY(180deg)]"
                  )}
                >
                  {point.backText}
                  <Button
                    label={FLIP_ME}
                    variant="ghost"
                    shadowType="inset"
                    onClick={() =>
                      setFlipCard(flipCard === index ? null : index)
                    }
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
