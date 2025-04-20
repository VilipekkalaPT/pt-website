import { getEntries } from "app/lib/contentful";
import { PricingPageDataSkeleton } from "app/lib/types";
import PricingContainer from "./components/PricingContainer";
import Divider from "app/components/Divider";

export default async function Pricing() {
  const pricingPageData = await getEntries<PricingPageDataSkeleton>(
    "pricingPageData"
  );

  const { bannerText, packages } =
    pricingPageData[0] as PricingPageDataSkeleton["fields"];
  const packageList = packages.map((p) => p.fields);

  return (
    <div className="mt-30 px-6">
      <PricingContainer packageList={packageList} />
      <Divider />
    </div>
  );
}
