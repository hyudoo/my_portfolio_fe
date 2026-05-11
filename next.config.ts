import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.amazonaws.com' }],
  },
  async rewrites() {
    if (!process.env.NEXT_PROXY_URL) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PROXY_URL}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
