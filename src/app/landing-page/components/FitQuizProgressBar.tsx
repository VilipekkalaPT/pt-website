import { STEP } from "app/utils/variables";

interface FitQuizProgressBarProps {
  activeStep: number;
  totalSteps: number;
}

export default function FitQuizProgressBar({
  activeStep,
  totalSteps,
}: FitQuizProgressBarProps) {
  const totalStepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex justify-between border-b border-gray-200">
        {totalStepsArray.map((step) => (
          <p
            key={step}
            className={`flex-1 text-center py-2 font-medium text-sm ${
              step === activeStep ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            {`${STEP} ${step}`}
          </p>
        ))}
      </div>
    </div>
  );
}
