import Button from "app/components/Button";
import { BACK, NEXT, EXIT } from "app/utils/variables";

interface FitQuizButtonsProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  totalSteps: number;
  selectedOptions: Map<number, string[]>;
  showResult: boolean;
  handleShowResult: (showResult: boolean) => void;
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
  const showBackButton = activeStep > 0;
  const showExitButton = activeStep === totalSteps - 1 && showResult;
  const disableNextButton =
    !selectedOptions.get(activeStep)?.length ||
    selectedOptions.get(activeStep)?.length === 0;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === totalSteps - 2) {
      handleShowResult(true);
    }
  };

  const handleBack = () => {
    console.log(activeStep);
    if (activeStep === totalSteps - 1) {
      handleShowResult(false);
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <div className={`mt-8 w-full flex justify-center gap-4`}>
      {showBackButton && (
        <Button
          label={BACK}
          variant="ghost"
          glassmorphism
          onClick={handleBack}
          className="px-6"
        />
      )}
      {showExitButton ? (
        <Button
          label={EXIT}
          variant="ghost"
          glassmorphism
          onClick={resetQuiz}
          className="px-6"
        />
      ) : (
        <Button
          label={NEXT}
          variant="ghost"
          glassmorphism
          disabled={disableNextButton}
          onClick={handleNext}
          className="px-6"
        />
      )}
    </div>
  );
}
