import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '172.30.1.45',
    '172.30.1.45:3000',
    'localhost:3000',
  ],
};

export default nextConfig;

