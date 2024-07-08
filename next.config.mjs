/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode : true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'textrogue.ap-northeast-2.elasticbeanstalk.com',
      }
    ]
  },
};

export default nextConfig;

// optimizePackageImports 패키지
// module.exports = {
//   experimental: {
//     optimizePackageImports: [
//       '@anthropic-ai/sdk',
//       '@hookform/resolvers',
//       '@tanstack/react-query',
//       'axios',
//       'next-auth',
//       'react-hook-form',
//       'next',
//       'react',
//       'react-dom',
//       'zod'
//     ],
//   },
// }
