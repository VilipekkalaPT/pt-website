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
import Chip from "app/components/Chip";
import ReadMore from "app/client-spotlights/components/ReadMore";

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
        <div className="min-h-[3rem]">
          <p className="font-bold">{reviewer}</p>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
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
        <div className="mt-4 flex flex-wrap items-end gap-2 min-h-[4rem] max-h-[6rem]">
          {changes?.map((change: string, index: number) => {
            return <Chip key={index} color="gray" label={change} />;
          })}
        </div>
      )}
    </CardFooter>
  );
};

const ReviewImages = ({
  images,
  title,
}: {
  images: AssetFields[];
  title: string;
}) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-4 min-h-[33rem]">
      {images.length === 1 ? (
        <Image
          src={getAssetUrl(images[0])}
          alt={title}
          className="rounded-lg w-full h-auto object-cover"
          width={images[0].file?.details.image?.width || 400}
          height={images[0].file?.details.image?.height || 300}
        />
      ) : (
        <Carousel images={images} />
      )}
    </div>
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
          <p className="text-xl font-bold min-h-[4rem]">{title}</p>
          <RichTextRenderer
            text={content}
            paragraphClassName="mt-2 text-gray-700 text-sm"
          />
        </>
      )}
      {reviewCardType === "full" && (
        <>
          <Rating rating={rating} />
          <ReviewImages images={imageFields} title={title} />
          <p className="mt-4 text-xl font-bold min-h-[4rem] line-clamp-2">
            {title}
          </p>
          <ReadMore document={content} />
          <Divider />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{PACKAGE_TITLE}</span>
            <span>{review.package.slice(0, 2).join(", ")}</span>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-400">
            <span>{DURATION}</span>
            <span>{review.duration}</span>
          </div>
        </>
      )}
    </CardContent>
  );
};
