"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import RichTextRenderer from "app/components/RichTextRenderer";
import { ROUTES } from "app/utils/routes";
import { TopicQuestions } from "app/utils/utils";
import { MORE_QUESTIONS } from "app/utils/variables";
import { useRouter } from "next/navigation";
import AccordionComponent from "app/components/AccordionComponent";
import {
  TypeFaqFields,
  TypePackageFields,
  TypePackagesPageDataFields,
} from "app/lib/types/contentful";
import RecommendationPackages from "./RecommendationPackages";

interface QuestionsListProps {
  topicQuestions: TopicQuestions[];
  selectedTopicType: string;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function QuestionsList({
  topicQuestions,
  selectedTopicType,
  ref,
}: QuestionsListProps) {
  const router = useRouter();
  const [selectedAccordion, setSelectedAccordion] = useState<string>("");

  return (
    <div className="flex-2">
      {topicQuestions.map((topic) => (
        <div
          id={topic.topicType}
          key={topic.topicType}
          className="mb-8"
          ref={topic.topicType === selectedTopicType ? ref : null}
        >
          <p className="text-xl mb-2">{topic.topicLabel}</p>
          {topic.questions.map((q, index) => {
            const questionIndex = `${q.topicType}-${index}`;
            return (
              <AccordionContent
                key={questionIndex}
                questionIndex={questionIndex}
                question={q}
                selectedAccordion={selectedAccordion}
                onValueChange={(value) => setSelectedAccordion(value)}
              />
            );
          })}
          <Button
            label={MORE_QUESTIONS}
            onClick={() => router.push(ROUTES.CONTACT)}
            variant="ghost"
            iconRight={<ArrowRightIcon className="size-3" />}
            className="text-xs mt-2"
          />
        </div>
      ))}
    </div>
  );
}

const AccordionContent = ({
  questionIndex,
  question,
  selectedAccordion,
  onValueChange,
}: {
  questionIndex: string;
  question: TypeFaqFields;
  selectedAccordion: string;
  onValueChange: (value: string) => void;
}) => {
  const recommendedPackages =
    (question.recommendedPackages?.map((p) => p.fields) as (
      | TypePackageFields
      | TypePackagesPageDataFields
    )[]) || [];

  return (
    <AccordionComponent
      triggerText={question.question}
      accordionContent={
        <>
          <RichTextRenderer
            text={question.answer}
            listClassName="list-disc ml-5"
          />
          <RecommendationPackages packages={recommendedPackages} />
        </>
      }
      value={questionIndex}
      selectedAccordion={selectedAccordion}
      onValueChange={onValueChange}
    />
  );
};
