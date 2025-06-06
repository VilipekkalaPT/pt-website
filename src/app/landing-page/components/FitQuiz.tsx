"use client";

import FitQuizProgressBar from "./FitQuizProgressBar";
import { useState } from "react";
import { fitQuizData } from "app/lib/data/fitQuiz";

import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import FitQuizButtons from "./FitQuizButtons";
import FitQuizContent from "./FitQuizContent";
import { useFilter } from "../hooks/useFilter";
import FitQuizResult from "./FitQuizResult";

interface FitQuizProps {
  ref: React.RefObject<HTMLDivElement | null>;
  packages: TypePackageFields[];
}

export default function FitQuiz({ ref, packages }: FitQuizProps) {
  const [activeStep, setActiveStep] = useState<number>(fitQuizData.steps[0].id);
  const [showResult, setShowResult] = useState<boolean>(false);

  const totalSteps = fitQuizData.steps.length;
  const stepData = fitQuizData.steps.find((step) => step.id === activeStep);
  const {
    selectedOptions,
    handleOptionSelect,
    filteredPackages,
    clearSelectedOptions,
  } = useFilter(packages);

  const resetQuiz = () => {
    setActiveStep(fitQuizData.steps[0].id);
    setShowResult(false);
    clearSelectedOptions();
  };

  return (
    <div
      className="w-3/4 mx-auto min-h-screen flex flex-col justify-center items-center"
      ref={ref}
    >
      <FitQuizProgressBar activeStep={activeStep} totalSteps={totalSteps} />
      {stepData && !showResult && (
        <FitQuizContent
          stepData={stepData}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
          filteredPackages={filteredPackages}
          showResult={showResult}
        />
      )}
      {showResult && <FitQuizResult result={filteredPackages} />}
      <FitQuizButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        totalSteps={totalSteps}
        selectedOptions={selectedOptions}
        showResult={showResult}
        handleShowResult={() => setShowResult(true)}
        resetQuiz={resetQuiz}
      />
    </div>
  );
}
