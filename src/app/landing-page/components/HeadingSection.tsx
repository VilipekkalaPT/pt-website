"use client";

import { TypeLandingPageHeadingSectionFields } from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import Button from "app/components/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "app/utils/routes";
import HeroSection from "app/components/HeroSection";

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

  return (
    <HeroSection
      image={banner}
      headingSections={headingSections}
      fillImage
      heroSectionContent={
        <div className="mt-60 flex">
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
      }
    />
  );
}
