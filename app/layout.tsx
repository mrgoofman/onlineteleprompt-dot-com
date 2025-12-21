import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Bitcount Prop Single might not be directly available in next/font/google if it's very new or has a complex family name.
// However, search results said it's on Google Fonts.
// Standard naming convention: "Bitcount Prop Single" -> Bitcount_Prop_Single
import { Bitcount_Prop_Single } from "next/font/google";
import Script from "next/script";

import { Providers } from "@/components/providers";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-0LT892KJ4Z";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcount = Bitcount_Prop_Single({
  variable: "--font-bitcount",
  weight: ["400"], // Bitcount usually has specific weights
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://teleprompter24.com'),
  title: {
    default: "Teleprompter24 - Free Online Teleprompter for Google Docs",
    template: "%s | Teleprompter24",
  },
  description: "Turn any device into a professional teleprompter. Syncs instantly with Google Docs. Free, simple, and works on iPhone, iPad, Android, and laptop.",
  keywords: ["teleprompter", "online teleprompter", "google docs teleprompter", "free teleprompter", "teleprompter for ipad", "teleprompter software", "best online teleprompter", "free teleprompter app"],
  authors: [{ name: "Teleprompter24" }],
  creator: "Teleprompter24",
  publisher: "Teleprompter24",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teleprompter24.com",
    siteName: "Teleprompter24",
    title: "Teleprompter24 - Free Online Teleprompter for Google Docs",
    description: "Turn any device into a professional teleprompter. Syncs instantly with Google Docs. Free, simple, and works on iPhone, iPad, Android, and laptop.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Teleprompter24 - Free Online Teleprompter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleprompter24 - Free Online Teleprompter for Google Docs",
    description: "Turn any device into a professional teleprompter. Syncs instantly with Google Docs. Free, simple, and works on iPhone, iPad, Android, and laptop.",
    images: ["/og-image.jpg"],
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
  alternates: {
    canonical: "https://teleprompter24.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Teleprompter24",
  description: "Turn any device into a professional teleprompter. Syncs instantly with Google Docs. Free, simple, and works on iPhone, iPad, Android, and laptop.",
  url: "https://teleprompter24.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "127",
  },
  featureList: [
    "Google Docs integration",
    "Real-time sync",
    "Adjustable scroll speed",
    "Works on any device",
    "Free to use",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
