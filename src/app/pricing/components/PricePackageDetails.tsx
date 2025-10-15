import { getSavedAmountText } from "app/utils/utils";
import { CURRENCY, VAT_INCLUDED } from "app/utils/variables";
import { useMemo } from "react";

interface PricePackageDetailsProps {
  price: number;
  priceUnit: string;
  savedAmount?: number;
}

export function PricePackageDetails({
  price,
  priceUnit,
  savedAmount,
}: PricePackageDetailsProps) {
  const savedAmountText = useMemo(
    () => getSavedAmountText(savedAmount),
    [savedAmount]
  );

  return (
    <div className="flex gap-1">
      <span className="text-2xl font-bold">{CURRENCY}</span>
      <span className="text-5xl font-bold">{price}</span>
      <div className="text-sm leading-[1.8]">
        <div className="flex gap-1 -mt-1">
          <p> / {priceUnit}</p>
          <p className="text-green-light">{savedAmountText}</p>
        </div>
        <p className="text-text-default-tertiary">({VAT_INCLUDED})</p>
      </div>
    </div>
  );
}
