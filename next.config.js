// @ts-check



/** @type {import('next').NextConfig} */
// import withPWA from "next-pwa";

// const nextConfig = withPWA({
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
//   images: {
//     domains: ["dev.to", "res.cloudinary.com", "cdn.dribbble.com", "scontent.cdninstagram.com"],
//   },
// });
const nextConfig = {
    reactStrictMode: true,
    // pwa: {
    //   dest: "public",
    //   register: true,
    //   skipWaiting: true,
    // },
    images: {
      domains: ["dev.to", "res.cloudinary.com", "cdn.dribbble.com", "scontent.cdninstagram.com"],
    },
  };

module.exports = nextConfig;
