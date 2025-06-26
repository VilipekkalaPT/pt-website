import HeroSection from "app/components/HeroSection";
import InfoSection from "app/components/InfoSection";
import { getEntries } from "app/lib/contentfulDataService";
import { TypeImageCardFields } from "app/lib/types/contentful";
import { TypeReviewFields } from "app/lib/types/contentful/TypeReview";
import {
  TypeReviewsPageDataFields,
  TypeReviewsPageDataSkeleton,
} from "app/lib/types/contentful/TypeReviewsPageData";
import { HeadingSection } from "app/lib/types/type";
import { AssetFields } from "contentful";
import AllReviews from "./components/AllReviews";

export default async function ClientSpotlights() {
  const reviewsPageData = await getEntries<TypeReviewsPageDataSkeleton>(
    "reviewsPageData"
  );

  const reviewsPageContent = reviewsPageData[0] as TypeReviewsPageDataFields;
  const image = reviewsPageContent.image.fields as AssetFields;
  const allReviews = reviewsPageContent.allReviews.map(
    (el) => el.fields
  ) as TypeReviewFields[];
  const imageCards = reviewsPageContent.infoImageCards.map(
    (el) => el.fields
  ) as TypeImageCardFields[];

  const headingSections: HeadingSection[] = [
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
        imageCards={imageCards}
        className="mt-20 px-24"
      />
    </>
  );
}
