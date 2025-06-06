"use client";

import Button from "app/components/Button";
import Card, { CardContent, CardHeader } from "app/components/Card";
import Chip from "app/components/Chip";
import RichTextRenderer from "app/components/RichTextRenderer";
import { TypeSessionOptionFields } from "app/lib/types/contentful";
import Price from "app/pricing/components/Price";
import {
  capitalizeFirstLetter,
  getPricingPackagesRoute,
} from "app/utils/utils";
import { SEE_FULL_PLAN } from "app/utils/variables";
import { useRouter } from "next/navigation";
import { FilteredPackage } from "../hooks/useFilter";

interface RecommendationPackageCardProps {
  p: FilteredPackage;
}

export default function RecommendationPackageCard({
  p,
}: RecommendationPackageCardProps) {
  const router = useRouter();
  const { package: pkg, tag } = p;

  const priceOptions = pkg.sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <Card key={pkg.id} className="flex-1">
      <CardHeader className="flex flex-col items-center">
        <Chip label={tag} />
        <p className="text-lg font-semibold mt-4 text-center">{pkg.name}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center mt-4">
        <Price
          price={pkg.price}
          priceUnit={pkg.priceUnit}
          priceOptions={priceOptions}
          variant="large"
        />
        <Chip
          label={capitalizeFirstLetter(pkg.mode)}
          variant="white"
          className="my-4"
        />
        <RichTextRenderer
          text={pkg.content}
          listClassName="text-sm text-gray-500 text-center h-20 flex items-center justify-center"
          listLimit={1}
        />
        <Button
          variant="primary"
          label={SEE_FULL_PLAN}
          onClick={() =>
            router.push(`${getPricingPackagesRoute(pkg.type)}/${pkg.slug}`)
          }
          className="w-full flex justify-center mt-4"
        />
      </CardContent>
    </Card>
  );
}
