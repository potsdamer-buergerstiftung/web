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
    ],
    domains: ['static.wixstatic.com'],
    formats: ['image/webp'],
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig;
