import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getEntries } from "./lib/contentfulDataService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { TypeNavigationSkeleton } from "./lib/types/contentful/TypeNavigation";
import { TypeFooterColumnSkeleton } from "./lib/types/contentful/TypeFooterColumn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const [navigations, footerColumns] = await Promise.all([
    await getEntries<TypeNavigationSkeleton>("navigation"),
    await getEntries<TypeFooterColumnSkeleton>("footerColumn"),
  ]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header navigations={navigations} />
        {children}
        <SpeedInsights />
        <Footer footerColumns={footerColumns} />
      </body>
    </html>
  );
}
