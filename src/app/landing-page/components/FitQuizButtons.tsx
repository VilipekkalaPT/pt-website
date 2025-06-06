import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Button from "app/components/Button";
import { BACK, NEXT, RETAKE_QUIZ } from "app/utils/variables";

interface FitQuizButtonsProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  totalSteps: number;
  selectedOptions: Map<number, string[]>;
  showResult: boolean;
  handleShowResult: () => void;
  resetQuiz?: () => void;
}

export default function FitQuizButtons({
  activeStep,
  setActiveStep,
  totalSteps,
  selectedOptions,
  showResult,
  handleShowResult,
  resetQuiz,
}: FitQuizButtonsProps) {
  const showBackButton = activeStep > 0 && !showResult;
  const showNextButton = activeStep < totalSteps - 1 && !showResult;
  const showFinishButton = activeStep === totalSteps - 1 && !showResult;
  const showRetakeQuizButton = activeStep === totalSteps - 1 && showResult;
  const disabledNextButton =
    activeStep > 0 &&
    (!selectedOptions.get(activeStep)?.length ||
      selectedOptions.get(activeStep)?.length === 0);

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
          disabled={disabledNextButton}
        />
      )}
      {showFinishButton && (
        <Button
          label="Finish"
          variant="primary"
          className="flex-1 flex justify-center"
          iconRight={<ArrowRightIcon className="size-4" />}
          disabled={disabledNextButton}
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
