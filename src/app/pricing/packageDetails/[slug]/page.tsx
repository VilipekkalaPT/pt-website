import { getAssets, getEntryWithSlug } from "app/lib/contentfulDataService";
import { TypePackageFields } from "app/lib/types/contentful/TypePackage";

import SinglePackageContainer from "app/pricing/components/SinglePackageContainter";
import { BANNER } from "app/utils/variables";

// For SSG in the future
// async function getPageData(slug: string) {
//   const packageDetails = (await getEntryWithSlug(
//     slug
//   )) as unknown as TypePackageFields;
//   const images = await getAssets();

//   return { images, packageDetails };
// }

// export async function generateStaticParams() {
//   const pricingPageData = await getEntries<TypePricingPageDataSkeleton>(
//     "pricingPageData"
//   );
//   const packageData: TypePackageSkeleton[] = pricingPageData[0].packages;
//   const allPackages: TypePackageFields[] = packageData.map((p) => p.fields);

//   return allPackages.map((p) => ({
//     slug: p.slug,
//   }));
// }

export default async function PackageDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const packageDetails = (await getEntryWithSlug(
    slug
  )) as unknown as TypePackageFields;
  const images = await getAssets();
  const image = images.find((image) => image.title === BANNER);

  return (
    <SinglePackageContainer packageDetails={packageDetails} image={image} />
  );
}
