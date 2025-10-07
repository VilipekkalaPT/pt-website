import Divider from "app/components/Divider";
import { getEntries } from "app/lib/contentfulDataService";
import {
  TypePricingPageDataFields,
  TypePricingPageDataSkeleton,
} from "app/lib/types/contentful/TypePricingPageData";
import PricingPageHeading from "./components/PricingPageHeading";
import PackageTypeComparison from "./components/PackageTypeComparison";
import {
  TypeImageCardFields,
  TypePricingDifferentServicesComparisonFields,
} from "app/lib/types/contentful";
import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful/TypePricingPackageTypeComparision";
import OfferSection from "./components/OfferSection";
import DifferentServicesComparison from "./components/DifferentServicesComparison";
import InfoSection from "app/components/InfoSection";

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
  const infoSectionImageCards = pricingPageContent.infoImageCards.map(
    (el) => el.fields
  ) as TypeImageCardFields[];

  return (
    <>
      <PricingPageHeading
        title={pricingPageContent.title}
        subtitle={pricingPageContent.subtitle}
        image={pricingPageContent.headingImage}
        packageCards={packageCards}
      />
      <OfferSection offers={pricingPageContent.offerText} />
      <PackageTypeComparison
        title={pricingPageContent.packageTypeComparisonTitle}
        rows={packageTypeComparisonRows}
      />
      <DifferentServicesComparison
        title={pricingPageContent.differentServicesComparisonTitle}
        subtitle={pricingPageContent.differentServicesComparisonSubtitle}
        rows={differentServicesComparisonRows}
      />
      <InfoSection
        title={pricingPageContent.infoSectionTitle}
        subtitle={pricingPageContent.infoSectionSubtitle}
        imageCards={infoSectionImageCards}
        className="mt-35 px-12 mb-15"
      />
      <Divider />
    </>
  );
}
