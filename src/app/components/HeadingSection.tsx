"use client";

import { useRouter } from "next/navigation";
import { AssetFields } from "contentful";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Button from "app/components/Button";
import { getAssetUrl } from "app/utils/utils";
import { HEADING_IMAGE } from "app/utils/variables";
import { ROUTES } from "../utils/routes";
import HeroSection from "./HeroSection";
import { HeadingSectionType } from "../lib/types/type";

interface HeadingSectionProps {
  title: string;
  subtitle: string;
  image: AssetFields;
  backButtonLabel?: string;
}

export default function HeadingSection({
  title,
  subtitle,
  image,
  backButtonLabel,
}: HeadingSectionProps) {
  return (
    <>
      <DesktopHeadingSection
        title={title}
        subtitle={subtitle}
        image={image}
        backButtonLabel={backButtonLabel}
      />
      <MobileHeadingSection
        title={title}
        subtitle={subtitle}
        image={image}
        backButtonLabel={backButtonLabel}
      />
    </>
  );
}

const DesktopHeadingSection = ({
  title,
  subtitle,
  image,
  backButtonLabel,
}: HeadingSectionProps) => {
  const router = useRouter();
  const imageUrl = getAssetUrl(image);

  return (
    <div className="hidden md:flex">
      <div className="w-1/2 relative h-[45rem]">
        <Image
          src={imageUrl}
          alt={HEADING_IMAGE}
          fill
          className="object-cover object-center rounded-r-lg"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center text-center gap-4 p-20">
        {backButtonLabel && (
          <Button
            label={backButtonLabel}
            variant="outlined"
            iconLeft={<ArrowLeftIcon className="size-4" strokeWidth={2} />}
            onClick={() => router.push(ROUTES.PRICING)}
            className="py-1"
          />
        )}
        <p className="title-hero">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

const MobileHeadingSection = ({
  title,
  subtitle,
  image,
  backButtonLabel,
}: HeadingSectionProps) => {
  const router = useRouter();
  const headingSections: HeadingSectionType[] = [
    {
      heading: title,
      subheading: subtitle,
    },
  ];

  return (
    <div className="md:hidden relative">
      <HeroSection
        image={image}
        headingSections={headingSections}
        fillImage={false}
      />
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2">
        {backButtonLabel && (
          <Button
            label={backButtonLabel}
            variant="outlined"
            iconLeft={<ArrowLeftIcon className="size-4" strokeWidth={2} />}
            onClick={() => router.push(ROUTES.PRICING)}
            className="py-1"
          />
        )}
      </div>
    </div>
  );
};
