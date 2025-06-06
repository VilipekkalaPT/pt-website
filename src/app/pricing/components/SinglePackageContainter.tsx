"use client";

import {
  TypeCurriculumFields,
  TypePackageFields,
  TypeReviewFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import PackageDetails from "./PackageDetails";
import Divider from "app/components/Divider";
import Curriculum from "./Curriculum";
import Button from "app/components/Button";
import {
  ALL_COMBO_PACKAGES,
  ALL_DUO_PACKAGES,
  ALL_SOLO_PACKAGES,
  BACK,
  LATEST_REVIEWS,
} from "app/utils/variables";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { getPricingPackagesRoute } from "app/utils/utils";
import ReviewCard from "app/landing-page/components/ReviewCard";

interface SinglePackageContainerProps {
  packageDetails: TypePackageFields;
  curriculum: TypeCurriculumFields;
  soloPackages: TypePackageFields[];
  reviews: TypeReviewFields[];
  image?: AssetFields;
}

export default function SinglePackageContainer({
  packageDetails,
  curriculum,
  soloPackages,
  reviews,
  image,
}: SinglePackageContainerProps) {
  const router = useRouter();
  const buttonTitle = getButtonLabel(packageDetails.type);
  const pricingPackagesRoute = getPricingPackagesRoute(packageDetails.type);

  return (
    <div className="mt-10">
      <Button
        variant="ghost"
        label={buttonTitle}
        iconLeft={<ArrowLeftIcon className="size-4" />}
        className="mb-6 px-12"
        onClick={() => router.push(pricingPackagesRoute)}
      />
      <PackageDetails
        packageDetails={packageDetails}
        soloPackages={soloPackages}
        image={image}
      />
      <Divider />
      <Curriculum curriculum={curriculum} />
      <Divider />
      <p className="px-12 text-2xl font-bold mt-10 mb-4">{LATEST_REVIEWS}</p>
      <div className="px-12 grid grid-cols-3 gap-8 mb-15">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showRating
              reviewerNamePostion="bottom"
            />
          ))}
      </div>
      <Divider />
    </div>
  );
}

const getButtonLabel = (type: "combo" | "duo" | "solo") => {
  switch (type) {
    case "solo":
      return ALL_SOLO_PACKAGES;
    case "duo":
      return ALL_DUO_PACKAGES;
    case "combo":
      return ALL_COMBO_PACKAGES;
    default:
      return BACK;
  }
};
