import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/nav/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yogianyathra.com"),
  title: {
    default: "Yogi & Yathra | Travel, Spiritual Journeys & Wellness",
    template: "%s | Yogi & Yathra",
  },
  description:
    "Discover sacred destinations, curated tour packages, and transformative travel experiences with Yogi & Yathra.",
  keywords: [
    "Yogi & Yathra",
    "Yathra",
    "Spiritual Travel",
    "Pilgrimage Tours",
    "India Travel",
    "Tour Packages",
    "Heritage Tours",
    "Wellness Journeys",
  ],
  authors: [{ name: "Yogi & Yathra" }],
  creator: "Yogi & Yathra",
  publisher: "Yogi & Yathra",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yogi & Yathra | Travel, Spiritual Journeys & Wellness",
    description:
      "Discover sacred destinations, curated tour packages, and transformative travel experiences with Yogi & Yathra.",
    url: "https://yogianyathra.com",
    siteName: "Yogi & Yathra",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogi & Yathra | Travel, Spiritual Journeys & Wellness",
    description:
      "Discover sacred destinations, curated tour packages, and transformative travel experiences with Yogi & Yathra.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
