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
import ButtonGroup from "../components/ButtonGroup";

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
      <ButtonGroup
        infoButtonText1={pricingPageContent.actionButtonText1}
        infoButtonText2={pricingPageContent.actionButtonText2}
        button1Url={pricingPageContent.button1Url}
        button2Url={pricingPageContent.button2Url}
        className="mt-6 w-[90%] mx-auto pb-16"
      />
    </>
  );
}
