"use client";

import Image from "next/image";
import { TypeLandingPageHeadingSectionFields } from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import { getAssetUrl } from "app/utils/utils";
import { BANNER } from "app/utils/variables";
import Button from "app/components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "app/utils/routes";

interface HeadingSectionProps {
  banner: AssetFields;
  headingSections: TypeLandingPageHeadingSectionFields[];
  actionButtonText1: string;
  actionButtonText2: string;
}

export default function HeadingSection({
  banner,
  headingSections,
  actionButtonText1,
  actionButtonText2,
}: HeadingSectionProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headingSections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [headingSections.length]);

  const bannerUrl = getAssetUrl(banner);

  return (
    <div className="relative w-screen h-screen">
      <Image
        src={bannerUrl}
        alt={BANNER}
        fill
        style={{ objectFit: "cover" }}
        className="block w-full h-auto "
      />
      <div className="absolute inset-0 bg-black/70 z-10 flex  items-center justify-center">
        {headingSections.map((section, i) => (
          <div
            key={i}
            className={`absolute text-center text-white transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-6xl mb-3">{section.heading}</p>
            <p className="text-3xl">{section.subheading}</p>
          </div>
        ))}
        <div className="mt-50 flex">
          <Button
            label={actionButtonText1}
            variant="secondary"
            onClick={() => router.push(ROUTES.ABOUT)}
            className="mr-4"
          />
          <Button
            label={actionButtonText2}
            variant="primary"
            onClick={() => router.push(ROUTES.CONTACT)}
            className="bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
}
