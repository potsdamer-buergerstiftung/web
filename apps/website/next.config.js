/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['portal.potsdamer-buergerstiftung.org', 'wixapis.com'],
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
  typescript: {
    ignoreBuildErrors: true,
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
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'fsn1.your-objectstorage.com',
      },
    ],
    qualities: [30, 75],
    formats: ['image/webp'],
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
