import { InformationCircleIcon } from "@heroicons/react/24/outline";
import RichTextRenderer from "./RichTextRenderer";
import { InfoCardType } from "app/lib/types/type";

interface InfoCardProps {
  infoCard: InfoCardType[];
}

export default function InfoCard({ infoCard }: InfoCardProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {infoCard.map((card, index) => (
        <div key={index} className="border border-gray-300 p-6 rounded-lg">
          <div className="flex gap-2 items-center mb-2">
            <InformationCircleIcon className="size-8" />
            <p className="text-xl font-semibold">{card.title}</p>
          </div>
          <div className="ml-8">
            <RichTextRenderer
              text={card.content}
              listClassName="list-disc pl-5"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
