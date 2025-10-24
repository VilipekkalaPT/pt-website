import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { Select } from "radix-ui";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface Option {
  key: string;
  value: string;
}

interface SelectComponentProps {
  selectName: string;
  defaultValue: string;
  selectedValue: string;
  options: Option[];
  onValueChange: (value: string) => void;
  optionItemRightIcon?: ReactNode;
  inputClassName?: string;
}

export default function SelectComponent({
  selectName,
  defaultValue,
  selectedValue,
  options,
  onValueChange,
  optionItemRightIcon,
  inputClassName,
}: SelectComponentProps) {
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger
        aria-label={selectName}
        className={twMerge(
          "flex items-center justify-between p-4 border border-border-default-primary bg-black/50 rounded-lg cursor-pointer focus:outline-none",
          inputClassName
        )}
      >
        <Select.Value>{selectedValue}</Select.Value>
        <Select.Icon>
          <ChevronDownIcon className="size-4 stroke-[1.6]" color="white" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="w-[var(--radix-select-trigger-width)] border border-border-default-primary bg-black/50 backdrop-blur-sm rounded-lg z-12"
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.key}
                value={option.value}
                className="relative flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer hover:bg-primary/50 data-[state=checked]:bg-primary outline-none"
              >
                <Select.ItemText>{option.value}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 flex items-center">
                  {optionItemRightIcon}
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
