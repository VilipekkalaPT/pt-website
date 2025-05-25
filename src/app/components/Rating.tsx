import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlinedStarIcon } from "@heroicons/react/24/outline";
import HalfStarIcon from "./HalfStarIcon";

interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps) {
  const stars = Math.floor(rating);
  const starArray = Array.from({ length: stars }, (_, i) => i + 1);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - stars - halfStar;
  const emptyStarArray = Array.from({ length: emptyStars }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      {starArray.map((star) => (
        <SolidStarIcon key={star} className="size-4" />
      ))}
      {halfStar > 0 && <HalfStarIcon />}
      {emptyStarArray.map((star) => (
        <OutlinedStarIcon key={star} className="size-4" />
      ))}
    </div>
  );
}
