import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Nexorith — Web & AI Engineering Studio",
    template: "%s · Nexorith",
  },
  description:
    "Nexorith is a futuristic web and AI solutions agency building powerful digital products, SaaS platforms, and automation for ambitious teams.",
  keywords: [
    "Nexorith",
    "web development",
    "AI solutions",
    "SaaS",
    "startup MVP",
    "automation",
    "UI UX",
    "digital transformation",
  ],
  openGraph: {
    title: "Nexorith — Engineering the Future of Web & AI",
    description:
      "Luxury-grade digital products, AI systems, and cloud-native platforms.",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#030306",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
