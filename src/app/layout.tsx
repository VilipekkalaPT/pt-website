import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Red_Rose, Righteous } from "next/font/google";
import "./globals.css";
import { getEntries, getImageByTag } from "./lib/contentfulDataService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { TypeNavigationSkeleton } from "./lib/types/contentful/TypeNavigation";
import { LOGO } from "./utils/variables";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});

const redRose = Red_Rose({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-red-rose",
});

export const metadata: Metadata = {
  title: "SlayFitVili",
  description: "A gateway to the world of fitness and wellness.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigations, image] = await Promise.all([
    await getEntries<TypeNavigationSkeleton>("navigation"),
    await getImageByTag(LOGO),
  ]);

  return (
    <html lang="en">
      <body className={`${redRose.className} ${righteous.variable}`}>
        <BackgroundWrapper>
          <Header navigations={navigations} logo={image} />
          {children}
          <SpeedInsights />
          <Footer logo={image} />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
