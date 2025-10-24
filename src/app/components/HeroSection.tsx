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
    if (headingSections.length === 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headingSections.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [headingSections.length]);

  const containerStyle = cn({
    "relative w-screen h-[calc(100vh-80px)]": fillImage,
    "relative w-full h-[40rem]": !fillImage,
  });

  return (
    <div className={containerStyle}>
      {fillImage ? (
        <Image
          src={imageUrl}
          alt={HERO_SECTION_IMAGE}
          fill
          className="block w-full h-auto object-cover object-center"
        />
      ) : (
        <Image
          src={imageUrl}
          alt={HERO_SECTION_IMAGE}
          fill
          className="object-cover object-center"
        />
      )}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {headingSections.map((section, i) => (
          <div
            key={i}
            className={`absolute w-full p-4 text-center text-white transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="w-2/3 mx-auto mb-1 title-hero">{section.heading}</p>
            <p className="subtitle">{section.subheading}</p>
          </div>
        ))}
        {heroSectionContent}
      </div>
    </div>
  );
}
