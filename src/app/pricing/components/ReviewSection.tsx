import ReviewCard from "app/landing-page/components/ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";
import { CLIENT_REVIEWS } from "app/utils/variables";

interface ReviewSectionProps {
  reviews: TypeReviewFields[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div className="w-full py-12 flex flex-col items-center">
      <p className="heading">{CLIENT_REVIEWS}</p>
      <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {reviews.length > 0 &&
          reviews.map((review) => (
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
