/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['portal.potsdamer-buergerstiftung.org'],
  async rewrites() {
    return [
      {
        source: "/portal/:path*",
        destination: "https://portal.potsdamer-buergerstiftung.org/:path*",
      },
      {
        source: "/analytics/:path*",
        destination: "https://analytics.potsdamer-buergerstiftung.org/:path*",
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
