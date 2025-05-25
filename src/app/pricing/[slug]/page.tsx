import { getEntries, getEntryWithSlug } from "app/lib/contentfulDataService";

import {
  TypePackagesPageDataFields,
  TypePackagesPageDataSkeleton,
} from "app/lib/types/contentful/TypePackagesPageData";
import { TypePackageFields } from "app/lib/types/contentful";
import PackagesContainer from "../components/PackagesContainer";
import QuestionsAndInfo from "../components/QuestionsAndInfo";
import Divider from "app/components/Divider";

async function getPageData(slug: string) {
  const packagesPageData = (await getEntryWithSlug(
    "packagesPageData",
    slug
  )) as unknown as TypePackagesPageDataFields;

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { packagesPageData } = await getPageData(slug);
  const packages = packagesPageData.packages.map(
    (p) => p.fields
  ) as TypePackageFields[];

  return (
    <div className="mt-22">
      <div className="w-1/2 mx-auto py-32 text-center">
        <p className="text-5xl font-bold">{packagesPageData.title}</p>
        <p className="text-2xl mt-2">{packagesPageData.subtitle}</p>
      </div>
      <PackagesContainer type={slug} packages={packages} />
      <QuestionsAndInfo packagesPageData={packagesPageData} />
      <Divider />
    </div>
  );
}
