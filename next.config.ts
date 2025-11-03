import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/FDM_DSP' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/FDM_DSP/' : '',
};

export default nextConfig;
