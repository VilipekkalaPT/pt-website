import { getAssets } from "app/lib/contentful";
import Image from "next/image";
import OverlayText from "./components/OverlayText";
import { getEntries } from "app/lib/contentful";
import {
  BannerContentSkeleton,
  KickOffProcessSkeleton,
  ReviewSkeleton,
} from "app/lib/types";
import Divider from "app/components/Divider";
import KickOffProcess from "./components/KickOffProcess";
import Review from "./components/Review";
import { BANNER } from "app/utils/variables";

export default async function LandingPage() {
  const [images, bannerContent, kickOffProcess, reviews] = await Promise.all([
    getAssets(),
    getEntries<BannerContentSkeleton>("bannerContent"),
    getEntries<KickOffProcessSkeleton>("kickOffProcess"),
    getEntries<ReviewSkeleton>("review"),
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
