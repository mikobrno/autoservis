import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/contact';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /dekujeme tu záměrně není: má meta noindex a ten Google uvidí jen tehdy,
      // když stránku smí projít.
      disallow: ['/__forms.html'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
