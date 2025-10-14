import React from "react";

import { fitQuizData } from "app/lib/data/fitQuiz";
import FitQuizQuestion from "./FitQuizQuestion";
import FitQuizResult from "./FitQuizResult";
import { FilteredPackage } from "../hooks/useFitQuizManager";

interface FitQuizContentProps {
  activeStep: number;
  selectedOptions: Map<number, string[]>;
  showResult: boolean;
  hasMatchedPackages: boolean;
  displayedPackages: FilteredPackage[];
  handleOptionSelect: (stepId: number, options: string) => void;
}

export default function FitQuizContent({
  activeStep,
  selectedOptions,
  showResult,
  hasMatchedPackages,
  displayedPackages,
  handleOptionSelect,
}: FitQuizContentProps) {
  const stepData = fitQuizData.steps.find((step) => step.id === activeStep);

  if (!stepData) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {showResult ? (
        <FitQuizResult
          hasMatchedPackages={hasMatchedPackages}
          displayedPackages={displayedPackages}
        />
      ) : (
        <>
          <p className="my-4 subheading">{stepData.title}</p>
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
