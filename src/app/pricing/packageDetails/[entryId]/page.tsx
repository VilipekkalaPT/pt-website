import { getEntry } from "app/lib/contentfulDataService";
import { TypePackageSkeleton } from "app/lib/types/contentful/TypePackage";

export default async function PackageDetails({
  params,
}: {
  params: { entryId: string };
}) {
  const packageDetails = await getEntry<TypePackageSkeleton>(params.entryId);

  console.log("Package Details:", packageDetails);

  return (
    <div className="mt-30 px-6">
      <h1>Package Details</h1>
      <p>{packageDetails?.name}</p>
    </div>
  );
}
