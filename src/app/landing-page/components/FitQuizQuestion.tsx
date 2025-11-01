import Card from "app/components/Card";
import React from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { FitQuizStep } from "app/lib/types/type";

interface FitQuizQuestionProps {
  stepData: FitQuizStep;
  selectedOptions: Map<number, string[]>;
  handleOptionSelect: (stepId: number, options: string) => void;
}

export default function FitQuizQuestion({
  stepData,
  selectedOptions,
  handleOptionSelect,
}: FitQuizQuestionProps) {
  return (
    <motion.div
      key={stepData?.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full flex gap-4 md:gap-8"
    >
      {stepData.options.map((option) => {
        const isSelected = selectedOptions
          .get(stepData.id)
          ?.includes(option.id);

        return (
          <Card
            glassmorphism
            key={option.id}
            className={cn(
              "flex-1 py-8 px-4 md:px-6 md:py-12 justify-center items-center text-center cursor-pointer hover:bg-black/50",
              {
                "bg-black/50": isSelected,
              }
            )}
            onClick={() => handleOptionSelect(stepData.id, option.id)}
          >
            <p className="body-strong">{option.label}</p>
            <p className="body-small">{option.description}</p>
            {isSelected && (
              <CheckCircleIcon className="size-6 absolute bottom-2 right-2" />
            )}
          </Card>
        );
      })}
    </motion.div>
  );
}
