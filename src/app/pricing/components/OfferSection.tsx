interface OfferSectionProps {
  offers: string[];
}

const getTextColor = (index: number): string => {
  switch (index) {
    case 0:
    case 1:
      return "text-text-neutral-tertiary";
    case 2:
      return "text-text-neutral-default";
    default:
      return "text-text-neutral-tertiary";
  }
};

export default function OfferSection({ offers }: OfferSectionProps) {
  return (
    <div className="mt-50 w-4/5 mx-auto text-center">
      {offers.map((offer, index) => (
        <p
          key={index}
          className={`mt-2 text-2xl font-medium ${getTextColor(index)}`}
        >
          {offer}
        </p>
      ))}
    </div>
  );
}
