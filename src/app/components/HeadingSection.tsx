"use client";

import { useRouter } from "next/navigation";
import { AssetFields } from "contentful";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Button from "app/components/Button";
import { getAssetUrl } from "app/utils/utils";
import { HEADING_IMAGE } from "app/utils/variables";

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
  const router = useRouter();
  const imageUrl = getAssetUrl(image);

  return (
    <div className="flex">
      <div className="w-1/2 relative h-[40rem]">
        <Image
          src={imageUrl}
          alt={HEADING_IMAGE}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center text-center gap-4 p-20">
        {backButtonLabel && (
          <Button
            label={backButtonLabel}
            variant="outlined"
            iconLeft={<ArrowLeftIcon className="size-4" strokeWidth={2} />}
            onClick={() => router.back()}
            className="py-1"
          />
        )}
        <p className="title-hero">{title}</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
