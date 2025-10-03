import { TypeKickOffProcessFields } from "app/lib/types/contentful";
import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  FireIcon,
  FlagIcon,
  GiftIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

interface TimelineCard {
  process: TypeKickOffProcessFields[];
}

export default function TimelineComponent({ process }: TimelineCard) {
  const midIndex = Math.ceil(process.length / 2);
  const row1 = process.slice(0, midIndex);
  const row2 = process.slice(midIndex);
  const rows = [row1, row2];

  const commonStyle = "border-border-default-secondary border-dashed";
  const verticalLineStyle = "h-30 border-l-2";
  const horizontalLineStyle = "w-60 border-t-2";

  return (
    <div className="mt-15 relative space-y-36">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="relative flex items-center justify-around"
        >
          {rowIndex === 0 ? (
            <div className="absolute top-1/2 left-0 right-[calc(15%)] border-t-2 border-dashed border-border-default-secondary z-0" />
          ) : (
            <div className="absolute top-1/2 left-[calc(15%)] right-0 border-t-2 border-dashed border-border-default-secondary z-0" />
          )}

          {row.map((card, index) => (
            <div
              key={index}
              className="relative w-[420px] h-[150px] flex flex-col items-center justify-center bg-primary border border-white/20 rounded-xl p-6 z-10"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-full flex items-center justify-center p-4">
                {getIcon(card.id)}
              </div>
              <p className="text-xl font-medium">{card.title}</p>
              <p className="font-light">{card.description}</p>
            </div>
          ))}

          {rowIndex === 0 && (
            <div className="absolute top-1/2 right-[calc(3%)] flex flex-col items-start z-0">
              <div
                className={`${commonStyle} ${horizontalLineStyle} self-end`}
              />
              <div className={`${commonStyle} ${verticalLineStyle} self-end`} />
              <div className={`${commonStyle} w-450 border-t-2`} />
              <div className={`${commonStyle} ${verticalLineStyle}`} />
              <div className={`${commonStyle} ${horizontalLineStyle}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const getIcon = (cardId: number) => {
  const style = "w-8 h-8";

  switch (cardId) {
    case 0:
      return <ChatBubbleLeftRightIcon className={style} />;
    case 1:
      return <FireIcon className={style} />;
    case 2:
      return <ClipboardDocumentListIcon className={style} />;
    case 3:
      return <MegaphoneIcon className={style} />;
    case 4:
      return <ChatBubbleLeftRightIcon className={style} />;
    case 5:
      return <GiftIcon className={style} />;

    default:
      return <ChatBubbleLeftRightIcon className={style} />;
  }
};
