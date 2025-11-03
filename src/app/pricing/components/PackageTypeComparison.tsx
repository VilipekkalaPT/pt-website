import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful";
import {
  COMBO,
  DIET,
  FEATURES,
  GYM,
  PackageTypeComparisonEnum,
  PLAN,
} from "app/utils/variables";
import Card from "app/components/Card";
import cn from "classnames";

interface PackageTypeComparisonProps {
  rows: TypePricingPackageTypeComparisionFields[];
}

const columnTitles = [
  {
    id: PackageTypeComparisonEnum.FEATURES,
    label: FEATURES,
  },
  {
    id: PackageTypeComparisonEnum.PLAN,
    label: PLAN,
  },
  {
    id: PackageTypeComparisonEnum.DIET,
    label: DIET,
  },
  {
    id: PackageTypeComparisonEnum.GYM,
    label: GYM,
  },
  {
    id: PackageTypeComparisonEnum.COMBO,
    label: COMBO,
  },
];

export default function PackageTypeComparison({
  rows,
}: PackageTypeComparisonProps) {
  return (
    <Card glassmorphism className="w-full py-8">
      <div className="grid grid-cols-5 gap-8 p-4">
        {columnTitles.map((col) => (
          <p
            key={col.id}
            className={cn({
              "text-center body-strong":
                col.id !== PackageTypeComparisonEnum.FEATURES,
            })}
          >
            {col.label}
          </p>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn("grid grid-cols-5 h-20 gap-8 rounded-lg p-4", {
            "bg-white/10": rowIndex % 2 === 0,
          })}
        >
          {columnTitles.map((col) => (
            <div
              key={`${col.id}-${rowIndex}`}
              className="flex flex-col items-center justify-center"
            >
              <PackageTypeComparisonCell columnId={col.id} row={row} />
            </div>
          ))}
        </div>
      ))}
    </Card>
  );
}

const getBestForContent = (
  columnId: PackageTypeComparisonEnum,
  row: TypePricingPackageTypeComparisionFields
): string => {
  switch (columnId) {
    case PackageTypeComparisonEnum.PLAN:
      return row.planBestFor || "N/A";
    case PackageTypeComparisonEnum.DIET:
      return row.dietBestFor || "N/A";
    case PackageTypeComparisonEnum.GYM:
      return row.gymBestFor || "N/A";
    case PackageTypeComparisonEnum.COMBO:
      return row.comboBestFor || "N/A";
    default:
      return "N/A";
  }
};

const PackageTypeComparisonCell = ({
  columnId,
  row,
}: {
  columnId: PackageTypeComparisonEnum;
  row: TypePricingPackageTypeComparisionFields;
}) => {
  const textStyle = "text-white/70 body-small";

  if (columnId === PackageTypeComparisonEnum.FEATURES) {
    return <p className={cn(textStyle, "self-start")}>{row.features}</p>;
  }

  if (row.availableFor?.includes(columnId)) {
    return (
      <>
        <p className="text-sm">✅</p>
        {columnId === PackageTypeComparisonEnum.COMBO && row.extraText && (
          <span className={cn("ml-2 text-sm", textStyle)}>{row.extraText}</span>
        )}
      </>
    );
  } else if (row.availableFor) {
    return <p className="text-sm">❌</p>;
  }

  const bestForContent = getBestForContent(columnId, row);
  return <p className={textStyle}>{bestForContent}</p>;
};
