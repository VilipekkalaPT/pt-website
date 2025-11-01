"use client";

import { useEffect, useRef } from "react";
import FitQuiz from "./FitQuiz";
import Card, { CardContent } from "app/components/Card";
import Button from "app/components/Button";
import {
  TypeImageCardFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { useRouter } from "next/navigation";
import { useFitQuizManager } from "../hooks/useFitQuizManager";

interface CardsFitQuizSectionProps {
  cards: TypeImageCardFields[];
  packages: TypePackageFields[];
}

export default function CardsFitQuizSection({
  cards,
  packages,
}: CardsFitQuizSectionProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fitQuizRef = useRef<HTMLDivElement | null>(null);
  const {
    showFitQuiz,
    activeStep,
    showResult,
    hasMatchedPackages,
    selectedOptions,
    storedFilterPackages,
    finalPackages,
    setActiveStep,
    setShowFitQuiz,
    handleOptionSelect,
    handleShowResult,
    handleClose,
  } = useFitQuizManager(packages, containerRef);

  useEffect(() => {
    if (showFitQuiz && fitQuizRef.current) {
      fitQuizRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showFitQuiz]);

  const openFitQuiz = () => {
    setShowFitQuiz(true);
  };

  return (
    <div ref={containerRef} className="mx-8 md:mx-16 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <Card key={index} glassmorphism className="px-8 py-16 bg-primary/50">
            <CardContent className="flex flex-col items-center text-center gap-4">
              <p className="heading mb-1">{card.title}</p>
              <Button
                label={card.actionButtonText}
                variant="primary"
                glassmorphism
                hasShadow
                onClick={
                  card.url ? () => router.push(`${card.url}`) : openFitQuiz
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
      {showFitQuiz && (
        <FitQuiz
          ref={fitQuizRef}
          activeStep={activeStep}
          showResult={showResult}
          hasMatchedPackages={hasMatchedPackages}
          selectedOptions={selectedOptions}
          storedFilterPackages={storedFilterPackages}
          finalPackages={finalPackages}
          setActiveStep={setActiveStep}
          handleOptionSelect={handleOptionSelect}
          handleShowResult={handleShowResult}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}
