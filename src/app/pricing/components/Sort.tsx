"use client";

import { Select } from "radix-ui";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { SORT_TYPE, SortOption } from "../hooks/useSort";

interface SortProps {
  selectedSort: SORT_TYPE;
  options: SortOption[];
  currentSortOption?: SortOption;
  handleSortChange: (value: SORT_TYPE) => void;
  className?: string;
}

export default function Sort({
  selectedSort,
  options,
  handleSortChange,
}: SortProps) {
  return (
    <div className="w-full flex justify-end">
      <Select.Root value={selectedSort} onValueChange={handleSortChange}>
        <Select.Trigger
          className="w-full px-4 py-2 border border-gray-300 rounded-md flex items-center justify-between gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200"
          style={{ width: "20rem" }}
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon className="size-4" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-md shadow-md overflow-hidden"
          >
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex gap-2 items-center outline-none cursor-pointer hover:bg-gray-100 focus:bg-gray-200"
                  style={{ padding: "0.5rem 2rem" }}
                >
                  <Select.ItemIndicator className="absolute left-2 flex items-center">
                    <CheckIcon className="size-4" />
                  </Select.ItemIndicator>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
