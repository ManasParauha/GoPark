import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  }
};

export default nextConfig;
