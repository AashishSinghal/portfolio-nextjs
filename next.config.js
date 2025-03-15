const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Uses SWC for minification (faster than Terser)

  // Configure image domains for next/image
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "github.com",
      "githubusercontent.com",
      "avatars.githubusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable server components
    serverComponents: false,
  },
}

module.exports = nextConfig

