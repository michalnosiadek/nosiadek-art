/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/experience",
        destination: "/experience/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
