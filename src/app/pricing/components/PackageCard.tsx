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
import {
  ClipboardDocumentIcon,
  BoltIcon,
  FireIcon,
  DocumentIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { getChipColor } from "app/utils/utils";

interface PackageCardProps {
  singlePackage: TypePackageFields;
  href: string;
  savedAmount?: number;
}

export default function PackageCard({
  singlePackage,
  href,
  savedAmount,
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
    hasFreeGift,
  } = singlePackage;
  const imageField = image?.fields as AssetFields | undefined;
  const imageUrl = getAssetUrl(imageField);

  const priceOptions = sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <Card href={href} glassmorphism className="bg-primary/50">
      <CardHeader className="relative inline-block">
        <Image
          src={imageUrl}
          alt={`Landscape image for ${name}`}
          width={imageField?.file?.details.image?.width}
          height={imageField?.file?.details.image?.height}
        />
        {hasFreeGift && (
          <div className="absolute bottom-0 right-6 translate-y-1/2">
            <Chip
              label=""
              color="green"
              className="rounded-full w-13 h-13 p-0 justify-center"
              glassmorphism
              iconRight={<GiftIcon className="size-6 stroke-[1.5]" />}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-start items-start">
        <Chip
          label={capitalizeFirstLetter(mode)}
          color={getChipColor(mode)}
          glassmorphism
        />
        <p className="my-2 leading-[1.4]">{name}</p>
        <Price
          price={price}
          priceUnit={priceUnit}
          priceOptions={priceOptions}
          savedAmount={savedAmount}
        />
        <p className="mt-2 body-small text-white/70">{shortDescription}</p>
      </CardContent>
      <CardFooter>
        <div className="mt-2 flex justify-between">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Chip
                key={tag}
                color="ghost"
                label={capitalizeFirstLetter(tag)}
                glassmorphism
                iconRight={getIcon(tag)}
              />
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

const getIcon = (tag: "diet" | "gym" | "plan") => {
  const style = "size-4 stroke-[1.6]";
  switch (tag) {
    case "diet":
      return <FireIcon className={style} />;
    case "gym":
      return <BoltIcon className={style} />;
    case "plan":
      return <ClipboardDocumentIcon className={style} />;
    default:
      return <DocumentIcon className={style} />;
  }
};
