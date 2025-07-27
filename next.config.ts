import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  images: {
    unoptimized: true, // Disable Next.js image optimization for Firebase hosting
    domains: [],
    remotePatterns: [],
  },
  output: 'export', // Static export for Firebase hosting
  trailingSlash: true, // Add trailing slash for better compatibility
  assetPrefix: '', // Ensure assets are served from root
};

export default nextConfig;
