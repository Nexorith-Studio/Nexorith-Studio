import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Nexorith — Technology Studio",
    template: "%s · Nexorith",
  },
  description:
    "Nexorith is a technology studio that builds premium websites, web applications, mobile apps, and AI solutions for ambitious businesses.",
  keywords: [
    "Nexorith",
    "technology studio",
    "web development",
    "mobile apps",
    "AI solutions",
    "custom software",
    "product design",
  ],
  openGraph: {
    title: "Nexorith — Technology Studio",
    description:
      "We build software that moves businesses forward. Premium web, mobile, and AI solutions.",
    type: "website",
    siteName: "Nexorith",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexorith — Technology Studio",
    description: "We build software that moves businesses forward.",
  },
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#040816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-bg text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
