import {
  PlusIcon,
  ScissorsIcon,
  SparklesIcon,
  SquaresPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import {
  TypeFaqFields,
  TypePackageFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import { ROUTES } from "./routes";
import { CURRENCY, SAVED_AMOUNT, SAVING, TOPIC_TYPE } from "./variables";

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

export const getAssetUrl = (asset?: AssetFields) => {
  const url = asset?.file?.url;
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
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
  const { tags, slug } = packageDetails;

  if (tags.length === 1 && tags[0] === "gym") {
    const pricePerSession = sessionOptions?.find(
      (session) => session.numberOfSessions === 1
    )?.price;
    const originalPrice =
      (pricePerSession ?? 0) * (selectedOption?.numberOfSessions ?? 0);
    return originalPrice - (selectedOption?.price ?? 0);
  }

  if (
    slug.includes("bronze") ||
    slug.includes("silver") ||
    slug.includes("gold")
  ) {
    return calculateComboPackageSavings(packageDetails, soloPackages);
  }

  return 0;
};

const getPriceForPackage = (
  pkg: TypePackageFields,
  comboSlug: string
): number => {
  if (!pkg.sessionOptions) return pkg.price;

  const sessionOptions = pkg.sessionOptions.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  if (sessionOptions.length === 0) return pkg.price;

  const per10 =
    sessionOptions.find((option) => option.numberOfSessions === 10)?.price ?? 0;
  const per5 =
    (sessionOptions.find((option) => option.numberOfSessions === 1)?.price ??
      0) * 5;

  return comboSlug.includes("silver") ? per5 : per10;
};

const calculateComboPackageSavings = (
  packageDetails: TypePackageFields,
  soloPackages: TypePackageFields[]
): number => {
  const {
    tags: comboTags,
    price: comboPrice,
    slug: comboSlug,
  } = packageDetails;

  const nonComboPrice = comboTags.reduce((sum, tag) => {
    const pkg = soloPackages.find(
      (p) => p.tags.length === 1 && p.tags[0] === tag
    );
    return pkg ? sum + getPriceForPackage(pkg, comboSlug) : sum;
  }, 0);

  return nonComboPrice - comboPrice;
};

export const getChipColor = (mode: "hybrid" | "offline" | "online") => {
  switch (mode) {
    case "offline":
      return "pink";
    case "online":
      return "cyan";
    case "hybrid":
      return "blue-1000";
    default:
      return "black";
  }
};

export const getSavedAmountText = (
  savedAmount?: number,
  priceOptions?: TypeSessionOptionFields[]
) => {
  if (savedAmount) return `(${SAVED_AMOUNT} ${CURRENCY}${savedAmount})`;
  if (priceOptions) return `(${SAVING})`;
  return undefined;
};
