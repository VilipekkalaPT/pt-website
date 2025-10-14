"use client";

import AccordionComponent from "app/components/AccordionComponent";
import RichTextRenderer from "app/components/RichTextRenderer";
import {
  TypeFaqFields,
  TypePackagesPageDataFields,
} from "app/lib/types/contentful";
import { useState } from "react";

interface QuestionsAndInfoProps {
  packagesPageData: TypePackagesPageDataFields;
}

export default function QuestionsAndInfo({
  packagesPageData,
}: QuestionsAndInfoProps) {
  const questions = packagesPageData.faqs.map(
    (q) => q.fields
  ) as TypeFaqFields[];

  const [selectedAccordion, setSelectedAccordion] = useState<string>(
    questions[0].question
  );

  return (
    <div className="mt-40 w-1/2 mx-auto flex flex-col items-center">
      <p className="heading">{packagesPageData.faqsTitle}</p>
      <p className="subheading text-white/70 mt-2">
        {packagesPageData.faqsSubtitle}
      </p>
      <div className="min-h-48 w-full mt-8">
        {questions.map((question) => (
          <AccordionComponent
            key={question.question}
            triggerText={question.question}
            accordionContent={<RichTextRenderer text={question.answer} />}
            value={question.question}
            selectedAccordion={selectedAccordion}
            onValueChange={(value) => setSelectedAccordion(value)}
          />
        ))}
      </div>
    </div>
  );
}
