import { CURRENCY } from "app/utils/variables";

interface PriceProps {
  price: number;
  priceUnit: string;
}

export default function Price({ price, priceUnit }: PriceProps) {
  return (
    <div className="flex items-end my-4">
      <p className="text-4xl font-bold mr-1">
        {CURRENCY}
        {price}
      </p>
      <span>/ {priceUnit}</span>
    </div>
  );
}
