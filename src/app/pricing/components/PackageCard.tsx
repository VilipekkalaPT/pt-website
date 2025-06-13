import Image from "next/image";
import Card, { CardContent, CardFooter, CardHeader } from "app/components/Card";
import {
  TypePackageFields,
  TypeSessionOptionFields,
} from "app/lib/types/contentful";
import RichTextRenderer from "app/components/RichTextRenderer";
import { capitalizeFirstLetter, getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Chip from "app/components/Chip";
import Price from "./Price";
import { SAVED_AMOUNT } from "app/utils/variables";

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
    content,
    mode,
    tags,
    landscape,
  } = singlePackage;
  const image = landscape?.fields as AssetFields | undefined;
  const imageUrl = getAssetUrl(image);

  const priceOptions = sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <Card href={href}>
      <CardHeader className="relative">
        <Chip
          label={capitalizeFirstLetter(mode)}
          className="absolute right-2 top-2 text-xs"
        />
        <Image
          src={imageUrl}
          alt={`Landscape image for ${name}`}
          width={image?.file?.details.image?.width}
          height={image?.file?.details.image?.height}
          className="block w-full h-auto"
        />
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 font-semibold my-2">{name}</p>
        <Price
          price={price}
          priceUnit={priceUnit}
          priceOptions={priceOptions}
          className="mb-1"
        />
        <RichTextRenderer
          text={content}
          listClassName="list-disc ml-5 text-sm text-gray-500"
          listLimit={3}
        />
      </CardContent>
      <CardFooter>
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <Chip
                key={tag}
                variant="white"
                label={capitalizeFirstLetter(tag)}
              />
            ))}
          </div>
          {!!savedAmount && (
            <Chip label={`${SAVED_AMOUNT} €${savedAmount}`} variant="success" />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
