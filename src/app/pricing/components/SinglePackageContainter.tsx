"use client";

import {
  TypeCurriculumFields,
  TypeCurriculumPeriodFields,
  TypeImageCardFields,
  TypePackageFields,
  TypeReviewFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import PackageDetails from "./PackageDetails";
import Divider from "app/components/Divider";
import Button from "app/components/Button";
import {
  ALL_PACKAGES,
  EXPECTED_RESULTS,
  FOR_WHOM,
  INFO_SECTION_SUBTITLE,
  INFO_SECTION_TITLE,
  INFO_TABS,
  NOT_FOR_WHOM,
  WHY,
} from "app/utils/variables";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { getPricingPackagesRoute } from "app/utils/utils";
import InfoTabs from "app/landing-page/components/InfoTabs";
import { Tab } from "app/lib/types/type";
import ReviewSection from "./ReviewSection";
import HowTrainingSessionLookLike from "./HowTrainingSessionLookLike";
import InfoSection from "app/components/InfoSection";

interface SinglePackageContainerProps {
  packageDetails: TypePackageFields;
  curriculum: TypeCurriculumFields;
  soloPackages: TypePackageFields[];
  reviews: TypeReviewFields[];
  imageCards: TypeImageCardFields[];
}

const createTabs = (
  packageDetails: TypePackageFields,
  curriculum: TypeCurriculumFields
): Tab[] => {
  return [
    {
      label: INFO_TABS.WHY,
      infoCards: [
        {
          title: WHY,
          content: packageDetails.why,
        },
        {
          title: EXPECTED_RESULTS,
          content: packageDetails.expectedResults,
        },
      ],
    },
    {
      label: INFO_TABS.FOR_WHOM,
      infoCards: [
        {
          title: FOR_WHOM,
          content: packageDetails.forWhom,
        },
        {
          title: NOT_FOR_WHOM,
          content: packageDetails.notForWhom,
        },
      ],
    },
    {
      label: INFO_TABS.CURRICULUM,
      subtitle: curriculum.disclaimer,
      infoCards: curriculum.curriculumPeriods.map((period) => {
        const periodFields = period.fields as TypeCurriculumPeriodFields;
        return {
          title: periodFields.title,
          content: periodFields.description,
        };
      }),
    },
  ];
};

export default function SinglePackageContainer({
  packageDetails,
  curriculum,
  soloPackages,
  reviews,
  imageCards,
}: SinglePackageContainerProps) {
  const router = useRouter();
  const pricingPackagesRoute = getPricingPackagesRoute(packageDetails.type);
  const image = packageDetails.image?.fields as AssetFields;
  const tabs = createTabs(packageDetails, curriculum);

  return (
    <div className="mt-10">
      <Button
        variant="ghost"
        label={ALL_PACKAGES}
        iconLeft={<ArrowLeftIcon className="size-4" />}
        className="mb-6 px-12"
        onClick={() => router.push(pricingPackagesRoute)}
      />
      <PackageDetails
        packageDetails={packageDetails}
        soloPackages={soloPackages}
        image={image}
      />
      <InfoTabs tabs={tabs} showCurriculum={!packageDetails.sessionOptions} />
      {packageDetails.howTrainingSessionLooksLikeTitle && (
        <HowTrainingSessionLookLike
          title={packageDetails.howTrainingSessionLooksLikeTitle}
          subtitle={packageDetails.howTrainingSessionLooksLikeSubtitle}
          images={packageDetails.howTrainingSessionLooksLikeImages}
        />
      )}
      {reviews.length > 0 && <ReviewSection reviews={reviews} />}
      <InfoSection
        title={INFO_SECTION_TITLE}
        subtitle={INFO_SECTION_SUBTITLE}
        imageCards={imageCards}
        className="mt-35 mb-15 px-12"
      />
      <Divider />
    </div>
  );
}
