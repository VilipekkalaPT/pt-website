import {
  PlusIcon,
  ScissorsIcon,
  SparklesIcon,
  SquaresPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import { TopicQuestions } from "app/utils/utils";
import { TOPIC_TYPE } from "app/utils/variables";

interface TopicListProps {
  topicQuestions: TopicQuestions[];
  handleSelectTopic: (topic: string) => void;
}

const getIconComponent = (topicType: TOPIC_TYPE) => {
  const className = "size-8";
  const icons = {
    [TOPIC_TYPE.WEIGHT_LOSS]: <ScissorsIcon className={className} />,
    [TOPIC_TYPE.GAINING_MUSCLES]: <PlusIcon className={className} />,
    [TOPIC_TYPE.DIET_MYTHS]: <SparklesIcon className={className} />,
    [TOPIC_TYPE.FEMALE_GYM]: <UsersIcon className={className} />,
    [TOPIC_TYPE.SUPPLEMENTS]: <SquaresPlusIcon className={className} />,
    [TOPIC_TYPE.GENERAL]: <SquaresPlusIcon className={className} />,
  };

  return icons[topicType] || <SquaresPlusIcon className={className} />;
};

export default function TopicList({
  topicQuestions,
  handleSelectTopic,
}: TopicListProps) {
  return (
    <div
      style={{ position: "sticky", top: 20, zIndex: 10 }}
      className="glass-effect p-6 rounded-2xl flex flex-col justify-center gap-4"
    >
      {topicQuestions.map((topic) => (
        <Button
          key={topic.topicType}
          label={topic.topicLabel}
          variant="outline-tertiary"
          iconLeft={getIconComponent(
            TOPIC_TYPE[topic.topicType as keyof typeof TOPIC_TYPE]
          )}
          className="rounded-lg heading text-left"
          onClick={() => handleSelectTopic(topic.topicType)}
        />
      ))}
    </div>
  );
}
