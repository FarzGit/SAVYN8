import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static build in ./out — deploy to Vercel, Netlify, Cloudflare Pages, S3 or any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
