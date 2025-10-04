import { STEP, RESULT } from "app/utils/variables";
import { fitQuizData } from "app/lib/data/fitQuiz";
import cn from "classnames";

interface FitQuizProgressBarProps {
  activeStep: number;
}

export default function FitQuizProgressBar({
  activeStep,
}: FitQuizProgressBarProps) {
  const totalSteps = fitQuizData.steps.length;
  const totalStepsArray = Array.from({ length: totalSteps }, (_, i) => i);

  return (
    <div className="w-1/2 mx-auto">
      <div className="flex justify-between">
        {totalStepsArray.map((step) => (
          <p
            key={step}
            className={cn("flex-1 text-center font-light py-2 border-b-2", {
              "border-border-neutral-primary text-border-neutral-primary":
                step === activeStep,
              "border-border-neutral-tertiary text-border-neutral-tertiary":
                step !== activeStep,
            })}
          >
            {step === totalStepsArray.length - 1
              ? `${RESULT}`
              : `${STEP} ${step + 1}`}
          </p>
        ))}
      </div>
    </div>
  );
}
