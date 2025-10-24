import { CheckIcon } from "@heroicons/react/24/solid";

import SelectComponent, { Option } from "app/components/SelectComponent";
import { filterOptions } from "../hooks/useFilter";

interface FilterProps {
  selectedFilter: string;
  handleFilterChange: (value: string) => void;
}

export default function Filter({
  selectedFilter,
  handleFilterChange,
}: FilterProps) {
  const selectOptions: Option[] = filterOptions.map((option) => ({
    key: option,
    value: option,
  }));

  return (
    <SelectComponent
      selectName="Sort by"
      defaultValue={selectedFilter}
      selectedValue={selectedFilter}
      options={selectOptions}
      onValueChange={handleFilterChange}
      optionItemRightIcon={<CheckIcon className="size-6" />}
      inputClassName="w-full"
    />
  );
}
