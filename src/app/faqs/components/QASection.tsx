import { TypeFaqSkeleton } from "app/lib/types/contentful/TypeFaq";
import { mapTopicQuestions } from "app/utils/utils";

import TopicList from "./TopicList";
import QuestionsList from "./QuestionList";

interface QASectionProps {
  questions: TypeFaqSkeleton[];
}

export default function QASection({ questions }: QASectionProps) {
  const questionData = questions.map((q) => q.fields);
  const topicQuestions = mapTopicQuestions(questionData);

  return (
    <div className="mt-20 px-12 flex justify-between">
      <TopicList topicQuestions={topicQuestions} />
      <QuestionsList topicQuestions={topicQuestions} />
    </div>
  );
}
