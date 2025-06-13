"use client";

import AccordionComponent from "app/components/AccordionComponent";
import InfoSection from "app/components/InfoSection";
import RichTextRenderer from "app/components/RichTextRenderer";
import {
  TypeFaqFields,
  TypeImageCardFields,
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
  const imageCards = packagesPageData.infoImageCards.map(
    (card) => card.fields
  ) as TypeImageCardFields[];

  const [selectedAccordion, setSelectedAccordion] = useState<string>(
    questions[0].question
  );

  return (
    <div className="mt-20">
      <p className="text-2xl font-bold text-center">
        {packagesPageData.faqsTitle}
      </p>
      <p className="text-xl text-gray-500 mb-8 text-center">
        {packagesPageData.faqsSubtitle}
      </p>
      <div className="h-96 w-1/2 mx-auto">
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
      <InfoSection
        title={packagesPageData.infoTitle}
        subtitle={packagesPageData.infoSubtitle}
        imageCards={imageCards}
        className="my-15 px-12"
      />
    </div>
  );
}
