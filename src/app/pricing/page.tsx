import { getEntries } from "app/lib/contentfulDataService";
import {
  TypePricingPageDataFields,
  TypePricingPageDataSkeleton,
} from "app/lib/types/contentful/TypePricingPageData";
import PricingPageHeading from "./components/PricingPageHeading";
import CompareDecideSection from "./components/CompareDecideSection";
import {
  TypeImageCardFields,
  TypePricingDifferentServicesComparisonFields,
} from "app/lib/types/contentful";
import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful/TypePricingPackageTypeComparision";
import OfferSection from "./components/OfferSection";
import Button from "app/components/Button";

export default async function PricingPage() {
  const pricingPageData = await getEntries<TypePricingPageDataSkeleton>(
    "pricingPageData"
  );
  const pricingPageContent: TypePricingPageDataFields = pricingPageData[0];
  const packageCards = pricingPageContent.packageCards.map(
    (el) => el.fields
  ) as TypeImageCardFields[];
  const packageTypeComparisonRows =
    pricingPageContent.packageTypeComparisonRows.map(
      (el) => el.fields
    ) as TypePricingPackageTypeComparisionFields[];
  const differentServicesComparisonRows =
    pricingPageContent.differentServicesComparisonRows.map(
      (el) => el.fields
    ) as TypePricingDifferentServicesComparisonFields[];

  return (
    <>
      <PricingPageHeading
        title={pricingPageContent.title}
        subtitle={pricingPageContent.subtitle}
        image={pricingPageContent.headingImage}
        packageCards={packageCards}
      />
      <OfferSection offers={pricingPageContent.offerText} />
      <CompareDecideSection
        title={pricingPageContent.compareDecideTitle}
        packageTypeComparisonRows={packageTypeComparisonRows}
        differentServicesComparisonRows={differentServicesComparisonRows}
        steps={pricingPageContent.steps}
      />
      <div className="mt-8 flex w-4/5 mx-auto justify-center gap-4">
        <Button
          label={pricingPageContent.actionButtonText1}
          variant="primary"
          glassmorphism
          hasShadow
        />
        <Button
          label={pricingPageContent.actionButtonText1}
          variant="primary"
          glassmorphism
          hasShadow
        />
      </div>
    </>
  );
}
