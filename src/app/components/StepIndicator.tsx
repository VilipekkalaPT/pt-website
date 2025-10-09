import cn from "classnames";

interface StepIndicatorProps {
  steps: string[];
  activeStep: number;
  toggleStep?: (step: number) => void;
  className?: string;
}

export default function StepIndicator({
  steps,
  activeStep,
  toggleStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div
          onClick={() => toggleStep && toggleStep(index)}
          key={step}
          className={cn("flex-1 text-center font-light py-2 border-b-2", {
            "border-border-neutral-primary text-border-neutral-primary":
              index === activeStep,
            "border-border-neutral-tertiary text-border-neutral-tertiary":
              index !== activeStep,
            "cursor-pointer": !!toggleStep,
            className,
          })}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
