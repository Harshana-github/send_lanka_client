import type { NextConfig } from "next";

const api = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/client");

const nextConfig: NextConfig = {
  images: {
    // Photos uploaded in the admin panel are served by the backend.
    remotePatterns: [new URL(`${api.origin}/storage/**`)],
    // The backend runs on localhost during development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // Only our own stylesheets: next/font generates CSS too, and Tailwind must not process it.
        condition: { not: "foreign" },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
