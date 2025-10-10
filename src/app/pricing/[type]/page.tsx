import { getEntries, getEntryWithSlug } from "app/lib/contentfulDataService";

import {
  TypePackagesPageDataFields,
  TypePackagesPageDataSkeleton,
} from "app/lib/types/contentful/TypePackagesPageData";
import { TypePackageFields } from "app/lib/types/contentful";
import PackagesContainer from "../components/PackagesContainer";
import QuestionsAndInfo from "../components/QuestionsAndInfo";
import Divider from "app/components/Divider";
import { AssetFields } from "contentful";
import ComboSection from "../components/ComboSection";
import HeadingSection from "../components/HeadingSection";

async function getPageData(type: string) {
  const pageData = await getEntryWithSlug("packagesPageData", type);
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
  const { packagesPageData } = await getPageData(type);

  const soloPackages = packagesPageData.packages.map(
    (p) => p.fields
  ) as TypePackageFields[];
  const imageField = packagesPageData.image.fields as AssetFields;
  const comboPackages = packagesPageData.comboPackages?.map(
    (pkg) => pkg.fields
  ) as TypePackageFields[];

  return (
    <>
      <HeadingSection
        title={packagesPageData.title}
        subtitle={packagesPageData.subtitle}
        image={imageField}
      />
      {comboPackages && (
        <ComboSection
          type={type}
          title={packagesPageData.comboSectionTitle}
          subtitle={packagesPageData.comboSectionSubtitle}
          comboPackages={comboPackages}
          soloPackages={soloPackages}
        />
      )}
      <PackagesContainer type={type} packages={soloPackages} />
      <QuestionsAndInfo packagesPageData={packagesPageData} />
      <Divider />
    </>
  );
}
