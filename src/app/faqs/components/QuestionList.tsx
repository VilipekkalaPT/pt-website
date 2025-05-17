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
              <AccordionComponent
                key={questionIndex}
                triggerText={q.question}
                accordionContent={
                  <RichTextRenderer
                    text={q.answer}
                    listClassName="list-disc ml-5"
                  />
                }
                value={questionIndex}
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
