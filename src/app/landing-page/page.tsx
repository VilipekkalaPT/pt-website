import { getAssets } from "app/lib/contentfulDataService";
import Image from "next/image";
import OverlayText from "./components/OverlayText";
import { getEntries } from "app/lib/contentfulDataService";
import Divider from "app/components/Divider";
import KickOffProcess from "./components/KickOffProcess";
import Review from "./components/Review";
import { BANNER } from "app/utils/variables";
import { TypeBannerContentSkeleton } from "app/lib/types/contentful/TypeBannerContent";
import { TypeKickOffProcessSkeleton } from "app/lib/types/contentful/TypeKickOffProcess";
import { TypeReviewSkeleton } from "app/lib/types/contentful/TypeReview";

export default async function LandingPage() {
  const [images, bannerContent, kickOffProcess, reviews] = await Promise.all([
    getAssets(),
    getEntries<TypeBannerContentSkeleton>("bannerContent"),
    getEntries<TypeKickOffProcessSkeleton>("kickOffProcess"),
    getEntries<TypeReviewSkeleton>("review"),
  ]);

  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;

  return (
    <>
      <div className="w-full relative inline-block">
        <Image
          src={bannerUrl}
          alt={BANNER}
          width={banner?.file?.details.image?.width}
          height={banner?.file?.details.image?.height}
          className="block w-full h-auto"
        />
        <OverlayText bannerContent={bannerContent} />
      </div>
      <Review reviews={reviews} />
      <Divider />
      <KickOffProcess process={kickOffProcess} />
      <Divider />
    </>
  );
}
