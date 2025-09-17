"use client";

import { AssetFields } from "contentful";
import Button from "app/components/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "app/utils/routes";
import HeroSection from "app/components/HeroSection";
import { HeadingSectionType } from "app/lib/types/type";

interface HeadingSectionProps {
  banner: AssetFields;
  headingSections: HeadingSectionType[];
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

  return (
    <HeroSection
      image={banner}
      headingSections={headingSections}
      fillImage
      heroSectionContent={
        <div className="mt-70 flex">
          <Button
            label={actionButtonText1}
            variant="secondary"
            shadowType="both"
            onClick={() => router.push(`${ROUTES.PRICING}/solo-packages`)}
            className="mr-4"
          />
          <Button
            label={actionButtonText2}
            variant="secondary"
            shadowType="both"
            onClick={() => router.push(`${ROUTES.PRICING}/duo-packages`)}
          />
        </div>
      }
    />
  );
}
