import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Docker用の最適化
};

export default nextConfig;
