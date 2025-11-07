"use client";

import { useState } from "react";
import cn from "classnames";

import Button from "app/components/Button";
import Card, { CardContent, CardFooter, CardHeader } from "app/components/Card";
import Chip from "app/components/Chip";
import RichTextRenderer from "app/components/RichTextRenderer";
import { TypeSessionOptionFields } from "app/lib/types/contentful";
import Price from "app/pricing/components/Price";
import {
  capitalizeFirstLetter,
  getPricingPackagesRoute,
} from "app/utils/utils";
import {
  BEST_MATCH,
  MOST_POPULAR,
  BEST_VALUE,
  SEE_FULL_PLAN,
  MORE_DETAILS,
  LEST_DETAILS,
} from "app/utils/variables";
import { useRouter } from "next/navigation";
import { FilteredPackage } from "../hooks/useFitQuizManager";
import { twMerge } from "tailwind-merge";

interface RecommendationPackageCardProps {
  p: FilteredPackage;
}

export default function RecommendationPackageCard({
  p,
}: RecommendationPackageCardProps) {
  const router = useRouter();
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

  const { package: pkg, tag } = p;

  const priceOptions = pkg.sessionOptions?.map(
    (option) => option.fields
  ) as TypeSessionOptionFields[];

  return (
    <Card key={pkg.id} glassmorphism className="h-full bg-primary/50">
      <CardHeader
        className={twMerge("flex flex-col items-center py-2", getTagStyle(tag))}
      >
        <p>{tag}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center">
        <p className="heading text-center">{pkg.name}</p>
        <Price
          price={pkg.price}
          priceUnit={pkg.priceUnit}
          priceOptions={priceOptions}
        />
        <Chip
          label={capitalizeFirstLetter(pkg.mode)}
          color="none"
          className="mt-4"
        />
        <p className="text-center mt-4">{pkg.shortDescription}</p>
        {showMoreDetails && (
          <RichTextRenderer
            text={pkg.content}
            listClassName="list-disc pl-5 mt-4 body-small text-white/70"
          />
        )}
      </CardContent>
      <CardFooter className="w-full">
        <Button
          variant="ghost"
          glassmorphism
          label={showMoreDetails ? LEST_DETAILS : MORE_DETAILS}
          onClick={() =>
            setShowMoreDetails((prevShowMoreDetails) => !prevShowMoreDetails)
          }
          className="w-full flex justify-center mt-6"
        />
        <Button
          variant="secondary"
          glassmorphism
          label={SEE_FULL_PLAN}
          onClick={() =>
            router.push(`${getPricingPackagesRoute(pkg.type)}/${pkg.slug}`)
          }
          className="w-full flex justify-center mt-4"
        />
      </CardFooter>
    </Card>
  );
}

const getTagStyle = (tag: string) => {
  switch (tag) {
    case BEST_MATCH:
      return "bg-mint text-text-black-30";
    case MOST_POPULAR:
      return "bg-pink";
    case BEST_VALUE:
      return "bg-blue text-text-black-30";
    default:
      return "bg-pink";
  }
};
