/** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // pathname: "/your-cloudinary-cloud-name/**",
      },
    ],
  },
};

export default nextConfig;
