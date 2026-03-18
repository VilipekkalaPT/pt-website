import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';  
import { Red_Rose, Righteous } from "next/font/google";
import { getEntries } from "./lib/contentfulDataService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundWrapper from "./components/BackgroundWrapper";
import { TypeNavigationSkeleton } from "./lib/types/contentful/TypeNavigation";
import { TypeFooterSkeleton } from "./lib/types/contentful/TypeFooter";

import "./globals.css";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
});

const redRose = Red_Rose({
  weight: ["300", "400", "500", "600", "700"],
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
  const [navigations, footer] = await Promise.all([
    await getEntries<TypeNavigationSkeleton>("navigation"),
    await getEntries<TypeFooterSkeleton>("footer"),
  ]);

  return (
    <html lang="en">
      <body className={`${redRose.className} ${righteous.variable}`}>
        <BackgroundWrapper>
          <Header navigations={navigations} />
          {children}
          <SpeedInsights />
          <Analytics /> 
          <Footer footerLinks={footer} />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
