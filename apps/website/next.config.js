/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "https://portal.potsdamer-buergerstiftung.org",
      },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
