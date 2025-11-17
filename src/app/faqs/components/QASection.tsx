"use client";

import { useEffect, useRef, useState } from "react";
import { TypeFaqFields } from "app/lib/types/contentful/TypeFaq";
import { mapTopicQuestions, TopicQuestions } from "app/utils/utils";
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
    <>
      <div className="hidden md:flex w-4/5 mx-auto my-16 gap-8 items-start">
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
      <MobileQASection
        topicQuestions={topicQuestions}
        handleSelectTopic={handleSelectTopic}
        selectedTopicType={selectedTopicType}
        scrollToTopVisible={scrollToTopVisible}
        ref={ref}
      />
    </>
  );
}

export const MobileQASection = ({
  topicQuestions,
  handleSelectTopic,
  selectedTopicType,
  scrollToTopVisible,
  ref,
}: {
  topicQuestions: TopicQuestions[];
  handleSelectTopic: (topic: string) => void;
  selectedTopicType: string;
  scrollToTopVisible: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="md:hidden flex flex-col gap-8 items-start">
      <div
        className="w-full backdrop-blur-3xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)]"
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <TopicList
          topicQuestions={topicQuestions}
          handleSelectTopic={handleSelectTopic}
        />
      </div>
      <div className="w-4/5 mx-auto">
        <QuestionsList
          topicQuestions={topicQuestions}
          selectedTopicType={selectedTopicType}
          ref={ref}
        />
      </div>
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
};
