import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { personal } from "@/lib/site-data";
import { VerticalNav } from "@/components/VerticalNav";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personal.name} - ${personal.title}`,
  description: `Portfolio and technical blog. ${personal.tagline}`,
  keywords: ["portfolio", "software engineer", "developer", "blog"],
  authors: [{ name: personal.name }],
  openGraph: {
    title: `${personal.name} - Portfolio`,
    description: personal.tagline,
    url: "https://aashishsinghal.com",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} - Portfolio`,
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} min-h-screen antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <div className="layout-spine" aria-hidden />
        <VerticalNav />
        <main className="relative z-[1] pl-[calc(4px+5rem)] pr-6 pt-8 pb-24 md:pl-[calc(4px+7rem)]">
          <div className="mx-auto max-w-3xl">
            {children}
          </div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
