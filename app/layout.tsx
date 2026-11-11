import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/nav/Navbar";
import Footer from "@/components/layout/footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yogiandyathra.com"),
  title: {
    default: "Yogi & Yathra | Sacred Spiritual Store & Yoga Workshops",
    template: "%s | Yogi & Yathra - Spiritual Store & Workshops",
  },
  description:
    "Shop authentic malas, crystals & sacred artifacts at Yogi & Yathra Spiritual Store, and join expert-led yoga workshops & mindful wellness immersions.",
  keywords: [
    "Yogi & Yathra",
    "Spiritual Store",
    "Yoga Workshops",
    "Sacred Spiritual Store",
    "Karungali Mala",
    "Karungali Bracelets",
    "Rudraksha Mala",
    "Crystal Bracelets",
    "Vedic Spiritual Artifacts",
    "Yoga Immersions",
    "Meditation Workshops",
    "Yogify Classes",
    "Spiritual Yathra",
    "Mindful Living",
    "Authentic Vedic Traditions",
  ],
  authors: [{ name: "Yogi & Yathra" }],
  creator: "Yogi & Yathra",
  publisher: "Yogi & Yathra",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Yogi & Yathra | Sacred Spiritual Store & Yoga Workshops",
    description:
      "Shop authentic malas, crystals & sacred artifacts at Yogi & Yathra Spiritual Store, and join expert-led yoga workshops & mindful wellness immersions.",
    url: "https://www.yogiandyathra.com",
    siteName: "Yogi & Yathra",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogi & Yathra | Sacred Spiritual Store & Yoga Workshops",
    description:
      "Shop authentic malas, crystals & sacred artifacts at Yogi & Yathra Spiritual Store, and join expert-led yoga workshops & mindful wellness immersions.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.yogiandyathra.com/#website",
      "url": "https://www.yogiandyathra.com",
      "name": "Yogi & Yathra",
      "description":
        "Sacred Spiritual Store & Transformative Yoga Workshops rooted in authentic Vedic traditions.",
      "publisher": {
        "@type": "Organization",
        "name": "Yogi & Yathra",
        "url": "https://www.yogiandyathra.com",
        "logo": "https://www.yogiandyathra.com/logo-01.png",
      },
    },
    {
      "@type": "OnlineStore",
      "@id": "https://www.yogiandyathra.com/#store",
      "name": "Yogi & Yathra Spiritual Store",
      "url": "https://www.yogiandyathra.com",
      "description":
        "Certified sacred spiritual artifacts including Karungali malas, crystal bracelets, Rudraksha beads, and sacred items.",
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://www.yogiandyathra.com/#workshops",
      "name": "Yogi & Yathra Workshops & Immersions",
      "url": "https://www.yogiandyathra.com",
      "description":
        "Master-led transformative yoga workshops, pranayama courses, and meditative immersions.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
