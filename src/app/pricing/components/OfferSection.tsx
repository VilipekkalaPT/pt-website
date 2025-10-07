interface OfferSectionProps {
  offers: string[];
}

const getTextColor = (index: number): string => {
  switch (index) {
    case 0:
    case 1:
      return "text-gray-400";
    case 2:
    case 3:
      return "text-gray-600";
    default:
      return "text-gray-800";
  }
};

export default function OfferSection({ offers }: OfferSectionProps) {
  return (
    <div className="mt-70 w-4/5 mx-auto text-center">
      {offers.map((offer, index) => (
        <p
          key={index}
          className={`mt-2 text-5xl font-semibold ${getTextColor(index)}`}
        >
          {offer}
        </p>
      ))}
    </div>
  );
}
