/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'placekitten.com',
            port: '',
            pathname: '/200/300',
          }
        ]
        },
    rewrites: async () => {
    return [
        {
            source: "/api/:path*",
            destination:
                process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/:path*" : "/api/",
        },
    ];
    }
    }

;

module.exports = nextConfig
