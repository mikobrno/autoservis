'use client';

import { useLayoutEffect, useRef } from 'react';

/** Klíč v sessionStorage – stejný čte skript v layout.tsx ještě před vykreslením. */
export const LIGHTS_SEEN_KEY = 'dk-lights';

/**
 * „Rozsvícení dílny" nad úvodní fotkou.
 *
 * Do startu je vrstva tmavá (dílna „zhasnutá"). Animace se pustí až ve chvíli,
 * kdy je fotka načtená – jinak by blikání proběhlo nad prázdnou plochou a nikdo
 * by ho neviděl. Pojistka: nejpozději po 3 s se rozsvítí i bez fotky.
 * Start = třída dk-lights-go na <html> (rozjede i „neonový" nadpis).
 * Po doběhnutí třída dk-lights-seen + záznam v sessionStorage → jednou za návštěvu.
 * Bez JavaScriptu vrstvy schová <noscript> styl v layout.tsx.
 * ?svetla v adrese = přehrát znovu (na předvádění).
 */
export default function HeroLights() {
  const ref = useRef<HTMLDivElement>(null);

  // useLayoutEffect = ještě před vykreslením. Když React při hydrataci <html>
  // přerenderuje (třeba kvůli komentáři, který Netlify vkládá na *.netlify.app),
  // třída dk-lights-seen ze skriptu v hlavičce zmizí – obnovíme ji tady podle
  // sessionStorage, aby fotka ani na okamžik nezhasla.
  useLayoutEffect(() => {
    const root = document.documentElement;
    try {
      const replay = /[?&]svetla/.test(window.location.search);
      if (!replay && window.sessionStorage.getItem(LIGHTS_SEEN_KEY)) root.classList.add('dk-lights-seen');
    } catch {
      // Bez úložiště se rozhoduje jen podle třídy.
    }
    if (root.classList.contains('dk-lights-seen')) return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      // Dva snímky, ať prohlížeč stihne fotku opravdu vykreslit.
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('dk-lights-go')));
    };

    const img = ref.current?.parentElement?.querySelector('img');
    if (!img || (img.complete && img.naturalWidth > 0)) {
      start();
    } else {
      img.addEventListener('load', start, { once: true });
      img.addEventListener('error', start, { once: true });
    }
    const fallback = window.setTimeout(start, 3000);
    return () => window.clearTimeout(fallback);
  }, []);

  const markSeen = () => {
    const root = document.documentElement;
    root.classList.add('dk-lights-seen');
    root.classList.remove('dk-lights-go');
    try {
      window.sessionStorage.setItem(LIGHTS_SEEN_KEY, '1');
    } catch {
      // Bez úložiště se efekt při dalším načtení prostě zopakuje.
    }
  };

  return (
    <>
      <div
        ref={ref}
        aria-hidden="true"
        className="dk-lights-dark pointer-events-none absolute inset-0 bg-ink"
        onAnimationEnd={markSeen}
      />
      <div
        aria-hidden="true"
        className="dk-lights-bloom pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: 'radial-gradient(ellipse 75% 45% at 50% 14%, rgba(225, 238, 255, 0.5), transparent 70%)' }}
      />
    </>
  );
}
