import {
  ArrowPathIcon,
  CursorArrowRaysIcon,
  FireIcon,
  HandRaisedIcon,
  HandThumbUpIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Card from "./Card";
import RichTextRenderer from "./RichTextRenderer";
import { InfoCardType } from "app/lib/types/type";

interface InfoCardProps {
  infoCard: InfoCardType[];
}

export default function InfoCard({ infoCard }: InfoCardProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {infoCard.map((card, index) => (
        <div className="relative flex-1 flex flex-col items-center" key={index}>
          <div className="absolute top-0 left-0 transform translate-y-1/2 p-4 rounded-full bg-white/25 z-5 glass-effect flex justify-center items-center">
            {getIcon(card.title)}
          </div>
          <Card glassmorphism className="px-4 py-8 flex-1 justify-start">
            <p className="heading mb-2">{card.title}</p>
            <RichTextRenderer
              text={card.content}
              listClassName="list-disc pl-5 leading-[1.4]"
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

  if (t.includes("for whom")) {
    return <HandThumbUpIcon className={style} />;
  } else if (t.includes("not for whom")) {
    return <HandRaisedIcon className={style} />;
  } else if (t.includes("why")) {
    return <QuestionMarkCircleIcon className={style} />;
  } else if (t.includes("expected results")) {
    return <TrophyIcon className={style} />;
  } else if (t.includes("1 - 4")) {
    return <CursorArrowRaysIcon className={style} />;
  } else if (t.includes("5 - 8")) {
    return <ArrowPathIcon className={style} />;
  } else if (t.includes("9 - 12")) {
    return <FireIcon className={style} />;
  } else {
    return <TrophyIcon className={style} />;
  }
};
