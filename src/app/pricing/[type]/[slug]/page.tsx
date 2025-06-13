import {
  getEntriesWithTag,
  getEntryWithSlug,
} from "app/lib/contentfulDataService";
import { TypePackageFields } from "app/lib/types/contentful/TypePackage";
import { TypeCurriculumFields } from "app/lib/types/contentful/TypeCurriculum";

import SinglePackageContainer from "app/pricing/components/SinglePackageContainter";
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [packageDetails, curriculum, soloPackages, reviews] = await Promise.all(
    [
      getEntryWithSlug("package", slug),
      getEntryWithSlug("curriculum", slug),
      getEntriesWithTag("package", "solo"),
      getEntriesWithTag("review", slug),
    ]
  );

  return (
    <SinglePackageContainer
      packageDetails={packageDetails as unknown as TypePackageFields}
      curriculum={curriculum as unknown as TypeCurriculumFields}
      soloPackages={soloPackages as unknown as TypePackageFields[]}
      reviews={reviews as unknown as TypeReviewFields[]}
    />
  );
}
