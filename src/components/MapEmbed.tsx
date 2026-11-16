'use client';

import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { business, fullAddress, googleDirectionsUrl, googleMapsEmbedUrl } from '@/lib/contact';

/**
 * Mapa Googlu se načte až po kliknutí – vložená mapa jinak hned při
 * načtení stránky posílá data Googlu a ukládá cookies (bez souhlasu).
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card-lg)] bg-steel ring-1 ring-ink/10 md:aspect-[16/10]">
      {loaded ? (
        <iframe
          src={googleMapsEmbedUrl}
          title={`Mapa – ${business.tradeName}, ${fullAddress}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
          <MapPin className="h-10 w-10 text-amber" aria-hidden="true" />
          <p className="font-display text-2xl font-bold uppercase">{fullAddress}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:border-white hover:bg-white/10"
            >
              Zobrazit mapu
            </button>
            <a
              href={googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink hover:bg-amber-dark"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Navigovat
            </a>
          </div>
          <p className="max-w-xs text-xs text-fog">Mapa se načte z Google Maps až po kliknutí.</p>
        </div>
      )}
    </div>
  );
}
