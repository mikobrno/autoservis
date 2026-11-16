'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * „Rozsvícení dílny“ nad úvodní fotkou – přehraje se při každém zobrazení úvodu
 * (načtení, obnovení stránky i návrat přes menu).
 *
 * Do startu je vrstva tmavá (dílna „zhasnutá“). Animace se pustí až ve chvíli,
 * kdy je fotka načtená – jinak by blikání proběhlo nad prázdnou plochou a nikdo
 * by ho neviděl. Pojistka: nejpozději po 3 s se rozsvítí i bez fotky.
 * Start = třída dk-lights-go na <html>. Na ni jsou navázané i „neonový“ nadpis,
 * palubní deska (Dashboard), auto pod nadpisem (RoadUnderline), usazení nadpisu
 * (.dk-h1) a hvězdičky v odznaku hodnocení.
 * Po doběhnutí rozsvícení přibude dk-lights-seen (tmavá vrstva se schová).
 * Bez JavaScriptu vrstvy schová <noscript> styl v layout.tsx.
 */
export default function HeroLights() {
  const ref = useRef<HTMLDivElement>(null);

  // useLayoutEffect = ještě před vykreslením, ať nic neproblikne.
  useLayoutEffect(() => {
    const root = document.documentElement;
    // Vždy od začátku – i když se na úvod vracíte přes menu.
    root.classList.remove('dk-lights-seen', 'dk-lights-go');

    let started = false;
    let frame = 0;
    const start = () => {
      if (started) return;
      started = true;
      // Dva snímky, ať prohlížeč stihne fotku opravdu vykreslit.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => root.classList.add('dk-lights-go'));
      });
    };

    const img = ref.current?.parentElement?.querySelector('img');
    if (!img || (img.complete && img.naturalWidth > 0)) {
      start();
    } else {
      img.addEventListener('load', start, { once: true });
      img.addEventListener('error', start, { once: true });
    }
    const fallback = window.setTimeout(start, 3000);

    // dk-lights-go zůstává, dokud se na úvodu nedohraje vše (auto jede až do ~3.2 s);
    // uklidí se při odchodu z úvodu, aby se po návratu vše spustilo znovu od začátku.
    return () => {
      window.clearTimeout(fallback);
      cancelAnimationFrame(frame);
      img?.removeEventListener('load', start);
      img?.removeEventListener('error', start);
      root.classList.remove('dk-lights-go', 'dk-lights-seen');
    };
  }, []);

  // Rozsvícení doběhlo → schovat tmavou vrstvu. dk-lights-go zůstává, ať doběhne deska a auto.
  const markSeen = () => document.documentElement.classList.add('dk-lights-seen');

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
