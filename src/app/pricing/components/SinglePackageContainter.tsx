"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "app/components/Button";
import {
  TypeCurriculumFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { ROUTES } from "app/utils/routes";

import { AssetFields } from "contentful";
import { useRouter } from "next/navigation";
import PackageDetails from "./PackageDetails";
import Divider from "app/components/Divider";
import Curriculum from "./Curriculum";

interface SinglePackageContainerProps {
  packageDetails: TypePackageFields;
  curriculum: TypeCurriculumFields;
  image?: AssetFields;
}

export default function SinglePackageContainer({
  packageDetails,
  curriculum,
  image,
}: SinglePackageContainerProps) {
  const router = useRouter();

  return (
    <div className="mt-30">
      <Button
        label={"All packages"}
        type="ghost"
        iconLeft={<ArrowLeftIcon className="size-4" />}
        onClick={() => router.push(ROUTES.PRICING)}
        className="mx-3 mb-3"
      />
      <PackageDetails packageDetails={packageDetails} image={image} />
      <Divider />
      <Curriculum curriculum={curriculum} />
      <Divider />
    </div>
  );
}
