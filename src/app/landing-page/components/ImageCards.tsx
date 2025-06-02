import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import { TypeLandingPageCardFields } from "app/lib/types/contentful";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Image from "next/image";

interface ImageCardProps {
  imageCards: TypeLandingPageCardFields[];
}

export default function ImageCards({ imageCards }: ImageCardProps) {
  const newImageCards = imageCards.map((card) => {
    const image = card.image.fields as AssetFields;
    return {
      ...card,
      image: image,
    };
  });

  return (
    <div className="mt-35 px-12 grid grid-cols-2 gap-10">
      {newImageCards.map((card, index) => {
        const imageUrl = getAssetUrl(card.image);

        return (
          <div key={index} className="relative">
            <Image
              src={imageUrl}
              alt={card.title}
              width={card.image.file?.details.image?.width}
              height={card.image.file?.details.image?.height}
            />
            <div className="absolute top-0 left-0 bg-black/70 w-full h-full flex flex-col items-center justify-center text-white">
              <p className="text-2xl font-semibold mb-1">{card.title}</p>
              <p className="text-xl mb-6">{card.subtitle}</p>
              <Button
                label={card.actionButtonText}
                variant="secondary"
                iconRight={<ArrowRightIcon className="size-4" />}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
