import type { NextConfig } from 'next';

const discoveryLinks = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</>; rel="alternate"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: '/',
        headers: [{ key: 'Link', value: discoveryLinks }],
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
