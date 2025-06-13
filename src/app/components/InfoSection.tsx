"use client";

import { TypeImageCardFields } from "app/lib/types/contentful";
import { TypeImageCardFieldsWithImage } from "app/lib/types/contentful/TypeImageCard";
import { ROUTES } from "app/utils/routes";
import { useRouter } from "next/navigation";
import ImageCard from "./ImageCard";
import cn from "classnames";

interface InfoSectionProps {
  title: string;
  subtitle: string;
  imageCards: TypeImageCardFields[];
  className?: string;
}

export default function InfoSection({
  title,
  subtitle,
  imageCards,
  className,
}: InfoSectionProps) {
  const router = useRouter();
  const imageCardsWithImage = imageCards.map((card) => ({
    ...card,
    image: card.image.fields,
  })) as TypeImageCardFieldsWithImage[];

  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
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
