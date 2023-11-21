/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"],
  },
};

module.exports = nextConfig;
