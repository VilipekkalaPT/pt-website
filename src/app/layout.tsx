import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getEntries } from "./lib/contentful";
import { FooterColumnSkeleton, NavigationSkeleton } from "./lib/types";
import Header from "./landing-page/components/Header";
import Footer from "./landing-page/components/Footer";

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
    await getEntries<NavigationSkeleton>("navigation"),
    await getEntries<FooterColumnSkeleton>("footerColumn"),
  ]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header navigations={navigations} />
        {children}
        <Footer footerColumns={footerColumns} />
      </body>
    </html>
  );
}
