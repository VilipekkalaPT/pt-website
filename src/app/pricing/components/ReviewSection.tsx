import ReviewCard from "app/landing-page/components/ReviewCard";
import { TypeReviewFields } from "app/lib/types/contentful";
import { CLIENT_REVIEWS } from "app/utils/variables";

interface ReviewSectionProps {
  reviews: TypeReviewFields[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div className="w-full mt-30 flex flex-col items-center">
      <p className="heading mb-10">{CLIENT_REVIEWS}</p>
      <div className="grid grid-cols-3 gap-8">
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
