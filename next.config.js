/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudylicenses.s3.sa-east-1.amazonaws.com",
        port: "",
        pathname: "/*",
        search: "",
      },
    ],
  },
};

module.exports = nextConfig;
