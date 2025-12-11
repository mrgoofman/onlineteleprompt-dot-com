import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Bitcount Prop Single might not be directly available in next/font/google if it's very new or has a complex family name.
// However, search results said it's on Google Fonts. 
// Standard naming convention: "Bitcount Prop Single" -> Bitcount_Prop_Single
import { Bitcount_Prop_Single } from "next/font/google";

import { Providers } from "@/components/providers";
import "./globals.css";

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
  title: "Teleprompter24 - Free Online Teleprompter for Google Docs",
  description: "Turn any device into a professional teleprompter. Syncs instantly with Google Docs. Free, simple, and works on iPhone, iPad, Android, and laptop.",
  keywords: ["teleprompter", "online teleprompter", "google docs teleprompter", "free teleprompter", "teleprompter for ipad", "teleprompter software"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
