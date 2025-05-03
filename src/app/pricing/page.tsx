import { getEntries } from "app/lib/contentfulDataService";
import PricingContainer from "./components/PricingContainer";
import Divider from "app/components/Divider";
import {
  TypePackageFields,
  TypePackageSkeleton,
} from "app/lib/types/contentful/TypePackage";

export default async function Pricing() {
  const allPackages: TypePackageFields[] =
    await getEntries<TypePackageSkeleton>("package");

  return (
    <div className="mt-30 px-6">
      <PricingContainer allPackages={allPackages} />
      <Divider />
    </div>
  );
}
