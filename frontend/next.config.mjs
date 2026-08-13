/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Chỉ proxy /api khi chạy dev (NODE_ENV=development).
    // Khi deploy, frontend gọi backend qua NEXT_PUBLIC_API_URL.
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:4000/api/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
