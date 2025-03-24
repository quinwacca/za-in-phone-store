/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
        port: '',
        pathname: '/images/**',
        search: ''
      }
    ]
  }
}

export default nextConfig
