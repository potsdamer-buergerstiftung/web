/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "https://portal.potsdamer-buergerstiftung.org",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portal.potsdamer-buergerstiftung.org',
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
    formats: ['image/webp'],
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
