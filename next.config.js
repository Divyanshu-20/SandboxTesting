/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  // Remove static export since we have API routes
  // output: 'export', // Not needed for Netlify with API routes
  trailingSlash: true, // Add trailing slashes for better routing
}

module.exports = nextConfig
