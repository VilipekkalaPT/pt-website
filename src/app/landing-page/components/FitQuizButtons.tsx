import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Button from "app/components/Button";
import { BACK, NEXT, RETAKE_QUIZ, START } from "app/utils/variables";

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
  const showStartButton = activeStep === 0 && !showResult;
  const showBackButton = activeStep > 0 && !showResult;
  const showNextButton =
    activeStep > 0 && activeStep < totalSteps - 1 && !showResult;
  const showFinishButton = activeStep === totalSteps - 1 && !showResult;
  const showRetakeQuizButton = activeStep === totalSteps - 1 && showResult;
  const disabledNextButton =
    !selectedOptions.get(activeStep)?.length ||
    selectedOptions.get(activeStep)?.length === 0;

  const visibleButtons = [
    showStartButton,
    showBackButton,
    showNextButton || showFinishButton,
    showRetakeQuizButton,
  ].filter(Boolean).length;

  return (
    <div
      className={`mt-8 w-full flex ${
        visibleButtons === 1 ? "justify-center" : "justify-between"
      } gap-4`}
    >
      {showStartButton && (
        <Button
          label={START}
          variant="primary"
          onClick={() => setActiveStep(activeStep + 1)}
          className="w-1/3 flex justify-center"
        />
      )}
      {showBackButton && (
        <Button
          label={BACK}
          variant="ghost"
          iconLeft={<ArrowLeftIcon className="size-4" />}
          onClick={() => setActiveStep(activeStep - 1)}
        />
      )}
      {showNextButton && (
        <Button
          label={NEXT}
          variant="primary"
          iconRight={<ArrowRightIcon className="size-4" />}
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={disabledNextButton}
        />
      )}
      {showFinishButton && (
        <Button
          label="Finish"
          variant="primary"
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
