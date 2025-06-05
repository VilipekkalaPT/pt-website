"use client";

import FitQuizProgressBar from "./FitQuizProgressBar";
import { useState } from "react";
import { fitQuizData } from "app/lib/data/fitQuiz";

import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import FitQuizButtons from "./FitQuizButtons";
import FitQuizContent from "./FitQuizContent";
import { useFilter } from "../hooks/useFilter";

interface FitQuizProps {
  ref: React.RefObject<HTMLDivElement | null>;
  packages: TypePackageFields[];
}

export default function FitQuiz({ ref, packages }: FitQuizProps) {
  const [activeStep, setActiveStep] = useState<number>(fitQuizData.steps[0].id);
  const [showResult, setShowResult] = useState<boolean>(false);

  const totalSteps = fitQuizData.steps.length;
  const stepData = fitQuizData.steps.find((step) => step.id === activeStep);
  const { filteredPackages, filters, selectFilter, clearFilters } =
    useFilter(packages);

  const resetQuiz = () => {
    setActiveStep(fitQuizData.steps[0].id);
    setShowResult(false);
    clearFilters();
  };

  return (
    <div
      className="w-3/4 mx-auto h-screen flex flex-col justify-center items-center"
      ref={ref}
    >
      <FitQuizProgressBar activeStep={activeStep} totalSteps={totalSteps} />
      {stepData && (
        <FitQuizContent
          stepData={stepData}
          filters={filters}
          selectFilter={selectFilter}
          filteredPackages={filteredPackages}
          showResult={showResult}
        />
      )}
      <FitQuizButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        totalSteps={totalSteps}
        filters={filters}
        showResult={showResult}
        handleShowResult={() => setShowResult(true)}
        resetQuiz={resetQuiz}
      />
    </div>
  );
}
