/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/6th-exam',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;