import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { TypePricingPackageTypeComparisionFields } from "app/lib/types/contentful";
import {
  COMBO,
  DIET,
  FEATURES,
  GYM,
  PackageTypeComparisonEnum,
  PLAN,
} from "app/utils/variables";
import cn from "classnames";

interface PackageTypeComparisonProps {
  title: string;
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
  title,
  rows,
}: PackageTypeComparisonProps) {
  return (
    <div className="mt-35 px-48 grid grid-cols-5">
      <p className="col-span-5 text-2xl font-semibold mb-6 text-center">
        {title}
      </p>
      {columnTitles.map((col) => (
        <div key={col.id}>
          <p className="font-semibold">{col.label}</p>
          {rows.map((row, index) => (
            <div key={`${col.id}-${index}`} className="mt-6">
              {PackageTypeComparisonCell({ columnId: col.id, row })}
            </div>
          ))}
        </div>
      ))}
    </div>
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
  const textStyle = "text-gray-500";

  if (columnId === PackageTypeComparisonEnum.FEATURES) {
    return <p className={textStyle}>{row.features}</p>;
  }

  if (row.availableFor?.includes(columnId)) {
    return (
      <div className="flex items-center">
        <CheckCircleIcon className="size-6 text-green-700" />
        {columnId === PackageTypeComparisonEnum.COMBO && row.extraText && (
          <span className={cn("ml-1 text-sm", textStyle)}>{row.extraText}</span>
        )}
      </div>
    );
  } else if (row.availableFor) {
    return <XCircleIcon className="size-6 text-red-700" />;
  }

  const bestForContent = getBestForContent(columnId, row);
  return <p className={textStyle}>{bestForContent}</p>;
};
