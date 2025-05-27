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

interface PackageCardProps {
  singlePackage: TypePackageFields;
  href: string;
}

export default function PackageCard({ singlePackage, href }: PackageCardProps) {
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
  const landscapeImage = landscape?.fields as AssetFields | undefined;
  const landscapeUrl = landscapeImage ? getAssetUrl(landscapeImage) : "";

  const priceOptions = sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <Card className="border border-gray-200" href={href}>
      <CardHeader className="relative">
        <Chip
          variant="primary"
          label={capitalizeFirstLetter(mode)}
          className="absolute right-2 top-2 text-xs"
        />
        <Image
          src={landscapeUrl}
          alt={`Landscape image for ${name}`}
          width={100}
          height={100}
          className="block w-full h-auto"
        />
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 my-2">{name}</p>
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
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag}
              variant="secondary"
              label={capitalizeFirstLetter(tag)}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
