"use client";

import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import { TypeImageCardFieldsWithImage } from "app/lib/types/contentful/TypeImageCard";
import { getAssetUrl } from "app/utils/utils";
import Image from "next/image";

interface ImageCardProps {
  imageCard?: TypeImageCardFieldsWithImage;
  handleClick?: () => void;
}

export default function ImageCard({ imageCard, handleClick }: ImageCardProps) {
  const { title, actionButtonText } = imageCard || {};
  const imageUrl = getAssetUrl(image);

  return (
    <div className="relative">
      {imageCard && (
        <Image
          src={imageUrl}
          alt={title}
          width={image.file?.details.image?.width}
          height={image.file?.details.image?.height}
        />
      )}
      <div className="absolute top-0 left-0 bg-black/70 w-full h-full rounded-lg flex flex-col items-center justify-center text-white">
        <p className="text-2xl font-semibold mb-1">{title}</p>
        <p className="text-xl mb-6">{subtitle}</p>
        <Button
          label={actionButtonText}
          variant="secondary"
          shadowType="both"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
