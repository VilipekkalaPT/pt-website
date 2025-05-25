"use client";

import AccordionComponent from "app/components/AccordionComponent";
import Button from "app/components/Button";
import RichTextRenderer from "app/components/RichTextRenderer";
import {
  TypeFaqFields,
  TypePackagesPageDataFields,
} from "app/lib/types/contentful";
import { ROUTES } from "app/utils/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface QuestionsAndInfoProps {
  packagesPageData: TypePackagesPageDataFields;
}

export default function QuestionsAndInfo({
  packagesPageData,
}: QuestionsAndInfoProps) {
  const router = useRouter();
  const questions = packagesPageData.faqs.map(
    (q) => q.fields
  ) as TypeFaqFields[];

  const [selectedAccordion, setSelectedAccordion] = useState<string>(
    questions[0].question
  );

  return (
    <div className="mt-20 w-2/3 mx-auto">
      <p className="text-2xl font-bold text-center">
        {packagesPageData.faqsTitle}
      </p>
      <p className="text-xl text-gray-500 mb-8 text-center">
        {packagesPageData.faqsSubtitle}
      </p>
      <div className="h-96">
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
      <p className="text-2xl font-bold mt-10 text-center">
        {packagesPageData.infoTitle}
      </p>
      <p className="text-xl text-gray-500 text-center">
        {packagesPageData.infoSubtitle}
      </p>
      <Button
        variant="primary"
        label={packagesPageData.infoButtonText}
        onClick={() => router.push(ROUTES.CONTACT)}
        className="mx-auto mt-4 mb-15"
      />
    </div>
  );
}
