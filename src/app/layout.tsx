import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { hamtaSite } from "@/lib/innehall";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await hamtaSite();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      type: "website",
      locale: "sv_SE",
      siteName: site.name,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: site.url,
    },
    alternates: { canonical: "/" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
