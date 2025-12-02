import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/fdm-portal',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/fdm-portal/' : '',
};

export default nextConfig;
