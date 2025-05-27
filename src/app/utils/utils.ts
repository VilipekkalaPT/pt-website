import { TypeFaqFields } from "app/lib/types/contentful";

export const isStringArray = (input: Array<unknown>): input is string[] => {
  return (
    Array.isArray(input) && input.every((item) => typeof item === "string")
  );
};

export const getTitle = (title: string) => {
  const words = title.split("-");
  return words[0];
};

export interface TopicQuestions {
  topicType: string;
  topicLabel: string;
  questions: TypeFaqFields[];
}

export const mapTopicQuestions = (questions: TypeFaqFields[]) => {
  return questions.reduce((acc, q) => {
    const existingTopic = acc.find((item) => item.topicType === q.topicType);

    if (existingTopic) {
      existingTopic.questions.push(q);
    } else {
      acc.push({
        topicType: q.topicType,
        topicLabel: q.topic,
        questions: [q],
      });
    }

    return acc;
  }, [] as TopicQuestions[]);
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
