"use client";

import { useEffect, useRef, useState } from "react";
import FitQuiz from "./FitQuiz";
import ImageCard from "app/components/ImageCard";
import {
  TypeLandingPageCardFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import { TypeLandingPageCardFieldsWithImage } from "app/lib/types/contentful/TypeLandingPageCard";
import { useRouter } from "next/navigation";

interface ImageCardsFitQuizSectionProps {
  imageCards: TypeLandingPageCardFields[];
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
  }) as TypeLandingPageCardFieldsWithImage[];

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
          <div key={index}>
            <ImageCard
              imageCard={card}
              handleClick={
                card.slug ? () => router.push(`/${card.slug}`) : handleClick
              }
            />
          </div>
        ))}
      </div>
      {showFitQuiz && <FitQuiz ref={fitQuizRef} packages={packages} />}
    </>
  );
}
