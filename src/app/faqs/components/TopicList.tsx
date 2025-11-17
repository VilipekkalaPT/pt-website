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
import cn from "classnames";

export interface TopicListProps {
  topicQuestions: TopicQuestions[];
  handleSelectTopic: (topic: string) => void;
}

export const getIconComponent = (topicType: TOPIC_TYPE) => {
  const className = "size-4 md:size-8";
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
  const desktopStyle = "md:glass-effect md:flex-col justify-center md:gap-4";
  const mobileStyle = "flex-row flex-wrap gap-2";

  return (
    <div
      style={{ position: "sticky", top: 20, zIndex: 10 }}
      className={cn("flex rounded-2xl p-6", desktopStyle, mobileStyle)}
    >
      {topicQuestions.map((topic) => (
        <Button
          key={topic.topicType}
          label={topic.topicLabel}
          variant="outline-tertiary"
          iconLeft={getIconComponent(
            TOPIC_TYPE[topic.topicType as keyof typeof TOPIC_TYPE]
          )}
          className="rounded-lg sub-heading md:heading text-left"
          onClick={() => handleSelectTopic(topic.topicType)}
        />
      ))}
    </div>
  );
}
