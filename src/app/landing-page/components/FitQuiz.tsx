"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fitQuizData } from "app/lib/data/fitQuiz";

import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import FitQuizButtons from "./FitQuizButtons";
import FitQuizContent from "./FitQuizContent";
import { useFilter } from "../hooks/useFilter";
import Card from "app/components/Card";
import {
  BROWSE_ALL_PACKAGES,
  FIT_QUIZ_TITLE,
  READY_TO_SLAY_FIT,
} from "app/utils/variables";
import Button from "app/components/Button";
import FitQuizProgressBar from "./FitQuizProgressBar";
import { ROUTES } from "app/utils/routes";

interface FitQuizProps {
  ref: React.RefObject<HTMLDivElement | null>;
  packages: TypePackageFields[];
  closeFitQuiz: () => void;
}

export default function FitQuiz({ ref, packages, closeFitQuiz }: FitQuizProps) {
  const [activeStep, setActiveStep] = useState<number>(fitQuizData.steps[0].id);
  const [showResult, setShowResult] = useState<boolean>(false);
  const router = useRouter();

  const totalSteps = fitQuizData.steps.length;
  const {
    selectedOptions,
    handleOptionSelect,
    filteredPackages,
    specialPackages,
    clearSelectedOptions,
  } = useFilter(packages);

  const resetQuiz = () => {
    setActiveStep(fitQuizData.steps[0].id);
    setShowResult(false);
    clearSelectedOptions();
    closeFitQuiz();
  };

  const handleShowResult = (showResult: boolean) => {
    setShowResult(showResult);
  };

  return (
    <div className="w-full py-20 min-h-screen flex gap-4" ref={ref}>
      <Card glassmorphism className="flex-3 p-8 justify-center bg-primary/50">
        <p className="mb-4 text-2xl font-medium text-center">
          {FIT_QUIZ_TITLE}
        </p>
        <FitQuizProgressBar activeStep={activeStep} />
        <FitQuizContent
          activeStep={activeStep}
          selectedOptions={selectedOptions}
          showResult={showResult}
          filteredPackages={filteredPackages}
          specialPackages={specialPackages}
          handleOptionSelect={handleOptionSelect}
        />
        <FitQuizButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          totalSteps={totalSteps}
          selectedOptions={selectedOptions}
          showResult={showResult}
          handleShowResult={handleShowResult}
          resetQuiz={resetQuiz}
        />
      </Card>
      <Card
        glassmorphism
        className="flex-1 flex flex-col items-center justify-center bg-primary/50"
      >
        <p className="text-2xl font-medium mb-4">{READY_TO_SLAY_FIT}</p>
        <Button
          label={BROWSE_ALL_PACKAGES}
          variant="primary"
          hasShadow
          glassmorphism
          onClick={() => router.push(ROUTES.PRICING)}
        />
      </Card>
    </div>
  );
}
