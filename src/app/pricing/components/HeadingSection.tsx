"use client";

import { useRouter } from "next/navigation";
import { AssetFields } from "contentful";
import Image from "next/image";

import { getAssetUrl } from "app/utils/utils";
import { HERO_SECTION_IMAGE, PRICING_PAGE_TITLE } from "app/utils/variables";
import Button from "app/components/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface HeadingSectionProps {
  title: string;
  subtitle: string;
  image: AssetFields;
}

export default function HeadingSection({
  title,
  subtitle,
  image,
}: HeadingSectionProps) {
  const router = useRouter();
  const imageUrl = getAssetUrl(image);

  return (
    <div className="flex">
      <div className="w-1/2">
        <Image
          src={imageUrl}
          alt={HERO_SECTION_IMAGE}
          width={image.file?.details.image?.width}
          height={image.file?.details.image?.height}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center text-center gap-4 p-20">
        <Button
          label={PRICING_PAGE_TITLE}
          variant="outlined"
          iconLeft={<ArrowLeftIcon className="size-4" strokeWidth={2} />}
          onClick={() => router.back()}
          className="py-1"
        />
        <p className="text-7xl font-righteous">{title}</p>
        <p className="text-4xl font-light">{subtitle}</p>
      </div>
    </div>
  );
}
