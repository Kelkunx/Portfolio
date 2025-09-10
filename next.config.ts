/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Images : remotePatterns remplace images.domains pour Next 14+ / 15.x
  images: {
    formats: ['image/avif', 'image/webp'],
    // Si tu n'as pas d'images externes, laisse remotePatterns vide
    // ou ajoute ici les hôtes autorisés :
    remotePatterns: [],
  },

  // Headers : patterns compatibles ; attention aux backslashes
  async headers() {
    return [
      {
        // cible les ressources statiques ayant une extension (js, css, images)
        source: '/:path*\\.(js|css|png|jpg|jpeg|svg|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // toutes les routes API -> no-store
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },

  // autres options (laisse tel quel)
  experimental: {
    // si tu utilises des features expérimentales, configure ici
  },
};

module.exports = nextConfig;
