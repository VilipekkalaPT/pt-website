"use client";

import Button from "app/components/Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { SORT_TYPE } from "app/utils/variables";
import cn from "classnames";

interface Option {
  label: string;
  value: SORT_TYPE;
}

interface SortProps {
  selectedSort: string;
  options: Option[];
  handleSortChange: (value: SORT_TYPE) => void;
  className?: string;
}

export default function Sort({
  selectedSort,
  options,
  handleSortChange,
  className,
}: SortProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          label={option.label}
          variant={selectedSort === option.value ? "primary" : "secondary"}
          iconLeft={
            selectedSort === option.value ? (
              <CheckIcon className="size-6" />
            ) : null
          }
          onClick={() => handleSortChange(option.value)}
        />
      ))}
    </div>
  );
}
