import Image from "next/image";
import cn from "classnames";
import { TrainingSessionData } from "@/app/lib/types/type";
import Card from "app/components/Card";

interface ExpandableHorizontalCardProps {
  trainingSessionData: TrainingSessionData;
  index: number;
  expandedIndex: number;
  setExpandedIndex: (index: number) => void;
}

export default function ExpandableHorizontalCard({
  trainingSessionData,
  index,
  expandedIndex,
  setExpandedIndex,
}: ExpandableHorizontalCardProps) {
  const isExpanded = expandedIndex === index;

  const { title, description, imageUrl } = trainingSessionData;

  return (
    <Card
      className={cn(
        "flex flex-col rounded-lg transition-all duration-500 ease-in-out cursor-pointer overflow-hidden",
        isExpanded ? "w-[40rem]" : "w-[15rem]"
      )}
      glassmorphism
      onMouseEnter={() => setExpandedIndex(index)}
    >
      <div className="h-100 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
        />
      </div>
      <div className="h-32 flex flex-col gap-2 px-6 py-4">
        <p className="leading-[1.4] break-words whitespace-normal">{title}</p>
        {isExpanded && (
          <p className="body-small text-white/70">{description}</p>
        )}
      </div>
    </Card>
  );
}
