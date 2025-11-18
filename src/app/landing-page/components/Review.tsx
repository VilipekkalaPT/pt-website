import { CLIENT_REVIEWS } from "app/utils/variables";
import ReviewCard from "./ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";

interface ReviewProps {
  reviews: TypeReviewFields[];
}

export default function Review({ reviews }: ReviewProps) {
  const displayedReviews = reviews.filter((review) => review.showOnLandingPage);

  return (
    <div className="py-6 w-[90%] md:w-4/5 mx-auto md:py-12">
      <p className="heading text-center">{CLIENT_REVIEWS}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        {displayedReviews.map((review: TypeReviewFields) => (
          <ReviewCard
            key={review.id}
            review={review}
            reviewCardType="compact"
          />
        ))}
      </div>
    </div>
  );
}
