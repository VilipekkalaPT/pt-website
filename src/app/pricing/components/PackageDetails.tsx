import Image from "next/image";
import { Document } from "@contentful/rich-text-types";
import { BANNER, CURRENCY } from "app/utils/variables";
import { TypePackageFields } from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Accordion from "app/components/Accordion";

interface PackageDetailsProps {
  packageDetails: TypePackageFields;
  image?: AssetFields;
}

export default function PackageDetails({
  packageDetails,
  image,
}: PackageDetailsProps) {
  const imageUrl = `https:${image?.file?.url ?? ""}`;
  const descriptions = packageDetails.content.content.flatMap((item) =>
    item.content.map((i) => i)
  );

  return (
    <div className="grid grid-cols-2 gap-10">
      <Image
        src={imageUrl}
        alt={BANNER}
        width={image?.file?.details.image?.width}
        height={image?.file?.details.image?.height}
        className="block w-full h-auto"
      />
      <div>
        <p className="text-2xl font-bold">{packageDetails.name}</p>
        <Price
          price={packageDetails.price}
          priceUnit={packageDetails.priceUnit}
        />
        <ul className="list-disc text-sm ml-5 text-gray-500 mb-4">
          {descriptions.map((description, index) => (
            <li key={index}>
              {documentToReactComponents(description as Document)}
            </li>
          ))}
        </ul>
        <Accordion
          buttonText="Why"
          accordionContent={packageDetails.explanation}
          className="mb-4"
        />
        <Accordion
          buttonText="For whom"
          accordionContent={packageDetails.forWhom}
          className="mb-4"
        />
        <Accordion
          buttonText="Not for whom"
          accordionContent={packageDetails.notForWhom}
          className="mb-4"
        />
        <Accordion
          buttonText="Expected results"
          accordionContent={documentToReactComponents(
            packageDetails.expectedResults
          )}
          className="mb-4"
        />
      </div>
    </div>
  );
}

export function Price({
  price,
  priceUnit,
}: {
  price: number;
  priceUnit: string;
}) {
  return (
    <div className="flex items-end my-4">
      <p className="text-4xl font-bold mr-1">
        {CURRENCY}
        {price}
      </p>
      <span>/ {priceUnit}</span>
    </div>
  );
}
