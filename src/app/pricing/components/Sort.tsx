"use client";

import Button from "app/components/Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { SORT_TYPE, SortOption } from "../hooks/useSort";

interface SortProps {
  selectedSort: SORT_TYPE;
  options: SortOption[];
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
