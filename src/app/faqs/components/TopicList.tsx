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
  const className = "size-4";
  const icons = {
    [TOPIC_TYPE.WEIGHT_LOSS]: <ScissorsIcon className={className} />,
    [TOPIC_TYPE.GAINING_MUSCLES]: <PlusIcon className={className} />,
    [TOPIC_TYPE.DIET_MYTHS]: <SparklesIcon className={className} />,
    [TOPIC_TYPE.FEMALE_GYM]: <UsersIcon className={className} />,
    [TOPIC_TYPE.SUPPLEMENTS]: <SquaresPlusIcon className={className} />,
  };

  return icons[topicType] || <SquaresPlusIcon className={className} />;
};

export default function TopicList({
  topicQuestions,
  handleSelectTopic,
}: TopicListProps) {
  return (
    <div className="flex-1">
      {topicQuestions.map((topic) => (
        <Button
          key={topic.topicType}
          label={topic.topicLabel}
          variant="outlined"
          iconLeft={getIconComponent(
            TOPIC_TYPE[topic.topicType as keyof typeof TOPIC_TYPE]
          )}
          className="w-3/4 mb-4 font-bold"
          onClick={() => handleSelectTopic(topic.topicType)}
        />
      ))}
    </div>
  );
}
