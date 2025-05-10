"use client";

import Button from "app/components/Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { SORT_TYPE } from "app/utils/variables";

interface Option {
  label: string;
  value: SORT_TYPE;
}

interface SortProps {
  selectedSort: string;
  options: Option[];
  handleSortChange: (value: SORT_TYPE) => void;
}

export default function Sort({
  selectedSort,
  options,
  handleSortChange,
}: SortProps) {
  return (
    <div className="flex gap-4">
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
