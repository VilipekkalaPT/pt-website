import Header from "./components/Header";

import { getAssets } from "app/lib/contentful";
import Image from "next/image";
import OverlayText from "./components/OverlayText";
import { getEntries } from "app/lib/contentful";
import {
  BannerContentSkeleton,
  FooterColumnSkeleton,
  KickOffProcessSkeleton,
  NavigationSkeleton,
  ReviewSkeleton,
} from "app/lib/types";
import Footer from "./components/Footer";
import Divider from "app/components/Divider";
import KickOffProcess from "./components/KickOffProcess";
import Review from "./components/Review";

const BANNER = "landingPage_banner";

export default async function LandingPage() {
  const images = await getAssets();
  const navigations = await getEntries<NavigationSkeleton>("navigation");
  const bannerContent = await getEntries<BannerContentSkeleton>(
    "bannerContent"
  );
  const footerColumns = await getEntries<FooterColumnSkeleton>("footerColumn");
  const kickOffProcess = await getEntries<KickOffProcessSkeleton>(
    "kickOffProcess"
  );
  const reviews = await getEntries<ReviewSkeleton>("review");

  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;

  return (
    <>
      <Header navigations={navigations} />
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
      <Footer footerColumns={footerColumns} />
    </>
  );
}
