import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Option } from "app/components/SelectComponent";
import { filterOptions, ReviewChange } from "../hooks/useFilter";
import { twMerge } from "tailwind-merge";
import { SELECT_FILTER, CLEAR_ALL_FILTERS } from "app/utils/variables";

interface FilterProps {
  selectedFilter: ReviewChange[];
  handleFilterChange: (value: string) => void;
  clearAllFilters: () => void;
}

export default function Filter({
  selectedFilter,
  handleFilterChange,
  clearAllFilters,
}: FilterProps) {
  const selectOptions: Option[] = filterOptions.map((option) => ({
    key: option,
    value: option,
  }));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label="Filter reviews"
        className={twMerge(
          "w-full flex items-center justify-between p-4 border border-border-default-primary bg-black/50 rounded-lg cursor-pointer focus:outline-none"
        )}
      >
        {selectedFilter.length === 0
          ? SELECT_FILTER
          : selectedFilter.join(", ")}
        <ChevronDownIcon className="size-4 stroke-[1.6]" color="white" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="start"
        className="border border-border-default-primary bg-black/50 backdrop-blur-sm rounded-lg p-1 z-12 w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenu.Item
          className="px-4 py-2 text-sm font-medium text-right cursor-pointer outline-none"
          onClick={clearAllFilters}
        >
          {CLEAR_ALL_FILTERS}
        </DropdownMenu.Item>
        {selectOptions.map((option) => (
          <DropdownMenu.CheckboxItem
            key={option.key}
            checked={selectedFilter.includes(option.value as ReviewChange)}
            onCheckedChange={() => handleFilterChange(option.value)}
            className="relative flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer hover:bg-primary/50 data-[state=checked]:bg-primary outline-none"
          >
            {option.value}
            {selectedFilter.includes(option.value as ReviewChange) && (
              <CheckIcon className="size-4 text-white" />
            )}
          </DropdownMenu.CheckboxItem>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
