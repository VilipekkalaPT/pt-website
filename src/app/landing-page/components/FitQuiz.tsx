"use client";

import { useRouter } from "next/navigation";
import { fitQuizData } from "app/lib/data/fitQuiz";

import FitQuizButtons from "./FitQuizButtons";
import FitQuizContent from "./FitQuizContent";
import { FilteredPackage } from "../hooks/useFitQuizManager";
import Card from "app/components/Card";
import {
  BROWSE_ALL_PACKAGES,
  FIT_QUIZ_TITLE,
  READY_TO_SLAY_FIT,
  STEP,
  RESULT,
} from "app/utils/variables";
import Button from "app/components/Button";
import StepIndicator from "app/components/StepIndicator";
import { ROUTES } from "app/utils/routes";

interface FitQuizProps {
  ref: React.RefObject<HTMLDivElement | null>;
  activeStep: number;
  showResult: boolean;
  hasMatchedPackages: boolean;
  selectedOptions: Map<number, string[]>;
  storedFilterPackages: FilteredPackage[];
  finalPackages: FilteredPackage[];
  setActiveStep: (step: number) => void;
  handleOptionSelect: (stepId: number, option: string) => void;
  handleShowResult: (showResult: boolean) => void;
  handleClose: () => void;
}

export default function FitQuiz({
  ref,
  activeStep,
  showResult,
  hasMatchedPackages,
  selectedOptions,
  storedFilterPackages,
  finalPackages,
  setActiveStep,
  handleOptionSelect,
  handleShowResult,
  handleClose,
}: FitQuizProps) {
  const router = useRouter();
  const totalSteps = fitQuizData.steps.length;
  const totalStepsArray = [
    ...Array.from({ length: totalSteps - 1 }, (_, i) => `${STEP} ${i + 1}`),
    RESULT,
  ];

  return (
    <div
      className="w-full py-20 min-h-screen flex gap-8"
      id="fit-quiz"
      ref={ref}
    >
      <Card glassmorphism className="flex-3 p-6 justify-center bg-primary/50">
        <p className="mb-4 heading text-center">{FIT_QUIZ_TITLE}</p>
        <div className="w-1/2 mx-auto">
          <StepIndicator steps={totalStepsArray} activeStep={activeStep} />
        </div>
        <FitQuizContent
          activeStep={activeStep}
          selectedOptions={selectedOptions}
          showResult={showResult}
          hasMatchedPackages={hasMatchedPackages}
          displayedPackages={
            storedFilterPackages.length > 0
              ? storedFilterPackages
              : finalPackages
          }
          handleOptionSelect={handleOptionSelect}
        />
        <FitQuizButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          totalSteps={totalSteps}
          selectedOptions={selectedOptions}
          showResult={showResult}
          handleShowResult={handleShowResult}
          resetQuiz={handleClose}
        />
      </Card>
      <Card
        glassmorphism
        className="flex-1 flex flex-col items-center justify-center bg-primary/50"
      >
        <p className="heading mb-4">{READY_TO_SLAY_FIT}</p>
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
