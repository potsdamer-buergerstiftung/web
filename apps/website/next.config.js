/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['portal.potsdamer-buergerstiftung.org', 'wixapis.com'],
  async rewrites() {
    return [
      {
        source: "/api",
        destination: "https://portal.potsdamer-buergerstiftung.org",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
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
    qualities: [30, 75],
    formats: ['image/webp'],
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
