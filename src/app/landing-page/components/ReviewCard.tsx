import Image from "next/image";
import Card, { CardContent, CardFooter, CardHeader } from "app/components/Card";
import { TypeReviewFields } from "app/lib/types/contentful";
import Divider from "app/components/Divider";
import RichTextRenderer from "app/components/RichTextRenderer";
import Rating from "app/components/Rating";
import { getAssetUrl } from "app/utils/utils";
import { AssetFields } from "contentful";
import Carousel from "@/app/about/components/Carousel";
import { DURATION, PURCHASED } from "app/utils/variables";
import Chip from "app/components/Chip";
import ReadMore from "app/client-spotlights/components/ReadMore";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

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
    <Card
      key={review.id}
      className="bg-black/50 border border-border-default-primary rounded-lg p-6"
    >
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
    <CardHeader>
      {reviewCardType === "compact" && (
        <Rating rating={rating} className="mb-6" />
      )}
      {reviewCardType === "full" && (
        <div className="grid grid-cols-2 mb-4">
          <div>
            <p className="body-strong text-white/70">{reviewer}</p>
            <p className="leading-[1.4] text-white/40">{date}</p>
          </div>
          <Rating rating={rating} className="justify-self-end items-start" />
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
    <>
      {reviewCardType === "compact" && (
        <CardFooter className="p-0">
          <Divider className="mt-6 flex-shrink-0" />
          <div className="mt-6 flex flex-col flex-grow min-h-[4rem]">
            <p className="body-strong text-white/70">{reviewer}</p>
            <p className="leading-[1.4] text-white/40 break-words whitespace-normal">
              {reviewPackage.join(", ")}
            </p>
          </div>
        </CardFooter>
      )}
      {reviewCardType === "full" && (
        <CardFooter className="mt-4 p-0 flex flex-wrap items-end gap-4 min-h-[2rem]">
          {changes?.map((change: string, index: number) => {
            return (
              <Chip key={index} color="ghost" glassmorphism label={change} />
            );
          })}
        </CardFooter>
      )}
    </>
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
    <div className="min-h-[33rem]">
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
  const { title, content, images } = review;
  const imageFields =
    (images?.map((image) => image.fields) as AssetFields[]) ?? [];

  return (
    <CardContent className="flex-1 flex flex-col p-0">
      {reviewCardType === "compact" && (
        <>
          <p className="heading">{title}</p>
          <RichTextRenderer text={content} paragraphClassName="leading-[1.4]" />
        </>
      )}
      {reviewCardType === "full" && (
        <>
          <ReviewImages images={imageFields} title={title} />
          <p className="mt-4 heading line-clamp-2">{title}</p>
          <ReadMore document={content} />
          <Divider className="my-4" />
          <div className="py-2 flex justify-between leading-[1.4] text-white/70">
            <div className="flex items-center justify-center gap-1">
              <span>{PURCHASED}</span>
              <CheckBadgeIcon className="size-6 text-green-light" />
            </div>
            <span>{review.package.slice(0, 2).join(", ")}</span>
          </div>
          <div className="py-2 flex justify-between leading-[1.4] text-white/70">
            <span>{DURATION}</span>
            <span>{review.duration}</span>
          </div>
        </>
      )}
    </CardContent>
  );
};
