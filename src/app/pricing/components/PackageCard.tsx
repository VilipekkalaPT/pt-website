import Card, { CardContent } from "app/components/Card";
import { PackageSkeleton } from "app/lib/types";
import { CURRENCY } from "app/utils/variables";

export type Package = PackageSkeleton["fields"];

interface PackageCardProps {
  singlePackage: Package;
}

export default function PackageCard({ singlePackage }: PackageCardProps) {
  const { name, price, priceUnit, content } = singlePackage;
  const displayedPrice = `${price}${CURRENCY} / ${priceUnit}`;
  const descriptions = content.content
    .flatMap((item) => item.content.map((i) => i.value))
    .slice(0, 3);

  return (
    <Card className="border border-gray-200">
      <CardContent>
        <p className="text-gray-700 mb-1">{name}</p>
        <p className="font-bold mb-1">{displayedPrice}</p>
        <ul className="list-disc text-sm ml-5 text-gray-500">
          {descriptions.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
