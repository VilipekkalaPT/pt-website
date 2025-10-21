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
      <div className="relative">
        <HeroSection
          image={image}
          headingSections={headingSections}
          fillImage={false}
        />
        <div className="absolute inset-0 bg-linear-to-b bg-black/40" />
      </div>
      <AllReviews
        title={reviewsPageContent.reviewSectionTitle}
        subtitle={reviewsPageContent.reviewSectionSubtitle}
        allReviews={allReviews}
      />
      <InfoSection
        title={reviewsPageContent.infoSectionTitle}
        subtitle={reviewsPageContent.infoSectionSubtitle}
        className="mt-20 px-24"
      />
    </>
  );
}
