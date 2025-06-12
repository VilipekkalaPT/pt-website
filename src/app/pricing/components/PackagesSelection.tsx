"use client";

import ImageCard from "app/components/ImageCard";
import {
  TypeImageCardFields,
  TypeImageCardFieldsWithImage,
} from "app/lib/types/contentful/TypeImageCard";
import { ROUTES } from "app/utils/routes";
import { useRouter } from "next/navigation";

interface PackagesSelectionProps {
  title: string;
  subtitle: string;
  imageCards: TypeImageCardFields[];
}

export default function PackagesSelection({
  title,
  subtitle,
  imageCards,
}: PackagesSelectionProps) {
  const router = useRouter();
  const imageCardsWithImage = imageCards.map((card) => ({
    ...card,
    image: card.image.fields,
  })) as TypeImageCardFieldsWithImage[];

  return (
    <div className="mt-35 w-full px-12 flex flex-col items-center">
      <p className="text-2xl font-semibold">{title}</p>
      <p className="mt-1 text-xl text-gray-500">{subtitle}</p>
      <div className="mt-10 w-full grid grid-cols-2 gap-10">
        {imageCardsWithImage.map((card, index) => (
          <ImageCard
            key={index}
            imageCard={card}
            handleClick={() => router.push(`${ROUTES.PRICING}/${card.url}`)}
          />
        ))}
      </div>
    </div>
  );
}
