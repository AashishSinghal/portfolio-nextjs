const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Uses SWC for minification (faster than Terser)

  // Add metadata configuration
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
  },

  // Configure image domains for next/image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
        pathname: "**",
      },
      // Add Vercel Blob Storage domain
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "**",
      },
    ]
  },
}

module.exports = nextConfig