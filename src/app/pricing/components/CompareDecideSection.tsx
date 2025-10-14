"use client";

import { useState } from "react";

import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful";
import { TypePricingDifferentServicesComparisonFields } from "app/lib/types/contentful/TypePricingDifferentServicesComparison";
import PackageTypeComparison from "./PackageTypeComparison";
import DifferentServicesComparison from "./DifferentServicesComparison";
import StepIndicator from "app/components/StepIndicator";

interface CompareDecideSectionProps {
  title: string;
  packageTypeComparisonRows: TypePricingPackageTypeComparisionFields[];
  differentServicesComparisonRows: TypePricingDifferentServicesComparisonFields[];
  steps: ("Focus areas" | "Service types")[];
}

export default function CompareDecideSection({
  title,
  packageTypeComparisonRows,
  differentServicesComparisonRows,
  steps,
}: CompareDecideSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="mt-14 w-4/5 mx-auto flex flex-col items-center">
      <ArrowDownIcon className="size-12 text-icon-secondary stroke-2 mb-8" />
      <p className="col-span-5 heading mb-8 text-center">{title}</p>
      <div className="w-1/4 mb-6">
        <StepIndicator
          steps={steps}
          activeStep={activeStep}
          toggleStep={toggleStep}
        />
      </div>
      {activeStep === 0 && (
        <PackageTypeComparison rows={packageTypeComparisonRows} />
      )}
      {activeStep === 1 && (
        <DifferentServicesComparison rows={differentServicesComparisonRows} />
      )}
    </div>
  );
}
