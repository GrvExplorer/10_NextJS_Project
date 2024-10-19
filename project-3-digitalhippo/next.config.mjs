/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com", protocol: "https" },
      {hostname: "picsum.photos", protocol: "https"},
    ],
  },
};

export default nextConfig;
