import {
  getEntries,
  getEntriesWithTag,
  getEntryWithSlug,
} from "app/lib/contentfulDataService";
import {
  TypePackageFields,
  TypePackageSkeleton,
} from "app/lib/types/contentful/TypePackage";
import { TypeCurriculumFields } from "app/lib/types/contentful/TypeCurriculum";

import SinglePackageContainer from "app/pricing/components/SinglePackageContainter";
import { TypeReviewFields } from "app/lib/types/contentful";

async function getPageData(slug: string) {
  const [packageDetails, curriculum, soloPackages, reviews] = await Promise.all(
    [
      getEntryWithSlug("package", slug),
      getEntryWithSlug("curriculum", slug),
      getEntriesWithTag("package", "solo"),
      getEntriesWithTag("review", slug),
    ],
  );

  return { packageDetails, curriculum, soloPackages, reviews };
}

export async function generateStaticParams() {
  const allPackages = await getEntries<TypePackageSkeleton>("package");
  return allPackages.map((p) => ({ slug: p.slug }));
}

export default async function PackageDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { packageDetails, curriculum, soloPackages, reviews } =
    await getPageData(slug);

  return (
    <SinglePackageContainer
      packageDetails={packageDetails as unknown as TypePackageFields}
      curriculum={curriculum as unknown as TypeCurriculumFields}
      soloPackages={soloPackages as unknown as TypePackageFields[]}
      reviews={reviews as unknown as TypeReviewFields[]}
    />
  );
}
