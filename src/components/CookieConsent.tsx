'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useSyncExternalStore } from 'react';
import { Cookie } from 'lucide-react';
import {
  GA_MEASUREMENT_ID,
  decideConsent,
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
} from '@/lib/analytics';

/**
 * Souhlas s měřením (GA4, Consent Mode v2 „basic“). Převzato z ekoukliddomu.cz.
 * Lišta se ukáže jen tehdy, když je nastavené NEXT_PUBLIC_GA_ID – bez měření
 * není na co se ptát.
 */
export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
  const measure = consent === 'granted' && Boolean(GA_MEASUREMENT_ID);

  return (
    <>
      {measure && (
        <>
          <Script
            id="ga-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === 'unknown' && GA_MEASUREMENT_ID && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-0 bottom-20 z-[60] p-3 sm:p-4 md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md md:p-0"
        >
          <div className="flex flex-col gap-4 rounded-[var(--radius-card-lg)] border border-line bg-graphite p-5 text-white shadow-2xl shadow-black/40 md:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p id="cookie-consent-title" className="font-display text-lg font-bold uppercase">
                  Můžu měřit návštěvnost?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-fog">
                  Rád bych používal Google Analytics, abych věděl, které stránky vám pomáhají. Bez souhlasu se měření
                  nespustí a web funguje úplně stejně. Víc v{' '}
                  <Link href="/ochrana-osobnich-udaju" className="font-semibold text-white underline underline-offset-2">
                    zásadách ochrany osobních údajů
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => decideConsent('denied')}
                className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                Odmítnout
              </button>
              <button
                type="button"
                onClick={() => decideConsent('granted')}
                className="rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-amber-dark"
              >
                Souhlasím
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
