import { getEntries } from "app/lib/contentfulDataService";
import KickOffProcess from "./components/KickOffProcess";
import Review from "./components/Review";
import { TypeKickOffProcessSkeleton } from "app/lib/types/contentful/TypeKickOffProcess";
import { TypeReviewSkeleton } from "app/lib/types/contentful/TypeReview";
import HeadingSection from "./components/HeadingSection";
import {
  TypeImageCardFields,
  TypeLandingPageDataFields,
  TypeLandingPagePainPointsFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import ServiceSection from "./components/ServiceSection";
import FAQSection from "./components/FAQSection";
import { TypeLandingPageDataSkeleton } from "app/lib/types/contentful/TypeLandingPageData";
import PainPointsSection from "./components/PainPointsSection";
import { TypePackageSkeleton } from "app/lib/types/contentful/TypePackage";
import CardsFitQuizSection from "./components/CardsFitQuizSection";
import { HeadingSectionType } from "app/lib/types/type";

export default async function LandingPage() {
  const [landingPageData, kickOffProcess, reviews, packages] =
    await Promise.all([
      getEntries<TypeLandingPageDataSkeleton>("landingPageData"),
      getEntries<TypeKickOffProcessSkeleton>("kickOffProcess"),
      getEntries<TypeReviewSkeleton>("review"),
      getEntries<TypePackageSkeleton>("package"),
    ]);

  const landingPageContent =
    landingPageData[0] as unknown as TypeLandingPageDataFields;
  const banner = landingPageContent.banner.fields as AssetFields;
  const headingSections: HeadingSectionType[] = [
    {
      heading: landingPageContent.heading1,
      subheading: landingPageContent.subheading1,
    },
    {
      heading: landingPageContent.heading2,
      subheading: landingPageContent.subheading2,
    },
    {
      heading: landingPageContent.heading3,
      subheading: landingPageContent.subheading3,
    },
  ];

  const cards = landingPageContent.imageCards.map(
    (card) => card.fields
  ) as TypeImageCardFields[];
  const painPoints = landingPageContent.painPoints.map(
    (point) => point.fields
  ) as TypeLandingPagePainPointsFields[];

  return (
    <>
      <HeadingSection
        banner={banner}
        headingSections={headingSections}
        actionButtonText1={landingPageContent.actionButtonText1}
        actionButtonText2={landingPageContent.actionButtonText2}
      />
      <PainPointsSection
        title={landingPageContent.painPointsSectionTitle}
        subtitle={landingPageContent.painPointsSectionSubtitle}
        painPoints={painPoints}
      />
      <ServiceSection
        title={landingPageContent.serviceTitle}
        subtitle={landingPageContent.serviceSubtitle}
        services={landingPageContent.services}
      />
      <CardsFitQuizSection cards={cards} packages={packages} />
      <FAQSection
        title={landingPageContent.faqTitle}
        content={landingPageContent.faqContent}
        buttonText={landingPageContent.faqButtonText}
        image={landingPageContent.faqImage.fields as AssetFields}
      />
      <Review reviews={reviews} />
      <KickOffProcess process={kickOffProcess} />
    </>
  );
}
