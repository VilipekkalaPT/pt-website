import Divider from "app/components/Divider";
import { getEntries } from "app/lib/contentfulDataService";
import {
  TypePricingPageDataFields,
  TypePricingPageDataSkeleton,
} from "app/lib/types/contentful/TypePricingPageData";
import PricingPageHeading from "./components/PricingPageHeading";
import PackagesSelection from "./components/PackagesSelection";
import PackageTypeComparison from "./components/PackageTypeComparison";
import { TypeImageCardFields } from "app/lib/types/contentful";
import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful/TypePricingPackageTypeComparision";
import OfferSection from "./components/OfferSection";

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
      <PackagesSelection
        title={pricingPage.packagesTitle}
        subtitle={pricingPage.packagesSubtitle}
        imageCards={packageImageCards}
      />
      <PackageTypeComparison
        title={pricingPage.packageTypeComparisonTitle}
        rows={packageTypeComparisonRows}
      />
      <OfferSection offers={pricingPage.offerText} />
      <Divider />
    </>
  );
}
