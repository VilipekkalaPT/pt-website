"use client";

import {
  TypeCurriculumFields,
  TypeCurriculumPeriodFields,
  TypeHowTrainingSessionLooksLikeFields,
  TypePackageFields,
  TypeReviewFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import PackageDetails from "./PackageDetails";
import Button from "app/components/Button";
import {
  ALL_PACKAGES,
  BOOK_FREE_CONSULTATION,
  EXPECTED_RESULTS,
  FOR_WHOM,
  INFO_SECTION_SUBTITLE,
  INFO_SECTION_TITLE,
  INFO_TABS,
  NOT_FOR_WHOM,
  READ_MORE_REVIEWS,
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
}

const createTabs = (
  packageDetails: TypePackageFields,
  curriculum: TypeCurriculumFields
): Tab[] => {
  const showCurriculum = !packageDetails.sessionOptions;

  const tabs: Tab[] = [
    {
      label: INFO_TABS.WHY,
      infoCards: [
        { title: WHY, content: packageDetails.why },
        { title: EXPECTED_RESULTS, content: packageDetails.expectedResults },
      ],
    },
    {
      label: INFO_TABS.FOR_WHOM,
      infoCards: [
        { title: FOR_WHOM, content: packageDetails.forWhom },
        { title: NOT_FOR_WHOM, content: packageDetails.notForWhom },
      ],
    },
  ];

  if (showCurriculum && curriculum.curriculumPeriods.length) {
    tabs.push({
      label: INFO_TABS.CURRICULUM,
      subtitle: curriculum.disclaimer,
      infoCards: curriculum.curriculumPeriods.map((period) => {
        const periodFields = period.fields as TypeCurriculumPeriodFields;
        return {
          title: periodFields.title,
          content: periodFields.description,
        };
      }),
    });
  }

  return tabs;
};

export default function SinglePackageContainer({
  packageDetails,
  curriculum,
  soloPackages,
  reviews,
}: SinglePackageContainerProps) {
  const router = useRouter();
  const pricingPackagesRoute = getPricingPackagesRoute(packageDetails.type);
  const image = packageDetails.image?.fields as AssetFields;
  const tabs = createTabs(packageDetails, curriculum);
  const trainingSessionData =
    packageDetails.howTrainingSessionLooksLikeImages?.map(
      (item) => item.fields
    ) as TypeHowTrainingSessionLooksLikeFields[];

  return (
    <div className="w-4/5 mx-auto py-16">
      <Button
        variant="ghost"
        label={ALL_PACKAGES}
        iconLeft={<ArrowLeftIcon className="size-4" />}
        className="mb-6 p-0"
        onClick={() => router.push(pricingPackagesRoute)}
      />
      <PackageDetails
        packageDetails={packageDetails}
        soloPackages={soloPackages}
        image={image}
      />
      <InfoTabs tabs={tabs} />
      {packageDetails.howTrainingSessionLooksLikeTitle && (
        <HowTrainingSessionLookLike
          title={packageDetails.howTrainingSessionLooksLikeTitle}
          subtitle={packageDetails.howTrainingSessionLooksLikeSubtitle}
          data={trainingSessionData}
        />
      )}
      {reviews.length > 0 && <ReviewSection reviews={reviews} />}
      <InfoSection
        title={INFO_SECTION_TITLE}
        subtitle={INFO_SECTION_SUBTITLE}
        className="mt-4"
      />
      <div className="mt-6 w-4/5 mx-auto flex justify-center gap-4">
        <Button
          label={READ_MORE_REVIEWS}
          variant="primary"
          glassmorphism
          hasShadow
        />
        <Button
          label={BOOK_FREE_CONSULTATION}
          variant="primary"
          glassmorphism
          hasShadow
        />
      </div>
    </div>
  );
}
