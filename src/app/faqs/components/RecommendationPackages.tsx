import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Chip from "app/components/Chip";
import {
  TypePackageFields,
  TypePackagesPageDataFields,
} from "app/lib/types/contentful";
import { ROUTES } from "app/utils/routes";
import { capitalizeFirstLetter } from "app/utils/utils";
import { RECOMMENDATION_TITLE, SEE_ALL } from "app/utils/variables";

interface RecommendationPackagesProps {
  packages: (TypePackageFields | TypePackagesPageDataFields)[];
}

const isTypePackageFields = (p: unknown): p is TypePackageFields => {
  if (p === null || typeof p !== "object") {
    return false;
  }

  return (
    "price" in p && typeof (p as Record<string, unknown>).price === "number"
  );
};

export default function RecommendationPackages({
  packages,
}: RecommendationPackagesProps) {
  if (!packages || packages.length === 0) return null;

  return (
    <div className="flex items-center gap-1 mt-4">
      <p>{RECOMMENDATION_TITLE}</p>
      <div className="flex flex-wrap gap-2 ml-2">
        {packages.map((p, index) => (
          <ChipComponent key={index} package={p} />
        ))}
      </div>
    </div>
  );
}

const ChipComponent = ({
  package: pkg,
}: {
  package: TypePackageFields | TypePackagesPageDataFields;
}) => {
  const iconClassName = "size-3 text-gray-100";

  if (isTypePackageFields(pkg)) {
    return (
      <Chip
        key={pkg.id}
        variant="primary"
        label={capitalizeFirstLetter(pkg.name)}
        iconRight={<ArrowUpRightIcon className={iconClassName} />}
        href={`${ROUTES.PRICING}/${pkg.type}-package/${pkg.slug}`}
      />
    );
  }

  return (
    <Chip
      key={pkg.title}
      variant="primary"
      label={`${SEE_ALL} ${pkg.title.toLowerCase()}`}
      iconRight={<ArrowUpRightIcon className={iconClassName} />}
      href={`${ROUTES.PRICING}/${pkg.slug}`}
    />
  );
};
