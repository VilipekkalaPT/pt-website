import { getEntries } from "app/lib/contentfulDataService";
import PricingContainer from "./components/PricingContainer";
import Divider from "app/components/Divider";
import { TypePricingPageDataSkeleton } from "app/lib/types/contentful/TypePricingPageData";

export default async function Pricing() {
  const pricingPageData = await getEntries<TypePricingPageDataSkeleton>(
    "pricingPageData"
  );
  const { bannerText, packages } = pricingPageData[0];

  return (
    <div className="mt-30 px-6">
      <p className="mb-12">{bannerText}</p>
      <PricingContainer packageData={packages} />
      <Divider />
    </div>
  );
}
