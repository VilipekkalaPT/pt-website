import HeroSection from "app/components/HeroSection";
import InfoSection from "app/components/InfoSection";
import { getEntries } from "app/lib/contentfulDataService";
import { TypeReviewFields } from "app/lib/types/contentful/TypeReview";
import {
  TypeReviewsPageDataFields,
  TypeReviewsPageDataSkeleton,
} from "app/lib/types/contentful/TypeReviewsPageData";
import { HeadingSectionType } from "app/lib/types/type";
import { AssetFields } from "contentful";
import AllReviews from "./components/AllReviews";
import ButtonGroup from "../components/ButtonGroup";

export default async function ClientSpotlights() {
  const reviewsPageData = await getEntries<TypeReviewsPageDataSkeleton>(
    "reviewsPageData"
  );

  const reviewsPageContent = reviewsPageData[0] as TypeReviewsPageDataFields;
  const image = reviewsPageContent.image.fields as AssetFields;
  const allReviews = reviewsPageContent.allReviews.map(
    (el) => el.fields
  ) as TypeReviewFields[];

  const headingSections: HeadingSectionType[] = [
    {
      heading: reviewsPageContent.heading,
      subheading: reviewsPageContent.subheading,
    },
  ];

  return (
    <>
      <HeroSection
        image={image}
        headingSections={headingSections}
        fillImage={false}
      />
      <AllReviews
        title={reviewsPageContent.reviewSectionTitle}
        subtitle={reviewsPageContent.reviewSectionSubtitle}
        allReviews={allReviews}
      />
      <InfoSection
        title={reviewsPageContent.infoSectionTitle}
        subtitle={reviewsPageContent.infoSectionSubtitle}
        className="mt-4 mb-6"
      />
      <ButtonGroup
        infoButtonText1={reviewsPageContent.infoButtonText1}
        infoButtonText2={reviewsPageContent.infoButtonText2}
        button1Url={reviewsPageContent.infoButton1Url}
        button2Url={reviewsPageContent.infoButton2Url}
        className="pb-16 w-4/5 mx-auto"
      />
    </>
  );
}
