import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Bilder som Ola laddar upp i Studio serveras från Sanitys bild-CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
