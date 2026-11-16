'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Nalétávající nadpisy (stejný princip jako na milankost.cz): prvky s
 * atributem data-reveal dostanou data-revealed, jakmile dojedou na obrazovku.
 * Vzhled a pohyb řeší globals.css. Spouští se znovu po každé změně stránky,
 * protože hlavička a patička při proklikávání zůstávají a obsah se vymění.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.setAttribute('data-revealed', ''));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  // Ikony služeb: po najetí myší na kartu (odkaz nebo [data-ico-card]) přehrát animaci znovu.
  // Jeden posluchač pro celý web; restart přes Web Animations API (cancel + play).
  useEffect(() => {
    let lastHost: Element | null = null;
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const host = (event.target as Element | null)?.closest?.('a, [data-ico-card]') ?? null;
      if (host === lastHost) return;
      lastHost = host;
      host?.querySelectorAll('.dk-ico[data-revealed]').forEach((icon) => {
        [icon, ...Array.from(icon.querySelectorAll('*'))].forEach((element) =>
          element.getAnimations().forEach((animation) => {
            animation.cancel();
            animation.play();
          }),
        );
      });
    };
    document.addEventListener('pointerover', onPointerOver);
    return () => document.removeEventListener('pointerover', onPointerOver);
  }, []);

  return null;
}
