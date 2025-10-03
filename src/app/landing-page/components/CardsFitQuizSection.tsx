"use client";

import { useEffect, useRef, useState } from "react";
import FitQuiz from "./FitQuiz";
import Card, { CardContent } from "app/components/Card";
import Button from "app/components/Button";
import {
  TypeImageCardFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { useRouter } from "next/navigation";

interface CardsFitQuizSectionProps {
  cards: TypeImageCardFields[];
  packages: TypePackageFields[];
}

export default function CardsFitQuizSection({
  cards,
  packages,
}: CardsFitQuizSectionProps) {
  const router = useRouter();
  const [showFitQuiz, setShowFitQuiz] = useState(false);
  const fitQuizRef = useRef<HTMLDivElement | null>(null);

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
    <div className="w-4/5 mx-auto">
      <div className="mt-12 grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            glassmorphism
            className="px-8 py-16 rounded-[20px] bg-primary/50"
          >
            <CardContent className="flex flex-col items-center text-center gap-4">
              <p className="text-2xl font-medium mb-1">{card.title}</p>
              <Button
                label={card.actionButtonText}
                variant="secondary"
                glassmorphism
                hasShadow
                onClick={
                  card.url ? () => router.push(`${card.url}`) : handleClick
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
      {showFitQuiz && <FitQuiz ref={fitQuizRef} packages={packages} />}
    </div>
  );
}
