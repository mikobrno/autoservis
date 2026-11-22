import type { Metadata } from 'next';
import {
  business,
  google,
  googleMapsUrl,
  instagramUrl,
  openingHours,
  siteName,
  siteUrl,
} from '@/lib/contact';
import { services, type Service } from '@/lib/services';

export { siteUrl };

export const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

export const ogImage = {
  url: '/images/og-autoservisdk.jpg',
  width: 1200,
  height: 630,
  alt: `${business.tradeName} – autoservis, pneuservis a prověrka ojetin, Frýdek-Místek`,
};

/**
 * Metadata podstránky. Hlídá pravidla z CLAUDE.md: title ≤ 60 znaků,
 * description 120–155 znaků, canonical na každé stránce. V režimu vývoje
 * na porušení upozorní do konzole.
 */
export const pageMetadata = ({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata => {
  if (process.env.NODE_ENV !== 'production') {
    if (title.length > 60) console.warn(`[seo] title > 60 zn. (${title.length}): ${title}`);
    if (!noindex && (description.length < 120 || description.length > 155)) {
      console.warn(`[seo] description mimo 120–155 zn. (${description.length}): ${path}`);
    }
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'cs_CZ',
      url: absoluteUrl(path),
      siteName,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
};

export const breadcrumbJsonLd = (items: Array<{ name: string; href: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.href),
  })),
});

export const faqJsonLd = (items: Array<{ q: string; a: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

const businessId = `${siteUrl}/#business`;

export const serviceJsonLd = (service: Pick<Service, 'name' | 'description'> & { path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  serviceType: service.name,
  description: service.description,
  areaServed: { '@type': 'City', name: business.city },
  provider: { '@id': businessId },
  url: absoluteUrl(service.path),
});

/**
 * AutoRepair (podtyp LocalBusiness). Hodnocení z Googlu sem záměrně NEdáváme
 * jako aggregateRating – Google hvězdičky z vlastních stránek firmy
 * (self-serving reviews) nezobrazuje a markup by byl v rozporu s pravidly.
 */
export const localBusinessJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  '@id': businessId,
  name: business.tradeName,
  alternateName: business.googleName,
  description:
    'Autoservis a pneuservis ve Frýdku-Místku: diagnostika, výměna oleje, brzdy, podvozek, opravy motoru, příprava na STK, přezutí a prověření ojetého auta před koupí.',
  url: siteUrl,
  image: absoluteUrl('/images/dilna-jaguar.webp'),
  logo: absoluteUrl('/images/logo-dk.svg'),
  telephone: business.phone,
  ...(business.email ? { email: business.email } : {}),
  ...(business.ico ? { taxID: business.ico } : {}),
  founder: { '@type': 'Person', name: business.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: business.city,
    postalCode: business.postalCode,
    addressCountry: business.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: googleMapsUrl,
  areaServed: [{ '@type': 'City', name: business.city }],
  openingHoursSpecification: openingHours
    .filter((row) => row.opens && row.closes)
    .map((row) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: row.schemaDays,
      opens: row.opens,
      closes: row.closes,
    })),
  sameAs: [instagramUrl, `https://www.google.com/maps/place/?q=place_id:${google.placeId}`],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Služby',
    itemListElement: [
      ...services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, url: absoluteUrl(`/servis/${service.slug}`) },
      })),
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pneuservis', url: absoluteUrl('/pneuservis') } },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Prověření auta před koupí',
          url: absoluteUrl('/provereni-auta-pred-koupi'),
        },
      },
    ],
  },
  currenciesAccepted: 'CZK',
  priceRange: 'Kč',
  knowsLanguage: 'cs',
});

/** Zakázka z dílny jako článek – Google tak pozná datum, autora a fotku. */
export const jobJsonLd = (job: {
  slug: string;
  car: string;
  title: string;
  date: string;
  problem: string;
  image: { src: string };
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `${job.car} – ${job.title}`,
  description: job.problem,
  image: absoluteUrl(job.image.src),
  datePublished: job.date,
  dateModified: job.date,
  inLanguage: 'cs-CZ',
  author: { '@type': 'Person', name: business.owner, url: absoluteUrl('/o-mne') },
  publisher: { '@id': businessId },
  mainEntityOfPage: absoluteUrl(`/nase-prace/${job.slug}`),
});

export const webSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  inLanguage: 'cs-CZ',
  publisher: { '@id': businessId },
});

/** Pomocník pro vložení JSON-LD do stránky. */
export const jsonLdScript = (data: unknown) => ({ __html: JSON.stringify(data) });
