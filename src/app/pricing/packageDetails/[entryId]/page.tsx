import { getAssets, getEntry } from "app/lib/contentfulDataService";
import {
  TypePackageFields,
  TypePackageSkeleton,
} from "app/lib/types/contentful/TypePackage";
import SinglePackageContainer from "app/pricing/components/SinglePackageContainter";
import { BANNER } from "app/utils/variables";

export default async function PackageDetails({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;
  const packageDetails =
    (await getEntry<TypePackageSkeleton>(entryId)) ?? ({} as TypePackageFields);
  const images = await getAssets();
  const image = images.find((image) => image.title === BANNER);

  return (
    <SinglePackageContainer packageDetails={packageDetails} image={image} />
  );
}
