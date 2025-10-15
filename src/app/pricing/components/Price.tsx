import { CURRENCY, VAT_INCLUDED } from "app/utils/variables";
import { TypeSessionOptionFields } from "app/lib/types/contentful";
import { useMemo } from "react";
import { getSavedAmountText } from "app/utils/utils";

interface PriceProps {
  price: number;
  priceUnit: string;
  priceOptions?: TypeSessionOptionFields[];
  savedAmount?: number;
}

export default function Price({
  price,
  priceUnit,
  priceOptions,
  savedAmount,
}: PriceProps) {
  return (
    <div>
      <PriceUnit
        displayedPrice={price}
        unit={priceUnit}
        savedAmount={savedAmount}
        priceOptions={priceOptions}
      />
      <p className="body-strong text-white/40">({VAT_INCLUDED})</p>
    </div>
  );
}

const PriceUnit = ({
  displayedPrice,
  unit,
  savedAmount,
  priceOptions,
}: {
  displayedPrice: number;
  unit: string;
  savedAmount?: number;
  priceOptions?: TypeSessionOptionFields[];
}) => {
  const priceText = `${CURRENCY}${displayedPrice} / ${unit}`;

  const savedAmountText = useMemo(
    () => getSavedAmountText(savedAmount, priceOptions),
    [savedAmount, priceOptions]
  );

  return (
    <div className="flex gap-2 body-strong">
      <p>{priceText}</p>
      {!!savedAmountText && (
        <p className="text-green-light">{`${savedAmountText}`}</p>
      )}
    </div>
  );
};
