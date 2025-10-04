import React from "react";

import { fitQuizData } from "app/lib/data/fitQuiz";
import FitQuizQuestion from "./FitQuizQuestion";
import FitQuizResult from "./FitQuizResult";
import { FilteredPackage } from "../hooks/useFilter";

interface FitQuizContentProps {
  activeStep: number;
  selectedOptions: Map<number, string[]>;
  showResult: boolean;
  filteredPackages: FilteredPackage[];
  specialPackages: FilteredPackage[];
  handleOptionSelect: (stepId: number, options: string) => void;
}

export default function FitQuizContent({
  activeStep,
  selectedOptions,
  showResult,
  filteredPackages,
  specialPackages,
  handleOptionSelect,
}: FitQuizContentProps) {
  const stepData = fitQuizData.steps.find((step) => step.id === activeStep);

  if (!stepData) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {showResult ? (
        <FitQuizResult
          filteredPackages={filteredPackages}
          specialPackages={specialPackages}
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
