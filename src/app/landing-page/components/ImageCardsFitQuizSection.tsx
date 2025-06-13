"use client";

import { useEffect, useRef, useState } from "react";
import FitQuiz from "./FitQuiz";
import ImageCard from "app/components/ImageCard";
import {
  TypeImageCardFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import { useRouter } from "next/navigation";
import { TypeImageCardFieldsWithImage } from "app/lib/types/contentful/TypeImageCard";

interface ImageCardsFitQuizSectionProps {
  imageCards: TypeImageCardFields[];
  packages: TypePackageFields[];
}

export default function ImageCardsFitQuizSection({
  imageCards,
  packages,
}: ImageCardsFitQuizSectionProps) {
  const router = useRouter();
  const [showFitQuiz, setShowFitQuiz] = useState(false);
  const fitQuizRef = useRef<HTMLDivElement | null>(null);

  const newImageCards = imageCards.map((card) => {
    const image = card.image.fields as AssetFields;
    return {
      ...card,
      image: image,
    };
  }) as TypeImageCardFieldsWithImage[];

  const handleClick = () => {
    if (!showFitQuiz) {
      setShowFitQuiz(true);
    }

    if (fitQuizRef.current) {
      fitQuizRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (showFitQuiz && fitQuizRef.current) {
      fitQuizRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showFitQuiz]);

  return (
    <>
      <div className="mt-35 px-12 grid grid-cols-2 gap-10">
        {newImageCards.map((card, index) => (
          <ImageCard
            key={index}
            imageCard={card}
            handleClick={
              card.url ? () => router.push(`${card.url}`) : handleClick
            }
          />
        ))}
      </div>
      {showFitQuiz && <FitQuiz ref={fitQuizRef} packages={packages} />}
    </>
  );
}
