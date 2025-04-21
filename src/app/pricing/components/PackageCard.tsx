import Card, { CardContent } from "app/components/Card";
import { TypePackageFields } from "app/lib/types/contentful";
import { CURRENCY } from "app/utils/variables";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ROUTES } from "app/utils/routes";

interface PackageCardProps {
  singlePackage: TypePackageFields;
  entryId: string;
}

export default function PackageCard({
  singlePackage,
  entryId,
}: PackageCardProps) {
  const { name, price, priceUnit, content } = singlePackage;
  const displayedPrice = `${price}${CURRENCY} / ${priceUnit}`;
  const descriptions = content.content
    .flatMap((item) => item.content.map((i) => i))
    .slice(0, 3);

  return (
    <Card
      className="border border-gray-200"
      href={`${ROUTES.PACKAGE_DETAILS}/${entryId}`}
    >
      <CardContent>
        <p className="text-gray-700 mb-1">{name}</p>
        <p className="font-bold mb-1">{displayedPrice}</p>
        <ul className="list-disc text-sm ml-5 text-gray-500">
          {descriptions.map((description, index) => (
            <li key={index}>
              {documentToReactComponents(description as Document)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
