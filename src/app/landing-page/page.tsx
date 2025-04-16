import Header from "./components/Header/Header";

import { getAssets } from "app/lib/contentful";
import Image from "next/image";
import OverlayText from "./components/OverlayText/OverlayText";
import { getEntries } from "app/lib/contentful";
import { BannerContentSkeleton, NavigationSkeleton } from "app/lib/types";
import Footer from "./components/Footer/Footer";
import Divider from "app/components/Divider";

const BANNER = "banner";

export default async function LandingPage() {
  const images = await getAssets();
  const navigations = await getEntries<NavigationSkeleton>("navigation");
  const bannerContent = await getEntries<BannerContentSkeleton>(
    "bannerContent"
  );

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
      <Divider />
      <Footer />
    </>
  );
}
