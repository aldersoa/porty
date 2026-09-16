import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy Adobe Portfolio routes kept for cutover.
      { source: "/about", destination: "/", permanent: true },
      { source: "/about/", destination: "/", permanent: true },
      { source: "/threaded", destination: "/by-a-thread", permanent: true },
      { source: "/threaded/", destination: "/by-a-thread", permanent: true },
    ];
  },
};

export default nextConfig;
