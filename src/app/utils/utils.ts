import {
  TypeFaqFields,
  TypePackageFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import { ROUTES } from "./routes";

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

export const getPricingPackagesRoute = (type: "combo" | "duo" | "solo") => {
  return `${ROUTES.PRICING}/${type}-packages`;
};

export const calculateSavedAmount = (
  packageDetails: TypePackageFields,
  soloPackages: TypePackageFields[],
  selectedOption?: TypeSessionOptionFields,
  sessionOptions?: TypeSessionOptionFields[]
) => {
  const { type, tags, price, name } = packageDetails;

  if (tags.length === 1 && tags[0] === "gym") {
    const pricePerSession = sessionOptions?.find(
      (session) => session.numberOfSessions === 1
    )?.price;
    const originalPrice =
      (pricePerSession ?? 0) * (selectedOption?.numberOfSessions ?? 0);
    return originalPrice - (selectedOption?.price ?? 0);
  }

  if (type === "combo") {
    return calculateComboPackageSavings(tags, name, soloPackages, price);
  }

  return 0;
};

const calculateComboPackageSavings = (
  tags: ("dietary" | "gym" | "plan")[],
  name: string,
  soloPackages: TypePackageFields[],
  comboPrice: number
): number => {
  let originalComboPrice = 0;

  for (const tag of tags) {
    const pkg = soloPackages.find((p) => p.tags.includes(tag));
    if (!pkg) continue;

    const packageSessionOptions = pkg.sessionOptions?.map(
      (option) => option.fields
    ) as TypeSessionOptionFields[] | undefined;

    if (packageSessionOptions) {
      const pricePer10Sessions =
        packageSessionOptions.find((option) => option.numberOfSessions === 10)
          ?.price || pkg.price;
      const pricePer5Sessions =
        (packageSessionOptions.find((option) => option.numberOfSessions === 1)
          ?.price ?? 0) * 5;
      originalComboPrice += name.includes("silver")
        ? pricePer5Sessions
        : pricePer10Sessions;
    } else {
      originalComboPrice += pkg.price;
    }
  }

  return originalComboPrice - comboPrice;
};
