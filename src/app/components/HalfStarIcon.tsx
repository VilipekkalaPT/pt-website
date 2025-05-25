import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlinedStarIcon } from "@heroicons/react/24/outline";

export default function HalfStarIcon() {
  return (
    <div className="relative inline-block w-4 h-4">
      <OutlinedStarIcon className="absolute top-0 left-0" />
      <SolidStarIcon style={{ clipPath: "inset(0 50% 0 0)" }} />
    </div>
  );
}
