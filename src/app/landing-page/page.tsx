import Header from "./components/Header/Header";

import styles from "./page.module.css";
import { getAssets } from "app/lib/contentful";
import Image from "next/image";
import OverlayText from "./components/OverlayText/OverlayText";

const BANNER = "banner";

export default async function LandingPage() {
  const images = await getAssets();
  const banner = images.find((image) => image.title === BANNER);
  const bannerUrl = `https:${banner?.file?.url ?? ""}`;

  console.log(bannerUrl);

  return (
    <div className={styles.landingPage}>
      <Header />
      <div className={styles.bannerContainer}>
        <Image
          src={bannerUrl}
          alt={BANNER}
          width={banner?.file?.details.image?.width}
          height={banner?.file?.details.image?.height}
          className={styles.banner}
        />
        <OverlayText />
      </div>
    </div>
  );
}
