import Image from "next/image";
import Card, { CardContent, CardFooter, CardHeader } from "app/components/Card";
import { TypeReviewFields } from "app/lib/types/contentful";
import Divider from "app/components/Divider";
import RichTextRenderer from "app/components/RichTextRenderer";
import Rating from "app/components/Rating";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Carousel from "app/components/Carousel";
import { DURATION, PACKAGE_TITLE } from "app/utils/variables";
import NoImageAvailable from "app/components/NoImageAvailable";
import Chip from "app/components/Chip";
import ReadMoreRichText from "app/client-spotlights/components/ReadMore";

interface ReviewCardComponentProps {
  reviewCardType: "full" | "compact";
  review: TypeReviewFields;
}

interface ReviewCardProps {
  review: TypeReviewFields;
  reviewCardType: "full" | "compact";
}

export default function ReviewCard({
  review,
  reviewCardType,
}: ReviewCardProps) {
  return (
    <Card key={review.id}>
      <ReviewCardHeader reviewCardType={reviewCardType} review={review} />
      <ReviewCardContent reviewCardType={reviewCardType} review={review} />
      <ReviewCardFooter reviewCardType={reviewCardType} review={review} />
    </Card>
  );
}

const ReviewCardHeader: React.FC<ReviewCardComponentProps> = ({
  reviewCardType,
  review,
}) => {
  const { rating, reviewer, date } = review;

  return (
    <CardHeader className="px-4 mt-4">
      {reviewCardType === "compact" && <Rating rating={rating} />}
      {reviewCardType === "full" && (
        <>
          <p className="font-bold">{reviewer}</p>
          <p className="text-sm text-gray-400">{date}</p>
        </>
      )}
    </CardHeader>
  );
};

const ReviewCardFooter: React.FC<ReviewCardComponentProps> = ({
  reviewCardType,
  review,
}) => {
  const { reviewer, package: reviewPackage, changes } = review;

  return (
    <CardFooter>
      {reviewCardType === "compact" && (
        <>
          <Divider />
          <div className="flex flex-col mt-2">
            <p className="text-sm text-gray-600 font-bold">{reviewer}</p>
            <p className="text-sm text-gray-500">{reviewPackage.join(", ")}</p>
          </div>
        </>
      )}
      {reviewCardType === "full" && (
        <div className="flex items-center min-h-[8rem]">
          {changes?.map((change: string, index: number) => {
            return <Chip key={index} color="gray" label={change} />;
          })}
        </div>
      )}
    </CardFooter>
  );
};

const ReviewCardContent: React.FC<ReviewCardComponentProps> = ({
  reviewCardType,
  review,
}) => {
  const { title, content, rating, images } = review;
  const imageFields =
    (images?.map((image) => image.fields) as AssetFields[]) ?? [];

  return (
    <CardContent className="flex-1 flex flex-col">
      {reviewCardType === "compact" && (
        <>
          <p className="text-xl font-bold">{title}</p>
          <RichTextRenderer
            text={content}
            paragraphClassName="mt-2 text-gray-700 text-sm"
          />
        </>
      )}
      {reviewCardType === "full" && (
        <div className="mt-4">
          <Rating rating={rating} />
          <div className="mt-4 min-h-[33rem]">
            {imageFields.length > 1 && <Carousel images={imageFields} />}
            {imageFields.length === 0 && <NoImageAvailable />}
            {imageFields.length === 1 && (
              <Image
                src={getAssetUrl(imageFields[0])}
                alt={title}
                className="mt-4 rounded-lg"
                width={imageFields[0].file?.details.image?.width}
                height={imageFields[0].file?.details.image?.height}
              />
            )}
          </div>
          <p className="mt-4 text-xl font-bold min-h-[4rem] line-clamp-2">
            {title}
          </p>
          <ReadMoreRichText document={content} />
          <Divider />
          <div className="text-sm text-gray-400 flex justify-between">
            <span>{PACKAGE_TITLE}</span>
            <span>{review.package[0]}</span>
          </div>
          <div className="mt-4 text-sm text-gray-400 flex justify-between">
            <span>{DURATION}</span>
            <span>{review.duration}</span>
          </div>
        </div>
      )}
    </CardContent>
  );
};
