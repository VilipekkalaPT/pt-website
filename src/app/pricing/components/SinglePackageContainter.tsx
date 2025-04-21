"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import { TypePackageFields } from "app/lib/types/contentful";
import { ROUTES } from "app/utils/routes";

import { AssetFields } from "contentful";
import { useRouter } from "next/navigation";
import PackageDetails from "./PackageDetails";

interface SinglePackageContainerProps {
  packageDetails: TypePackageFields;
  image?: AssetFields;
}

export default function SinglePackageContainer({
  packageDetails,
  image,
}: SinglePackageContainerProps) {
  const router = useRouter();

  return (
    <div className="mt-30 px-6">
      <Button
        label={"All packages"}
        type="ghost"
        iconLeft={<ArrowLeftIcon className="size-4" />}
        onClick={() => router.push(ROUTES.PRICING)}
      />
      <PackageDetails packageDetails={packageDetails} image={image} />
    </div>
  );
}
