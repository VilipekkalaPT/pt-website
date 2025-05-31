import {
  getEntries,
  getEntriesWithTag,
  getEntryWithSlug,
} from "app/lib/contentfulDataService";

import {
  TypePackagesPageDataFields,
  TypePackagesPageDataSkeleton,
} from "app/lib/types/contentful/TypePackagesPageData";
import { TypePackageFields } from "app/lib/types/contentful";
import PackagesContainer from "../components/PackagesContainer";
import QuestionsAndInfo from "../components/QuestionsAndInfo";
import Divider from "app/components/Divider";

async function getPageData(slug: string) {
  const [pageData, soloPackagesData] = await Promise.all([
    getEntryWithSlug("packagesPageData", slug),
    getEntriesWithTag("package", "solo"),
  ]);

  const packagesPageData = pageData as unknown as TypePackagesPageDataFields;
  const soloPackages = soloPackagesData as unknown as TypePackageFields[];

  return { packagesPageData, soloPackages };
}

export async function generateStaticParams() {
  const packagesPageData = await getEntries<TypePackagesPageDataSkeleton>(
    "packagesPageData"
  );

  return packagesPageData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { packagesPageData, soloPackages } = await getPageData(slug);
  const packages = packagesPageData.packages.map(
    (p) => p.fields
  ) as TypePackageFields[];

  return (
    <div className="mt-22">
      <div className="w-1/2 mx-auto py-32 text-center">
        <p className="text-5xl font-bold">{packagesPageData.title}</p>
        <p className="text-2xl mt-2">{packagesPageData.subtitle}</p>
      </div>
      <PackagesContainer
        type={slug}
        packages={packages}
        soloPackages={soloPackages}
      />
      <QuestionsAndInfo packagesPageData={packagesPageData} />
      <Divider />
    </div>
  );
}
