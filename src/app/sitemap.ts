import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/contact';
import { jobs } from '@/lib/jobs';
import { services } from '@/lib/services';

/**
 * Datum poslední skutečné úpravy obsahu. Záměrně pevné, ne `new Date()` –
 * jinak by se `lastmod` měnil při každém deployi a Google by ho přestal brát
 * vážně. Při reálné úpravě textů datum posuňte.
 */
const CONTENT_UPDATED = new Date('2026-11-16');

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: `${siteUrl}${path}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
  });

  return [
    page('', 1, 'weekly'),
    page('/servis', 0.9),
    ...services.map((service) => page(`/servis/${service.slug}`, 0.8)),
    page('/pneuservis', 0.9),
    page('/provereni-auta-pred-koupi', 0.9),
    page('/provereni-auta-pred-koupi/ukazkovy-report', 0.6),
    page('/cenik', 0.8),
    page('/nase-prace', 0.7, 'weekly'),
    ...jobs.map((job) => ({ ...page(`/nase-prace/${job.slug}`, 0.6), lastModified: new Date(job.date) })),
    page('/objednat', 0.8),
    page('/o-mne', 0.6),
    page('/kontakt', 0.8, 'yearly'),
    page('/ochrana-osobnich-udaju', 0.2, 'yearly'),
  ];
}
