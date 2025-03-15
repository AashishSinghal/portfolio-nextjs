import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import NoSSR from "@/components/no-ssr"
import SlimNavigation from "@/components/navigation/slim-navigation"
import ThemeProvider from "@/contexts/theme-provider"
import AnimatedBackground from "@/components/animated-background"
import { Albert_Sans } from "next/font/google"

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-albert-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://aashishsinghal.com"),
  title: "Aashish Singhal - Developer | Designer | Explorer",
  description: "This is a portfolio website developed by Aashish, to showcase projects, interests etc.",
  keywords: ["portfolio", "developer", "designer", "explorer"],
  authors: [{ name: "Aashish Singhal" }],
  creator: "Aashish Singhal",
  openGraph: {
    type: "website",
    url: "https://aashishsinghal.com/",
    title: "Aashish Singhal - Portfolio",
    description: "This is a portfolio website developed by Aashish, to showcase projects, interests etc.",
    images: [
      {
        url: "/meta-ss.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aashish Singhal - Portfolio",
    description: "This is a portfolio website developed by Aashish, to showcase projects, interests etc.",
    images: ["/meta-ss.png"],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={albertSans.variable}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <AnimatedBackground />
          <NoSSR>
            <SlimNavigation />
          </NoSSR>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

