"use client";

import Button from "app/components/Button";
import InfoCard from "app/components/InfoCard";
import { Tab } from "app/lib/types/type";
import { useState } from "react";
import cn from "classnames";

interface TabsProps {
  tabs: Tab[];
}

export default function InfoTabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-20 w-full px-12">
      <div className="w-full flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            variant="ghost"
            label={tab.label}
            onClick={() => setActiveIndex(index)}
            className={cn("w-full flex justify-center rounded-none", {
              "border-b-1": index === activeIndex,
              "text-gray-500 hover:text-gray-800 hover:border-b-1 hover:border-gray-800":
                index !== activeIndex,
            })}
          />
        ))}
      </div>
      <div className="my-10">
        <p className="text-sm text-gray-500 italic mb-10">
          {tabs[activeIndex].subtitle}
        </p>
        <InfoCard infoCard={tabs[activeIndex].infoCards} />
      </div>
    </div>
  );
}
