import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dní
  },
  experimental: {
    optimizeCss: true,
  },
  // Bezpečnostní hlavičky patří sem, ne do netlify.toml — Netlify aplikuje
  // [[headers]] jen na statické soubory z CDN, kdežto stránky servíruje
  // Next.js funkce, kterou by minuly.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      // Náhledová adresa *.netlify.app nemá jít do vyhledávačů – indexovat se
      // má jen ostrá doména (canonical stejně míří na autoservisdk.cz).
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.netlify\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  // Adresy ze starého webu (WordPress na autoservisdk.cz). /kontakt a /nase-prace
  // zůstaly stejné — koncové lomítko Next.js přesměruje sám.
  async redirects() {
    return [
      { source: '/sluzby', destination: '/servis', permanent: true },
      { source: '/sluzby/:path*', destination: '/servis', permanent: true },
      { source: '/kontakty', destination: '/kontakt', permanent: true },
      // Zbytky starého WordPressu ze sitemap (stav 22. 11. 2026).
      { source: '/ahoj-vsichni', destination: '/', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
