import {
  TypeCurriculumFields,
  TypePackageFields,
} from "app/lib/types/contentful";
import { AssetFields } from "contentful";
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
  return (
    <div className="mt-30">
      <PackageDetails packageDetails={packageDetails} image={image} />
      <Divider />
      <Curriculum curriculum={curriculum} />
      <Divider />
    </div>
  );
}
