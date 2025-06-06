import {
  UserGroupIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Card from "app/components/Card";
import { FitQuizStep } from "app/lib/data/fitQuiz";
import React from "react";
import cn from "classnames";
import { FilteredPackage } from "../hooks/useFilter";
import { motion } from "framer-motion";

interface FitQuizContentProps {
  stepData: FitQuizStep;
  selectedOptions: Map<number, string[]>;
  handleOptionSelect: (stepId: number, options: string) => void;
  filteredPackages: {
    filteredPackages: FilteredPackage[];
    specialPackages: FilteredPackage[];
  };
  showResult: boolean;
}

export default function FitQuizContent({
  stepData,
  selectedOptions,
  handleOptionSelect,
}: FitQuizContentProps) {
  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="text-center">
        <p className="mt-12 text-2xl font-semibold">{stepData.question}</p>
        <p className="mt-1 mb-6 text-xl text-gray-400">{stepData.subtitle}</p>
      </div>
      <motion.div
        key={stepData.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full flex gap-8"
      >
        {stepData.options.map((option, index) => (
          <Card
            key={option.id}
            className={cn(
              "flex-1 items-center text-center py-6 px-12 cursor-pointer hover:bg-gray-100",
              {
                "bg-gray-100": selectedOptions
                  .get(stepData.id)
                  ?.includes(option.id),
              }
            )}
            onClick={() => handleOptionSelect(stepData.id, option.id)}
          >
            {getIconComponent(index)}
            <p className="text-xl font-semibold">{option.label}</p>
            <p className="text-gray-700">{option.description}</p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}

const getIconComponent = (index: number) => {
  const style = "size-10 mb-4";

  switch (index) {
    case 0:
      return <UserIcon className={style} />;
    case 1:
      return <UsersIcon className={style} />;
    case 2:
      return <UserGroupIcon className={style} />;
    default:
      return <UserIcon className={style} />;
  }
};
