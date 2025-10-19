import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { OrganizationSchema, WebSiteSchema } from "./schema";

export const metadata: Metadata = {
  metadataBase: new URL("https://tetramanor.com"),
  title: {
    default:
      "Tetramanor - Premier Real Estate & Property Investment in Nigeria",
    template: "%s | Tetramanor",
  },
  description:
    "Discover luxury properties, investment opportunities, and rental solutions with Tetramanor. Nigeria's leading real estate company offering premium residential and commercial properties.",
  keywords: [
    "real estate Nigeria",
    "property investment",
    "luxury properties",
    "rental properties",
    "real estate investment",
    "Tetramanor",
    "property management",
    "real estate portfolio",
    "commercial properties",
    "residential properties",
    "property development",
    "Lagos real estate",
    "Abuja properties",
  ],
  authors: [{ name: "Tetramanor" }],
  creator: "Tetramanor",
  publisher: "Tetramanor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://tetramanor.com",
    title: "Tetramanor - Premier Real Estate & Property Investment in Nigeria",
    description:
      "Discover luxury properties, investment opportunities, and rental solutions with Tetramanor. Nigeria's leading real estate company.",
    siteName: "Tetramanor",
    images: [
      {
        url: "/full-logo.png",
        width: 1200,
        height: 630,
        alt: "Tetramanor - Real Estate Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tetramanor - Premier Real Estate & Property Investment",
    description:
      "Discover luxury properties, investment opportunities, and rental solutions with Tetramanor.",
    images: ["/full-logo.png"],
    creator: "@tetramanor",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // other: {
    //   "facebook-domain-verification": "your-facebook-verification-code",
    // },
  },
  alternates: {
    canonical: "https://tetramanor.com",
  },
  category: "real estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <OrganizationSchema />
        <WebSiteSchema />
        <Providers>{children}</Providers>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
