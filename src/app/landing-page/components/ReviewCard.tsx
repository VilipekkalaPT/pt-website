import Card, { CardContent, CardHeader } from "app/components/Card";
import { formatDate } from "app/utils/formateDate";
import { Review } from "./Review";

interface ReviewCardProps {
  review: Review;
}

const getFirstLetter = (name: string) => {
  const names = name.split(" ");
  return names.map((name) => name[0].toUpperCase()).join("");
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card key={review.id}>
      <CardHeader
        avatar={
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-500">
            {getFirstLetter(review.reviewer)}
          </div>
        }
        title={review.reviewer}
        subTitle={formatDate(review.reviewDate)}
      />
      <CardContent className="mt-4">
        <p>{review.body}</p>
      </CardContent>
    </Card>
  );
}
