import React, { ReactNode } from "react";
import cn from "classnames";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { isStringArray } from "app/utils/utils";
import { Accordion } from "radix-ui";

interface AccordionProps {
  triggerText: string;
  accordionContent: string[] | ReactNode;
  value: string;
  selectedAccordion: string;
  onValueChange: (value: string) => void;
}

export default function AccordionComponent({
  triggerText,
  accordionContent,
  value,
  selectedAccordion,
  onValueChange,
}: AccordionProps) {
  const isAcdordionOpen = value === selectedAccordion;

  const renderContent = () => {
    if (Array.isArray(accordionContent) && isStringArray(accordionContent)) {
      return (
        <ul className="ml-6 list-disc">
          {accordionContent.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      );
    } else return accordionContent;
  };

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={selectedAccordion}
      className={cn("w-full")}
      onValueChange={(value) => onValueChange?.(value)}
    >
      <Accordion.Item
        value={value}
        className={cn("mt-4 p-3 text-sm border border-gray-300 rounded-md", {
          "bg-gray-100": !isAcdordionOpen,
        })}
      >
        <Accordion.Header className="flex">
          <Accordion.Trigger className="flex w-full justify-between items-center font-bold cursor-pointer">
            {triggerText}
            <ChevronDownIcon
              className={cn("size-4 ", { "rotate-180": isAcdordionOpen })}
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          className={cn("mt-2 overflow-hidden", {
            "animate-[slideUp_300ms_ease-in-out]": !isAcdordionOpen,
            "animate-[slideDown_300ms_ease-in-out]": isAcdordionOpen,
          })}
        >
          {renderContent()}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
