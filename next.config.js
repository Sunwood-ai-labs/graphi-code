/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/graphi-code' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/graphi-code' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
