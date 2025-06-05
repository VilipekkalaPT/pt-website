import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Button from "app/components/Button";
import { BACK, NEXT, RETAKE_QUIZ } from "app/utils/variables";
import { PackageFilter } from "../hooks/useFilter";

interface FitQuizButtonsProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  totalSteps: number;
  filters: PackageFilter[];
  showResult: boolean;
  handleShowResult: () => void;
  resetQuiz?: () => void;
}

export default function FitQuizButtons({
  activeStep,
  setActiveStep,
  totalSteps,
  filters,
  showResult,
  handleShowResult,
  resetQuiz,
}: FitQuizButtonsProps) {
  const showBackButton = activeStep > 1 && !showResult;
  const showNextButton = activeStep < totalSteps && !showResult;
  const showFinishButton = activeStep === totalSteps && !showResult;
  const showRetakeQuizButton = showResult;

  return (
    <div className="mt-8 w-1/5 flex justify-between">
      {showBackButton && (
        <Button
          label={BACK}
          variant="ghost"
          iconLeft={<ArrowLeftIcon className="size-4" />}
          onClick={() => setActiveStep(activeStep - 1)}
          className="flex-1 flex justify-center"
        />
      )}
      {showNextButton && (
        <Button
          label={NEXT}
          variant="primary"
          iconRight={<ArrowRightIcon className="size-4" />}
          onClick={() => setActiveStep(activeStep + 1)}
          className="flex-1 flex justify-center"
          disabled={filters.length === 0}
        />
      )}
      {showFinishButton && (
        <Button
          label="Finish"
          variant="primary"
          className="flex-1 flex justify-center"
          iconRight={<ArrowRightIcon className="size-4" />}
          disabled={filters.length < totalSteps}
          onClick={handleShowResult}
        />
      )}
      {showRetakeQuizButton && (
        <Button
          label={RETAKE_QUIZ}
          variant="ghost"
          onClick={resetQuiz}
          iconLeft={<ArrowPathIcon className="size-4" />}
        />
      )}
    </div>
  );
}
