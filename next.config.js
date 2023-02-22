const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: 'public',
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
