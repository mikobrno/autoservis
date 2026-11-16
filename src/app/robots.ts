import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/contact';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Poděkování po odeslání formuláře nemá v indexu co dělat.
      disallow: ['/dekujeme', '/__forms.html'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
