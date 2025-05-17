"use client";

import { useEffect, useRef, useState } from "react";
import { TypeFaqSkeleton } from "app/lib/types/contentful/TypeFaq";
import { mapTopicQuestions } from "app/utils/utils";
import cn from "classnames";
import TopicList from "./TopicList";
import QuestionsList from "./QuestionList";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface QASectionProps {
  questions: TypeFaqSkeleton[];
}

export default function QASection({ questions }: QASectionProps) {
  const questionData = questions.map((q) => q.fields);
  const topicQuestions = mapTopicQuestions(questionData);
  const ref = useRef<HTMLDivElement | null>(null);

  const [selectedTopicType, setSelectedTopicType] = useState<string>("");
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  const handleSelectTopic = (topicType: string) => {
    setSelectedTopicType(topicType);
  };

  useEffect(() => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ behavior: "smooth", top: top - 100 }); // Minus 100px for header
      setSelectedTopicType("");
    }
  }, [selectedTopicType]);

  useEffect(() => {
    const onScroll = () => {
      setScrollToTopVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="mt-20 px-12 flex justify-between">
      <TopicList
        topicQuestions={topicQuestions}
        handleSelectTopic={handleSelectTopic}
      />
      <QuestionsList
        topicQuestions={topicQuestions}
        selectedTopicType={selectedTopicType}
        ref={ref}
      />
      <button
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full b bg-gray-900 text-white hadow-lg cursor-pointer",
          {
            "opacity-100": scrollToTopVisible,
            "opacity-0 pointer-events-none": !scrollToTopVisible,
          }
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ChevronUpIcon className="size-4" />
      </button>
    </div>
  );
}
