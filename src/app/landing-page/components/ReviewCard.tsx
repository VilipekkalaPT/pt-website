import Card, { CardContent, CardFooter, CardHeader } from "app/components/Card";

import { TypeReviewFields } from "app/lib/types/contentful";
import Divider from "app/components/Divider";
import RichTextRenderer from "app/components/RichTextRenderer";
import Rating from "app/components/Rating";

interface ReviewCardProps {
  review: TypeReviewFields;
  showRating?: boolean;
  showChanges?: boolean;
  reviewerNamePostion?: "top" | "bottom";
}

export default function ReviewCard({
  review,
  showRating = false,
  showChanges = false,
  reviewerNamePostion = "top",
}: ReviewCardProps) {
  return (
    <Card key={review.id}>
      <CardHeader className="p-4">
        {showRating && <Rating rating={review.rating} />}
        {reviewerNamePostion === "top" && (
          <ReviewerInfo reviewer={review.reviewer} packages={review.package} />
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-xl font-bold">{review.title}</p>
        <RichTextRenderer
          text={review.content}
          paragraphClassName="mt-2 text-gray-700 text-sm"
        />
        {showChanges && (
          <>
            <Divider />
            {review.changes?.map((change: string, index: number) => {
              return (
                <div
                  key={`${change}-${index}`}
                  className="grid grid-cols-2 mt-4 text-gray-500"
                >
                  <p>{change}</p>
                </div>
              );
            })}
          </>
        )}
      </CardContent>
      {reviewerNamePostion === "bottom" && (
        <CardFooter>
          <Divider />
          <ReviewerInfo
            reviewer={review.reviewer}
            packages={review.package}
            className="mt-4"
          />
        </CardFooter>
      )}
    </Card>
  );
}

function ReviewerInfo({
  reviewer,
  packages,
  className,
}: {
  reviewer: string;
  packages: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-sm text-gray-600 font-bold">{reviewer}</p>
      <p className="text-sm text-gray-500">{packages.join(", ")}</p>
    </div>
  );
}
