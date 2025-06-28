import Image from "next/image";
import Card, { CardContent, CardFooter, CardHeader } from "app/components/Card";
import {
  TypePackageFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import { capitalizeFirstLetter, getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Chip from "app/components/Chip";
import Price from "./Price";
import { MOST_POPULAR, SAVED_AMOUNT } from "app/utils/variables";
import cn from "classnames";

interface PackageCardProps {
  singlePackage: TypePackageFields;
  href: string;
  savedAmount?: number;
  darkMode?: boolean;
}

export default function PackageCard({
  singlePackage,
  href,
  savedAmount,
  darkMode = false,
}: PackageCardProps) {
  const {
    name,
    price,
    priceUnit,
    sessionOptions,
    shortDescription,
    mode,
    tags,
    image,
    isMostPopular,
  } = singlePackage;
  const imageField = image?.fields as AssetFields | undefined;
  const imageUrl = getAssetUrl(imageField);

  const priceOptions = sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <Card href={href}>
      <CardHeader className="relative">
        {isMostPopular && (
          <Chip
            label={MOST_POPULAR}
            className="absolute left-2 top-2"
            color="orange"
          />
        )}
        <Chip
          label={capitalizeFirstLetter(mode)}
          className="absolute right-2 top-2"
          color={getChipColor(mode)}
        />
        <Image
          src={imageUrl}
          alt={`Landscape image for ${name}`}
          width={imageField?.file?.details.image?.width}
          height={imageField?.file?.details.image?.height}
          className="block w-full h-auto"
        />
      </CardHeader>
      <CardContent className="flex-1">
        <p>{name}</p>
        <Price
          price={price}
          priceUnit={priceUnit}
          priceOptions={priceOptions}
          className="my-1"
        />
        <p
          className={cn("mt-2 text-sm", {
            "text-gray-500": !darkMode,
            "text-gray-400": darkMode,
          })}
        >
          {shortDescription}
        </p>
      </CardContent>
      <CardFooter>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Chip key={tag} color="gray" label={capitalizeFirstLetter(tag)} />
            ))}
          </div>
          {!!savedAmount && (
            <Chip
              label={`${SAVED_AMOUNT} €${savedAmount}`}
              color={darkMode ? "light-green" : "green"}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

const getChipColor = (mode: "hybrid" | "offline" | "online") => {
  switch (mode) {
    case "offline":
      return "blue";
    case "online":
      return "yellow";
    case "hybrid":
      return "light-green";
    default:
      return "black";
  }
};
