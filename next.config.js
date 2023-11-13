/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['m8zdl4ngov2wwphn.public.blob.vercel-storage.com'],
  },
  env: {
    DB_URI: process.env.DB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  }
}

module.exports = nextConfig
