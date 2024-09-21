/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nakanocompany.wordpress.com',
        port: '',
        pathname: '**',
      }
    ]
  }
};

export default nextConfig;
