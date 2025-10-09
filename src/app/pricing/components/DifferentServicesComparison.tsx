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
    <Card
      glassmorphism
      className="w-full grid grid-cols-4 auto-rows-fr p-8 gap-8"
    >
      {columnHeaders.map((header, index) => (
        <div
          key={index}
          className={cn("font-medium", {
            "text-center": index !== 0,
          })}
        >
          {header}
        </div>
      ))}
      {rows.map((row, index) => (
        <ComparisonRow key={index} row={row} />
      ))}
    </Card>
  );
}

const ComparisonRow = ({
  row,
}: {
  row: TypePricingDifferentServicesComparisonFields;
}) => {
  const commonStyle = "text-white/70 text-sm font-light";
  const textCenterStyle = "text-center";

  return (
    <>
      <p className={commonStyle}>{row.criteria}</p>
      <p className={cn(commonStyle, textCenterStyle)}>{row.slayFitVili}</p>
      <p className={cn(commonStyle, textCenterStyle)}>{row.typicalGymPt}</p>
      <p className={cn(commonStyle, textCenterStyle)}>{row.fitnessApp}</p>
    </>
  );
};
