import { TypePricingDifferentServicesComparisonFields } from "app/lib/types/contentful/TypePricingDifferentServicesComparison";
import {
  DIFFERENT_SERVICES_CRITERIA,
  DIFFERENT_SERVICES_FITNESS_APP,
  DIFFERENT_SERVICES_SLAYFITVILI,
  DIFFERENT_SERVICES_TYPICAL_GYM_PT,
} from "app/utils/variables";
import Card from "app/components/Card";
import cn from "classnames";

interface DifferentServicesComparisonProps {
  rows: TypePricingDifferentServicesComparisonFields[];
}

const columnHeaders = [
  DIFFERENT_SERVICES_CRITERIA,
  DIFFERENT_SERVICES_SLAYFITVILI,
  DIFFERENT_SERVICES_TYPICAL_GYM_PT,
  DIFFERENT_SERVICES_FITNESS_APP,
];

export default function DifferentServicesComparison({
  rows,
}: DifferentServicesComparisonProps) {
  return (
    <Card glassmorphism className="w-full py-8">
      <div className="grid grid-cols-4 px-8 pb-4">
        {columnHeaders.map((header, index) => (
          <div
            key={index}
            className={cn("font-medium body-strong", {
              "text-center": index !== 0,
            })}
          >
            {header}
          </div>
        ))}
      </div>
      {rows.map((row, index) => (
        <ComparisonRow key={index} row={row} index={index} />
      ))}
    </Card>
  );
}

const ComparisonRow = ({
  row,
  index,
}: {
  row: TypePricingDifferentServicesComparisonFields;
  index: number;
}) => {
  const commonStyle = "text-white/70 body-small";
  const textCenterStyle = "text-center";

  return (
    <div
      className={cn("grid grid-cols-4 gap-8 h-22 rounded-lg p-8", {
        "bg-white/10": index % 2 === 0,
      })}
    >
      <p className={commonStyle}>{row.criteria}</p>
      <p className={cn(commonStyle, textCenterStyle)}>{row.slayFitVili}</p>
      <p className={cn(commonStyle, textCenterStyle)}>{row.typicalGymPt}</p>
      <p className={cn(commonStyle, textCenterStyle)}>{row.fitnessApp}</p>
    </div>
  );
};
