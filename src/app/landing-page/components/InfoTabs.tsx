"use client";

import Button from "app/components/Button";
import InfoCard from "app/components/InfoCard";
import { Tab } from "app/lib/types/type";
import { useState } from "react";
import cn from "classnames";
import { INFO_TABS, TO_BE_DISCUSSED } from "app/utils/variables";

type TabsProps = {
  tabs: Tab[];
  showCurriculum?: boolean;
};

export default function InfoTabs({ tabs, showCurriculum }: TabsProps) {
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
        {renderInfoCard(tabs[activeIndex], showCurriculum)}
      </div>
    </div>
  );
}

const renderInfoCard = (tab: Tab, showCurriculum?: boolean) => {
  if (tab.label === INFO_TABS.CURRICULUM) {
    return showCurriculum ? (
      <InfoCard infoCard={tab.infoCards} />
    ) : (
      <p className="text-gray-500">{TO_BE_DISCUSSED}</p>
    );
  }
  return <InfoCard infoCard={tab.infoCards} />;
};
