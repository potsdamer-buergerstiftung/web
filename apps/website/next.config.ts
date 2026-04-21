import { withWorkflow } from "workflow/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["portal.potsdamer-buergerstiftung.org", "*.ngrok-free.app"],
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
        protocol: "https",
        hostname: "portal.potsdamer-buergerstiftung.org",
      },
      {
        protocol: "https",
        hostname: "fsn1.your-objectstorage.com",
      },
    ],
    qualities: [30, 75],
    formats: ["image/webp"],
  },
  transpilePackages: ["ui"],
};

export default withWorkflow(nextConfig);
