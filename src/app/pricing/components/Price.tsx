import cn from "classnames";
import { CURRENCY, FROM, VAT_INCLUDED } from "app/utils/variables";
import { TypeSessionOptionFields } from "app/lib/types/contentful";
import { getMinPrice } from "app/utils/utils";

interface PriceProps {
  price: number;
  priceUnit: string;
  priceOptions?: TypeSessionOptionFields[];
  variant?: "small" | "large";
  className?: string;
}

export default function Price({
  price,
  priceUnit,
  priceOptions,
  variant = "small",
  className,
}: PriceProps) {
  const minPrice = getMinPrice(priceOptions);
  const displayedPrice = minPrice ?? price;

  const textStyle = cn("font-bold", variant === "large" ? "text-4xl" : "");

  return (
    <div className={cn("flex items-baseline", className)}>
      <PriceLabel hasMinPrice={!!minPrice} />
      <p className={textStyle}>
        <span>{CURRENCY}</span>
        <span>{displayedPrice}</span>
      </p>
      <PriceUnit unit={priceUnit} />
    </div>
  );
}

const PriceLabel = ({ hasMinPrice }: { hasMinPrice: boolean }) =>
  hasMinPrice ? <p className="mr-1 font-bold">{FROM}</p> : null;

const PriceUnit = ({ unit }: { unit: string }) => (
  <p className="font-bold ml-1">
    <span className="mr-1">/</span>
    <span>{unit}</span>
    <span className="text-sm text-gray-400 ml-1">({VAT_INCLUDED})</span>
  </p>
);
