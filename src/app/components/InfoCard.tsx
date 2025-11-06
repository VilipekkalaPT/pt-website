import {
  ArrowPathIcon,
  CursorArrowRaysIcon,
  FireIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Card from "./Card";
import RichTextRenderer from "./RichTextRenderer";
import { InfoCardType } from "app/lib/types/type";

interface InfoCardProps {
  infoCards: InfoCardType[];
}

export default function InfoCard({ infoCards }: InfoCardProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {infoCards.map((card, index) => (
        <div
          className="relative w-full h-full flex flex-col items-center"
          key={index}
        >
          <div className="absolute top-0 left-0 transform translate-y-1/2 p-4 rounded-full bg-white/25 z-5 glass-effect flex justify-center items-center">
            {getIcon(card.title)}
          </div>
          <Card glassmorphism className="px-4 py-8 w-full h-full justify-start">
            <p className="heading mb-2">{card.title}</p>
            <RichTextRenderer
              text={card.content}
              listClassName="list-disc pl-5 leading-[1.4]"
              paragraphClassName="leading-[1.4]"
            />
          </Card>
        </div>
      ))}
    </div>
  );
}

const getIcon = (title: string) => {
  const t = title.toLowerCase();
  const style = "size-6 stroke-[1.5]";

  if (t.match(/not for whom/i)) {
    return <HandThumbDownIcon className={style} />;
  } else if (t.match(/for whom/i)) {
    return <HandThumbUpIcon className={style} />;
  } else if (t.match(/why/i)) {
    return <QuestionMarkCircleIcon className={style} />;
  } else if (t.match(/expected results/i)) {
    return <TrophyIcon className={style} />;
  } else if (t.match(/1 - 4/i)) {
    return <CursorArrowRaysIcon className={style} />;
  } else if (t.match(/5 - 8/i)) {
    return <ArrowPathIcon className={style} />;
  } else if (t.match(/9 - 12/i)) {
    return <FireIcon className={style} />;
  } else {
    return <TrophyIcon className={style} />;
  }
};
