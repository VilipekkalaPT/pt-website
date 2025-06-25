import HeroSection from "app/components/HeroSection";
import InfoSection from "app/components/InfoSection";
import ReviewCard from "app/landing-page/components/ReviewCard";
import { getEntries } from "app/lib/contentfulDataService";
import { TypeImageCardFields } from "app/lib/types/contentful";
import {
  TypeReviewFields,
  TypeReviewSkeleton,
} from "app/lib/types/contentful/TypeReview";
import {
  TypeReviewsPageDataFields,
  TypeReviewsPageDataSkeleton,
} from "app/lib/types/contentful/TypeReviewsPageData";
import { HeadingSection } from "app/lib/types/type";
import { AssetFields } from "contentful";

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
      <div className="mt-10 px-24">
        <p className="text-2xl font-bold mb-1">
          {reviewsPageContent.reviewSectionTitle}
        </p>
        <p className="text-gray-500">
          {reviewsPageContent.reviewSectionSubtitle}
        </p>
        <div className="mt-10 grid grid-cols-3 gap-8">
          {allReviews.map((review) => (
            <ReviewCard key={review.id} review={review} showChanges />
          ))}
        </div>
      </div>
      <InfoSection
        title={reviewsPageContent.infoSectionTitle}
        subtitle={reviewsPageContent.infoSectionSubtitle}
        imageCards={imageCards}
        className="mt-20 px-24"
      />
    </>
  );
}
