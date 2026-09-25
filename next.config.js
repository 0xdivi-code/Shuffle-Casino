/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'shuffle-com.imgix.net' },
      { protocol: 'https', hostname: 'shuffle.com' },
      { protocol: 'https', hostname: '**.imgix.net' },
      { protocol: 'https', hostname: '**.ctfassets.net' },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/image-proxy',
        destination: '/api/image-proxy',
      }
    ]
  },
  webpack: (config) => {
    // Suppress MetaMask errors from extension
    const originalEntry = config.entry;
    return config;
  }
};
module.exports = nextConfig;
