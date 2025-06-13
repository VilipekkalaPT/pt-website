import { TypePricingDifferentServicesComparisonFields } from "app/lib/types/contentful/TypePricingDifferentServicesComparison";
import {
  DIFFERENT_SERVICES_CRITERIA,
  DIFFERENT_SERVICES_FITNESS_APP,
  DIFFERENT_SERVICES_SLAYFITVILI,
  DIFFERENT_SERVICES_TYPICAL_GYM_PT,
} from "app/utils/variables";
import cn from "classnames";

interface DifferentServicesComparisonProps {
  title: string;
  subtitle: string;
  rows: TypePricingDifferentServicesComparisonFields[];
}

const columnHeaders = [
  DIFFERENT_SERVICES_CRITERIA,
  DIFFERENT_SERVICES_SLAYFITVILI,
  DIFFERENT_SERVICES_TYPICAL_GYM_PT,
  DIFFERENT_SERVICES_FITNESS_APP,
];

export default function DifferentServicesComparison({
  title,
  subtitle,
  rows,
}: DifferentServicesComparisonProps) {
  return (
    <div className="mt-35 px-48 flex flex-col items-center">
      <p className="text-2xl font-semibold">{title}</p>
      <p className="mt-1 text-xl text-gray-400">{subtitle}</p>
      <div className="grid grid-cols-4 mt-12 w-full">
        {columnHeaders.map((header, index) => (
          <div
            key={index}
            className="p-4 font-bold text-center border-b border-gray-800 bg-gray-800 text-white"
          >
            {header}
          </div>
        ))}

        {rows.map((row, index) => (
          <ComparisonRow key={index} row={row} isEven={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

const ComparisonRow = ({
  row,
  isEven,
}: {
  row: TypePricingDifferentServicesComparisonFields;
  isEven: boolean;
}) => {
  const commonStyle = "p-4 text-sm flex items-center";
  const style = `${commonStyle} ${isEven ? "bg-gray-50" : "bg-white"}`;

  return (
    <>
      <div className={cn("font-semibold", style)}>{row.criteria}</div>
      <div className={cn(" bg-gray-800 text-white", commonStyle)}>
        {row.slayFitVili}
      </div>
      <div className={cn("text-gray-600", style)}>{row.typicalGymPt}</div>
      <div className={cn("text-gray-600", style)}>{row.fitnessApp}</div>
    </>
  );
};
