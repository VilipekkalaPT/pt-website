import { getEntries } from "app/lib/contentfulDataService";
import Divider from "app/components/Divider";
import KickOffProcess from "./components/KickOffProcess";
import Review from "./components/Review";
import { TypeKickOffProcessSkeleton } from "app/lib/types/contentful/TypeKickOffProcess";
import { TypeReviewSkeleton } from "app/lib/types/contentful/TypeReview";
import HeadingSection from "./components/HeadingSection";
import {
  TypeLandingPageCardFields,
  TypeLandingPageDataFields,
  TypeLandingPageHeadingSectionFields,
  TypeLandingPageServicesFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
import ServiceSection from "./components/ServiceSection";
import GoalSection from "./components/GoalSection";
import ImageCards from "./components/ImageCards";
import FAQSection from "./components/FAQSection";
import { TypeLandingPageDataSkeleton } from "app/lib/types/contentful/TypeLandingPageData";

export default async function LandingPage() {
  const [landingPageData, kickOffProcess, reviews] = await Promise.all([
    getEntries<TypeLandingPageDataSkeleton>("landingPageData"),
    getEntries<TypeKickOffProcessSkeleton>("kickOffProcess"),
    getEntries<TypeReviewSkeleton>("review"),
  ]);

  const landingPageContent =
    landingPageData[0] as unknown as TypeLandingPageDataFields;
  const banner = landingPageContent.banner.fields as AssetFields;
  const headingSections = landingPageContent.headingSections.map(
    (section) => section.fields
  ) as TypeLandingPageHeadingSectionFields[];
  const services = landingPageContent.services.map(
    (s) => s.fields
  ) as TypeLandingPageServicesFields[];
  const imageCards = landingPageContent.imageCards.map(
    (card) => card.fields
  ) as TypeLandingPageCardFields[];

  return (
    <>
      <HeadingSection
        banner={banner}
        headingSections={headingSections}
        actionButtonText1={landingPageContent.actionButtonText1}
        actionButtonText2={landingPageContent.actionButtonText2}
      />
      <ServiceSection
        title={landingPageContent.serviceTitle}
        subtitle={landingPageContent.serviceSubtitle}
        services={services}
      />
      <GoalSection
        title={landingPageContent.goalTitle}
        goals={landingPageContent.goals}
      />
      <ImageCards imageCards={imageCards} />
      <FAQSection
        title={landingPageContent.faqTitle}
        subtitle={landingPageContent.faqSubtitle}
        content={landingPageContent.faqContent}
        buttonText={landingPageContent.faqButtonText}
        image={landingPageContent.faqImage.fields as AssetFields}
      />
      <Review reviews={reviews} />
      <KickOffProcess process={kickOffProcess} />
      <Divider />
    </>
  );
}
