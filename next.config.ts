import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ibb.co' }, // ImgBB এর ডাইরেক্ট ইমেজ ডোমেইন
    ],
  },
};

export default nextConfig;