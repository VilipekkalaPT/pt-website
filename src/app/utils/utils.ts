import {
  TypeFaqFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";

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

export const getAssetUrl = (asset: AssetFields) => {
  const url = asset.file?.url;
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
};

export const getMinPrice = (options?: TypeSessionOptionFields[]) => {
  if (!options || options.length === 0) {
    return undefined;
  }

  const minPrices = options.map(
    (option) => option.price / option.numberOfSessions
  );
  const minPrice = Math.min(...minPrices);

  return Math.round(minPrice * 10) / 10;
};
