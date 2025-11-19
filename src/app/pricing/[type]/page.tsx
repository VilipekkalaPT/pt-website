import { getEntries, getEntryWithSlug } from "app/lib/contentfulDataService";
import {
  TypePackagesPageDataFields,
  TypePackagesPageDataSkeleton,
} from "app/lib/types/contentful/TypePackagesPageData";
import { TypePackageFields } from "app/lib/types/contentful";
import PackagesContainer from "../components/PackagesContainer";
import QuestionsAndInfo from "../components/QuestionsAndInfo";
import { AssetFields } from "contentful";
import ComboSection from "../components/ComboSection";
import HeadingSection from "app/components/HeadingSection";
import ButtonGroup from "app/components/ButtonGroup";
import { PRICING_PAGE_TITLE } from "app/utils/variables";

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
        backButtonLabel={PRICING_PAGE_TITLE}
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
      <PackagesContainer
        type={type}
        title={packagesPageData.packageSectionTitle}
        subtitle={packagesPageData.packageSectionSubtitle}
        packages={soloPackages}
        hasComboPackages={!!comboPackages}
      />
      <ButtonGroup
        infoButtonText1={packagesPageData.actionButtonText1}
        infoButtonText2={packagesPageData.actionButtonText2}
        button1Url={packagesPageData.button1Url}
        button2Url={packagesPageData.button2Url}
        className="mb-16 w-4/5 mx-auto"
      />
      <QuestionsAndInfo packagesPageData={packagesPageData} />
    </>
  );
}
