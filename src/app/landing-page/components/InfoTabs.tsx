"use client";

import InfoCard from "app/components/InfoCard";
import { Tab } from "app/lib/types/type";
import { useState } from "react";
import StepIndicator from "app/components/StepIndicator";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "app/components/Button";

interface TabsProps {
  tabs: Tab[];
}

export default function InfoTabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = tabs.map((tab) => tab.label);

  return (
    <div className="py-8 md:py-16 w-full">
      <div className="w-full md:w-2/3 mx-auto">
        <StepIndicator
          steps={steps}
          activeStep={activeIndex}
          toggleStep={(step) => setActiveIndex(step)}
        />
      </div>
      <div className="my-2">
        <InfoCard infoCards={tabs[activeIndex].infoCards} />
        {tabs[activeIndex].subtitle && (
          <Button
            iconLeft={
              <ExclamationTriangleIcon className="size-4 stroke-[1.6]" />
            }
            label={tabs[activeIndex].subtitle}
            variant="ghost"
            glassmorphism
            className="mt-16 mx-auto text-white/40"
          />
        )}
      </div>
    </div>
  );
}
