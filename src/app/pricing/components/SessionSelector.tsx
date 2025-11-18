"use client";

import SelectComponent, { Option } from "app/components/SelectComponent";
import Button from "app/components/Button";
import { TypeSessionOptionFields } from "app/lib/types/contentful";
import { ROUTES } from "app/utils/routes";
import { GET_STARTED, SESSION_SELECTOR_TITLE } from "app/utils/variables";
import { useRouter } from "next/navigation";

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

  if (!sessionOptions) {
    return (
      <Button
        variant="primary"
        label={GET_STARTED}
        glassmorphism
        hasShadow
        onClick={() => router.push(ROUTES.CONTACT)}
      />
    );
  }

  const selectedValue = `${selectedOption?.numberOfSessions} ${selectedOption?.priceUnit}`;

  const options: Option[] = sessionOptions.map((option) => ({
    key: option.numberOfSessions.toString(),
    value: `${option.numberOfSessions} ${option.priceUnit}`,
  }));

  const handleSelectChange = (value: string) => {
    const numberOfSessions = parseInt(value.split(" ")[0], 10);
    if (isNaN(numberOfSessions)) {
      return;
    }

    const selectedOption = sessionOptions.find(
      (option) => option.numberOfSessions === numberOfSessions
    );

    if (selectedOption) {
      onSelect(selectedOption);
    }
  };

  return (
    <>
      <p className="mb-3 leading-[1.4]">{SESSION_SELECTOR_TITLE}</p>
      <div className="flex gap-4 md:gap-8 items-center">
        <SelectComponent
          selectName={SESSION_SELECTOR_TITLE}
          defaultValue={selectedOption?.numberOfSessions.toString() ?? ""}
          selectedValue={selectedValue}
          options={options}
          onValueChange={handleSelectChange}
          inputClassName="w-[60%] md:w-2/3"
        />
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
