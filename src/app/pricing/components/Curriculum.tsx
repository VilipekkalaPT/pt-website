"use client";

import AccordionComponent from "app/components/AccordionComponent";
import RichTextRenderer from "app/components/RichTextRenderer";
import {
  TypeCurriculumFields,
  TypeCurriculumPeriodFields,
} from "app/lib/types/contentful";
import { getTitle } from "app/utils/utils";
import { useState } from "react";

interface CurriculumProps {
  curriculum: TypeCurriculumFields;
}

export default function Curriculum({ curriculum }: CurriculumProps) {
  const curriculumPeriods = curriculum.curriculumPeriods.map(
    (period) => period.fields
  ) as TypeCurriculumPeriodFields[];

  const [selectedAccordion, setSelectedAccordion] = useState<string>("");

  return (
    <div className="my-10 px-12 grid grid-cols-2 gap-5">
      <p className="text-2xl font-bold mb-6">{getTitle(curriculum.title)}</p>
      <p className="text-sm text-gray-500 mb-4">{curriculum.subtitle}</p>
      {curriculumPeriods.map((period) => (
        <AccordionComponent
          key={period.title}
          triggerText={period.title}
          accordionContent={
            <RichTextRenderer
              text={period.description}
              listClassName="list-disc ml-5 "
            />
          }
          value={period.title}
          selectedAccordion={selectedAccordion}
          onValueChange={(value) => setSelectedAccordion(value)}
        />
      ))}
    </div>
  );
}
