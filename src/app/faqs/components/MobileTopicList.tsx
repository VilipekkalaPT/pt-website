import Button from "app/components/Button";
import { TOPIC_TYPE } from "app/utils/variables";
import { getIconComponent } from "./TopicList";
import { TopicQuestions } from "app/utils/utils";

interface TopicListProps {
  topicQuestions: TopicQuestions[];
  handleSelectTopic: (topic: string) => void;
}

export default function MobileTopicList({
  topicQuestions,
  handleSelectTopic,
}: TopicListProps) {
  return (
    <div
      style={{ position: "sticky", top: 20, zIndex: 10 }}
      className="md:hidden glass-effect p-4 rounded-2xl flex flex-wrap gap-4 bg-primary"
    >
      {topicQuestions.map((topic) => (
        <Button
          key={topic.topicType}
          label={topic.topicLabel}
          variant="outline-tertiary"
          iconLeft={getIconComponent(
            TOPIC_TYPE[topic.topicType as keyof typeof TOPIC_TYPE]
          )}
          className="rounded-lg sub-heading text-left"
          onClick={() => handleSelectTopic(topic.topicType)}
        />
      ))}
    </div>
  );
}
