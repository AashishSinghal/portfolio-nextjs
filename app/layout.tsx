import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import NoSSR from "@/components/no-ssr"
import SlimNavigation from "@/components/navigation/slim-navigation"
import ThemeProvider from "@/contexts/theme-provider"
import AnimatedBackground from "@/components/animated-background"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
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

