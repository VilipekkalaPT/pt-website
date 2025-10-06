import React from "react";

import { fitQuizData } from "app/lib/data/fitQuiz";
import FitQuizQuestion from "./FitQuizQuestion";
import FitQuizResult from "./FitQuizResult";
import { FilteredPackage } from "../hooks/useFilter";

interface FitQuizContentProps {
  activeStep: number;
  selectedOptions: Map<number, string[]>;
  showResult: boolean;
  hasMatchedPackages: boolean;
  finalPackages: FilteredPackage[];
  handleOptionSelect: (stepId: number, options: string) => void;
}

export default function FitQuizContent({
  activeStep,
  selectedOptions,
  showResult,
  hasMatchedPackages,
  finalPackages,
  handleOptionSelect,
}: FitQuizContentProps) {
  const stepData = fitQuizData.steps.find((step) => step.id === activeStep);

  if (!stepData) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {showResult ? (
        <FitQuizResult
          hasMatchedPackages={hasMatchedPackages}
          finalPackages={finalPackages}
        />
      ) : (
        <>
          <p className="my-4 text-2xl font-light">{stepData.title}</p>
          <FitQuizQuestion
            stepData={stepData}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
          />
        </>
      )}
    </div>
  );
}
