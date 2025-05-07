import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Add your external image domains here
      {
        protocol: 'https',
        hostname: 'https://carpetmarketbucket.s3.amazonaws.com',
        pathname: '/**', // Match any path for gravatar images
      },
      {
        protocol: 'https',
        hostname: 'https://example.com',
        pathname: '/**', // Match any path for example CDN images
      },
    ],
    domains: ['carpetmarketbucket.s3.amazonaws.com'],
  },  
};

export default nextConfig;