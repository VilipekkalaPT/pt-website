import { Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { TypeSessionOptionFields } from "app/lib/types/contentful";

interface SessionSelectorProps {
  sessionOptions: TypeSessionOptionFields[];
  onSelect: (selectedOption: TypeSessionOptionFields) => void;
}

export default function SessionSelector({
  sessionOptions,
  onSelect,
}: SessionSelectorProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = sessionOptions.find(
      (option) => String(option.numberOfSessions) === event.target.value
    );

    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <Field className="flex flex-col mb-4">
      <Label className="mb-2">Select a number of sessions</Label>
      <div className="relative">
        <Select
          name="sessionOptions"
          className="w-full appearance-none border border-gray-300 rounded-md p-2"
          onChange={handleSelectChange}
        >
          {sessionOptions.map((option) => (
            <option
              key={option.numberOfSessions}
              value={option.numberOfSessions}
            >
              {option.numberOfSessions}
            </option>
          ))}
        </Select>
        <ChevronDownIcon
          className="group pointer-events-none absolute top-0 right-2.5 size-4 h-full"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
}
