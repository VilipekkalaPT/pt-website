"use client";

import { useEffect, useRef, useState } from "react";
import { TypeFaqFields } from "app/lib/types/contentful/TypeFaq";
import { mapTopicQuestions } from "app/utils/utils";
import cn from "classnames";
import TopicList from "./TopicList";
import QuestionsList from "./QuestionList";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import IconButton from "app/components/IconButton";

interface QASectionProps {
  questions: TypeFaqFields[];
}

export default function QASection({ questions }: QASectionProps) {
  const topicQuestions = mapTopicQuestions(questions);
  const ref = useRef<HTMLDivElement | null>(null);

  const [selectedTopicType, setSelectedTopicType] = useState<string>("");
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  const handleSelectTopic = (topicType: string) => {
    setSelectedTopicType(topicType);
  };

  useEffect(() => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ behavior: "smooth", top: top - 20 });
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

  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "visible";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <div className="mx-16 py-16 flex gap-8 items-start">
      <TopicList
        topicQuestions={topicQuestions}
        handleSelectTopic={handleSelectTopic}
      />
      <QuestionsList
        topicQuestions={topicQuestions}
        selectedTopicType={selectedTopicType}
        ref={ref}
      />
      <IconButton
        variant="primary"
        icon={<ChevronUpIcon className="size-4" />}
        className={cn("fixed bottom-6 right-6", {
          "opacity-100": scrollToTopVisible,
          "opacity-0 pointer-events-none": !scrollToTopVisible,
        })}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      />
    </div>
  );
}
