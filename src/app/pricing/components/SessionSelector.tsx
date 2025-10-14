"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import { TypeSessionOptionFields } from "app/lib/types/contentful";
import { ROUTES } from "app/utils/routes";
import { GET_STARTED, SESSION_SELECTOR_TITLE } from "app/utils/variables";
import { useRouter } from "next/navigation";
import { Select } from "radix-ui";

interface SessionSelectorProps {
  sessionOptions: TypeSessionOptionFields[];
  selectedOption?: TypeSessionOptionFields;
  onSelect: (selectedOption: TypeSessionOptionFields) => void;
}

export default function SessionSelector({
  sessionOptions,
  selectedOption,
  onSelect,
}: SessionSelectorProps) {
  const router = useRouter();

  const handleSelectChange = (value: string) => {
    const selectedOption = sessionOptions.find(
      (option) => option.numberOfSessions.toString() === value
    );

    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <>
      {sessionOptions && <p className="mb-2">{SESSION_SELECTOR_TITLE}</p>}
      <div className="flex gap-10">
        {sessionOptions && (
          <Select.Root
            defaultValue={selectedOption?.numberOfSessions.toString()}
            onValueChange={(value) => handleSelectChange(value)}
          >
            <Select.Trigger
              aria-label={SESSION_SELECTOR_TITLE}
              className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md cursor-pointer"
            >
              <Select.Value>
                {selectedOption?.numberOfSessions} {selectedOption?.priceUnit}
              </Select.Value>
              <Select.Icon>
                <ChevronDownIcon className="size-4" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                position="popper"
                className="w-[var(--radix-select-trigger-width)] bg-white border border-gray-300 rounded-md"
              >
                <Select.Viewport className="p-1">
                  {sessionOptions.map((option) => (
                    <Select.Item
                      key={option.numberOfSessions}
                      value={option.numberOfSessions.toString()}
                      className="relative flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-gray-100 data-[state=checked]:bg-blue-100"
                    >
                      <Select.ItemText>
                        {option.numberOfSessions} {option.priceUnit}
                      </Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        )}
        <Button
          variant="primary"
          label={GET_STARTED}
          glassmorphism
          hasShadow
          onClick={() => router.push(ROUTES.CONTACT)}
        />
      </div>
    </>
  );
}
