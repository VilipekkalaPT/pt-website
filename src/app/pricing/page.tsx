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
  const pricingPage: TypePricingPageDataFields = pricingPageData[0];
  const packageImageCards = pricingPage.packageImageCards.map(
    (el) => el.fields
  ) as TypeImageCardFields[];
  const packageTypeComparisonRows = pricingPage.packageTypeComparisonRows.map(
    (el) => el.fields
  ) as TypePricingPackageTypeComparisionFields[];
  const differentServicesComparisonRows =
    pricingPage.differentServicesComparisonRows.map(
      (el) => el.fields
    ) as TypePricingDifferentServicesComparisonFields[];
  const infoSectionImageCards = pricingPage.infoImageCards.map(
    (el) => el.fields
  ) as TypeImageCardFields[];

  return (
    <>
      <PricingPageHeading
        title={pricingPage.title}
        subtitle={pricingPage.subtitle}
        image={pricingPage.headingImage}
        heading1={pricingPage.heading1}
        heading2={pricingPage.heading2}
        subheading={pricingPage.subheading}
        content={pricingPage.headingContent}
      />
      <InfoSection
        title={pricingPage.infoSectionTitle}
        subtitle={pricingPage.infoSectionSubtitle}
        imageCards={packageImageCards}
        className="mt-35 px-12"
      />
      <PackageTypeComparison
        title={pricingPage.packageTypeComparisonTitle}
        rows={packageTypeComparisonRows}
      />
      <OfferSection offers={pricingPage.offerText} />
      <DifferentServicesComparison
        title={pricingPage.differentServicesComparisonTitle}
        subtitle={pricingPage.differentServicesComparisonSubtitle}
        rows={differentServicesComparisonRows}
      />
      <InfoSection
        title={pricingPage.infoSectionTitle}
        subtitle={pricingPage.infoSectionSubtitle}
        imageCards={infoSectionImageCards}
        className="mt-35 px-12 mb-15"
      />
      <Divider />
    </>
  );
}
