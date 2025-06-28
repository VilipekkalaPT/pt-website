"use client";

import Image from "next/image";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";
import { useEffect, useState } from "react";
import { HeadingSectionType } from "app/lib/types/type";
import { HERO_SECTION_IMAGE } from "app/utils/variables";
import cn from "classnames";

interface HeroSectionProps {
  image: AssetFields;
  headingSections: HeadingSectionType[];
  fillImage?: boolean;
  heroSectionContent?: React.ReactNode;
}

export default function HeroSection({
  image,
  headingSections,
  fillImage = true,
  heroSectionContent,
}: HeroSectionProps) {
  const imageUrl = getAssetUrl(image);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headingSections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headingSections.length]);

  const containerStyle = cn({
    "relative w-screen h-screen": fillImage,
    "relative w-full h-full": !fillImage,
  });

  return (
    <div className={containerStyle}>
      {fillImage ? (
        <Image
          src={imageUrl}
          alt={HERO_SECTION_IMAGE}
          fill
          className="block w-full h-auto object-cover"
        />
      ) : (
        <Image
          src={imageUrl}
          alt={HERO_SECTION_IMAGE}
          width={image.file?.details.image?.width}
          height={image.file?.details.image?.height}
        />
      )}
      <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center">
        {headingSections.map((section, i) => (
          <div
            key={i}
            className={`absolute p-4 text-center text-white transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-6xl mb-4">{section.heading}</p>
            <p className="text-3xl">{section.subheading}</p>
          </div>
        ))}
        {heroSectionContent}
      </div>
    </div>
  );
}
