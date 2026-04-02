import type { Metadata } from "next";
import { Bitter, Manrope, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { getSiteContent } from "@/lib/content";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans-source",
  weight: ["400", "500", "600", "700", "800"],
});

const serif = Bitter({
  subsets: ["latin"],
  variable: "--font-serif-source",
  weight: ["500", "600", "700", "800"],
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono-source",
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.brandName,
    description: content.subheadline,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
