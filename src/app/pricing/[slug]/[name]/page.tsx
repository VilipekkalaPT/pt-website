import {
  getAssets,
  getEntriesWithTag,
  getEntryWithSlug,
} from "app/lib/contentfulDataService";
import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import { TypeCurriculumFields } from "app/lib/types/contentful/TypeCurriculum";

import SinglePackageContainer from "app/pricing/components/SinglePackageContainter";
import { BANNER } from "app/utils/variables";
import { TypeReviewFields } from "app/lib/types/contentful";

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
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const [packageDetails, curriculum, soloPackages, reviews] = await Promise.all(
    [
      getEntryWithSlug("package", name),
      getEntryWithSlug("curriculum", name),
      getEntriesWithTag("package", "solo"),
      getEntriesWithTag("review", name),
    ]
  );

  const images = await getAssets();
  const image = images.find((image) => image.title === BANNER);

  return (
    <SinglePackageContainer
      packageDetails={packageDetails as unknown as TypePackageFields}
      curriculum={curriculum as unknown as TypeCurriculumFields}
      soloPackages={soloPackages as unknown as TypePackageFields[]}
      reviews={reviews as unknown as TypeReviewFields[]}
      image={image}
    />
  );
}
