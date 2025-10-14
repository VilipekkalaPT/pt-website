"use client";

import { useState } from "react";

import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful";
import { TypePricingDifferentServicesComparisonFields } from "app/lib/types/contentful/TypePricingDifferentServicesComparison";
import PackageTypeComparison from "./PackageTypeComparison";
import DifferentServicesComparison from "./DifferentServicesComparison";
import StepIndicator from "app/components/StepIndicator";
import InfoSection from "app/components/InfoSection";

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
      <InfoSection title={title} />
      <div className="w-1/4 mt-6 mb-6">
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
