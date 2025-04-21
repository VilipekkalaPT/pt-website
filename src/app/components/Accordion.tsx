import { ReactNode } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import cn from "classnames";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { isStringArray } from "app/utils/utils";

interface AccordionProps {
  buttonText: string;
  accordionContent: string[] | ReactNode;
  className?: string;
}

export default function Accordion({
  buttonText,
  accordionContent,
  className,
}: AccordionProps) {
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
    <Disclosure
      as="div"
      className={cn("p-3 border border-gray-300 rounded-sm", className)}
    >
      {({ open }) => (
        <>
          <DisclosureButton className="w-full mb-1 flex items-center justify-between gap-2 font-semibold cursor-pointer">
            {buttonText}
            <ChevronDownIcon className={cn("size-4", open && "rotate-180")} />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className="text-gray-800 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          >
            {renderContent()}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
