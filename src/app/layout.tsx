import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed } from 'next/font/google';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MobileActionBar from '@/components/MobileActionBar';
import RevealObserver from '@/components/RevealObserver';
import { business, siteName, siteUrl } from '@/lib/contact';
import { jsonLdScript, localBusinessJsonLd, ogImage, webSiteJsonLd } from '@/lib/seo';

// Nadpisy: úzký technický Barlow Condensed (jako popisky na nářadí). latin-ext kvůli ř, ě, ů…
const heading = Barlow_Condensed({
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  weight: ['700'],
  display: 'swap',
});

// Text: systémové písmo telefonu/počítače (San Francisco, Roboto, Segoe UI) –
// nic se nestahuje (úspora ~130 kB na mobilu) a web nepůsobí „šablonovitě" jako s Interem.
// Definice je v globals.css (--font-body).

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Kvůli env(safe-area-inset-bottom) u spodní lišty na iPhonu.
  viewportFit: 'cover',
  themeColor: '#0c0e11',
};

const title = `Autoservis a pneuservis Frýdek-Místek – ${business.tradeName}`;
const description =
  'Autoservis a pneuservis ve Frýdku-Místku: diagnostika, brzdy, podvozek, olej, příprava na STK a prověření ojetiny před koupí. Cenu znáte předem.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Bez šablony: každá stránka má vlastní title ≤ 60 znaků (CLAUDE.md).
  title: { default: title, template: '%s' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: siteUrl,
    siteName,
    title,
    description,
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: HeroLights mění třídy na <html> (dk-lights-go / dk-lights-seen).
    <html lang="cs" suppressHydrationWarning>
      <head>
        {/* Bez JavaScriptu se efekt nespustí – fotka nesmí zůstat zhasnutá. */}
        <noscript>
          <style>{`.dk-lights-dark,.dk-lights-bloom{display:none}.dk-neon{opacity:1}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessJsonLd())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(webSiteJsonLd())} />
      </head>
      <body className={`${heading.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Přeskočit na obsah
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileActionBar />
        <CookieConsent />
        <RevealObserver />
      </body>
    </html>
  );
}
