const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
    ]
  },
};
// export default nextConfig;
module.exports = withBundleAnalyzer(nextConfig);

// optimizePackageImports 패키지
module.exports = {
  experimental: {
    optimizePackageImports: [
      '@anthropic-ai/sdk',
      '@hookform/resolvers',
      '@tanstack/react-query',
      'axios', 'next-auth',
      'react-hook-form',
      'next',
      'react',
      'react-dom',
      'zod'
    ],
  },
}
