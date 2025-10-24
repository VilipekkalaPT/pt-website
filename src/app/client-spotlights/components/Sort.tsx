import { CheckIcon } from "@heroicons/react/24/solid";

import { SortOption } from "../hooks/useSort";
import SelectComponent, { Option } from "app/components/SelectComponent";

interface SortProps {
  selectedSort: SortOption;
  options: SortOption[];
  currentSortOption?: SortOption;
  handleSortChange: (value: string) => void;
  className?: string;
}

export default function Sort({
  selectedSort,
  options,
  handleSortChange,
}: SortProps) {
  const selectOptions: Option[] = options.map((option) => ({
    key: option.type,
    value: option.label,
  }));

  return (
    <SelectComponent
      selectName="Sort by"
      defaultValue={selectedSort.label}
      selectedValue={selectedSort.label}
      options={selectOptions}
      onValueChange={handleSortChange}
      optionItemRightIcon={<CheckIcon className="size-6" />}
      inputClassName="w-full"
    />
  );
}
