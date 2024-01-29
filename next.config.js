/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    AUTH_TOKEN_PASSWORD: process.env.AUTH_TOKEN_PASSWORD,
    AUTH_TOKEN_API_KEY: process.env.AUTH_TOKEN_API_KEY,
    GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mars-images.imgix.net',
        port: '',
        pathname: '/seobot/devhunt.org/**',
      },
    ],
  },
};
module.exports = nextConfig;
