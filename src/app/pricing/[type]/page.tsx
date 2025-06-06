import { getEntries, getEntryWithSlug } from "app/lib/contentfulDataService";

import {
  TypePackagesPageDataFields,
  TypePackagesPageDataSkeleton,
} from "app/lib/types/contentful/TypePackagesPageData";
import { TypePackageFields } from "app/lib/types/contentful";
import PackagesContainer from "../components/PackagesContainer";
import QuestionsAndInfo from "../components/QuestionsAndInfo";
import Divider from "app/components/Divider";

async function getPageData(type: string) {
  const [pageData] = await Promise.all([
    getEntryWithSlug("packagesPageData", type),
  ]);

  const packagesPageData = pageData as unknown as TypePackagesPageDataFields;

  return { packagesPageData };
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
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  console.log("slug", type);
  const { packagesPageData } = await getPageData(type);
  const packages = packagesPageData.packages.map(
    (p) => p.fields
  ) as TypePackageFields[];

  return (
    <>
      <div className="w-1/2 mx-auto py-32 text-center">
        <p className="text-5xl font-bold">{packagesPageData.title}</p>
        <p className="text-2xl mt-2">{packagesPageData.subtitle}</p>
      </div>
      <PackagesContainer type={type} packages={packages} />
      <QuestionsAndInfo packagesPageData={packagesPageData} />
      <Divider />
    </>
  );
}
