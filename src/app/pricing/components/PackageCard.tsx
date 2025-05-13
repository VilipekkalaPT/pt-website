import Card, { CardContent } from "app/components/Card";
import { TypePackageFields } from "app/lib/types/contentful";
import { CURRENCY } from "app/utils/variables";
import { ROUTES } from "app/utils/routes";
import RichTextRenderer from "app/components/RichTextRenderer";

interface PackageCardProps {
  singlePackage: TypePackageFields;
  slug: string;
}

export default function PackageCard({ singlePackage, slug }: PackageCardProps) {
  const { name, price, priceUnit, content } = singlePackage;
  const displayedPrice = `${price}${CURRENCY} / ${priceUnit}`;

  return (
    <Card
      className="border border-gray-200"
      href={`${ROUTES.PACKAGE_DETAILS}/${slug}`}
    >
      <CardContent>
        <p className="text-gray-700 mb-1">{name}</p>
        <p className="font-bold mb-1">{displayedPrice}</p>
        <RichTextRenderer
          text={content}
          listClassName="list-disc ml-5 text-sm text-gray-500"
          listLimit={3}
        />
      </CardContent>
    </Card>
  );
}
