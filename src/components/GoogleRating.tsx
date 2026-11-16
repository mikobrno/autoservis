import type { CSSProperties } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { google, googleReviewsUrl, googleWriteReviewUrl } from '@/lib/contact';

/** Česká koncovka: 1 recenze, 2–4 recenze, 5+ recenzí. */
export const reviewsLabel = (count: number) => {
  if (count === 1) return 'recenze';
  if (count >= 2 && count <= 4) return 'recenze';
  return 'recenzí';
};

const ratingText = google.rating.toLocaleString('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Čtyřcípá třpytka u páté hvězdičky. */
function Sparkle({ index, style }: { index: number; style: CSSProperties }) {
  return (
    <span aria-hidden="true" className="dk-sparkle" style={{ ...style, '--s': index } as CSSProperties}>
      <svg viewBox="0 0 24 24" className="h-full w-full" focusable="false">
        <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill="currentColor" />
      </svg>
    </span>
  );
}

/**
 * Pět hvězdiček. Animace (globals.css, dk-star / dk-sparkle): hvězdičky se postupně
 * rozsvítí s poskočením a u páté se zajiskří. `hero` = navázané na rozsvícení úvodu
 * + občasný odlesk, `reveal` = při doscrollování karty, `none` = statické.
 */
function Stars({ className = 'h-4 w-4', mode = 'none' }: { className?: string; mode?: 'hero' | 'reveal' | 'none' }) {
  const big = mode === 'reveal';
  const size = big ? 14 : 10;
  return (
    <span
      className={`relative flex items-center gap-0.5 text-amber ${mode === 'hero' ? 'dk-stars-hero' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${className} ${mode !== 'none' ? 'dk-star' : ''}`}
          style={{ '--i': index } as CSSProperties}
          fill={index < Math.round(google.rating) ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
      {mode !== 'none' && (
        <>
          <Sparkle index={0} style={{ width: size, height: size, right: -size / 2, top: -size / 1.6 }} />
          <Sparkle index={1} style={{ width: size * 0.7, height: size * 0.7, right: size, top: -size }} />
          <Sparkle index={2} style={{ width: size * 0.6, height: size * 0.6, right: -size, bottom: -size / 2.2 }} />
        </>
      )}
      {mode === 'hero' && <span aria-hidden="true" className="dk-glint" />}
    </span>
  );
}

type GoogleRatingProps = {
  onDark?: boolean;
  /** Velká karta s výzvou k napsání recenze. */
  variant?: 'badge' | 'card';
  /** Odznak v úvodu: hvězdičky se rozsvítí spolu s úvodní animací (jen jedna instance na stránce). */
  animate?: boolean;
};

/**
 * Hodnocení z Google profilu s odkazem na recenze. Čísla jsou v contact.ts
 * (`google.rating`, `google.reviewCount`) – při změně na Googlu je přepsat.
 */
export default function GoogleRating({ onDark = false, variant = 'badge', animate = false }: GoogleRatingProps) {
  const label = `${ratingText} z 5 · ${google.reviewCount} ${reviewsLabel(google.reviewCount)} na Googlu`;

  if (variant === 'card') {
    return (
      <div
        data-reveal="rating"
        className={`flex flex-col gap-5 rounded-[var(--radius-card-lg)] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8 ${
          onDark ? 'border border-line bg-steel text-white' : 'bg-card text-ink shadow-sm ring-1 ring-ink/5'
        }`}
      >
        <div className="flex items-center gap-5">
          <span className="dk-rating-num font-display text-6xl font-bold leading-none">{ratingText}</span>
          <div>
            <Stars className="h-5 w-5" mode="reveal" />
            <p className={`mt-2 text-sm ${onDark ? 'text-fog' : 'text-slate'}`}>
              {google.reviewCount} {reviewsLabel(google.reviewCount)} zákazníků na Googlu
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:items-end">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 py-2 font-semibold underline-offset-4 hover:underline ${
              onDark ? 'text-white' : 'text-ink'
            }`}
          >
            Přečíst recenze <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-2 text-sm underline-offset-4 hover:underline ${onDark ? 'text-fog' : 'text-slate'}`}
          >
            Byli jste u mě? Napište recenzi
          </a>
        </div>
      </div>
    );
  }

  return (
    <a
      href={googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} – otevřít recenze`}
      className={`inline-flex items-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
        onDark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-card text-ink ring-1 ring-ink/10 hover:ring-ink/30'
      }`}
    >
      <GoogleG />
      <span className="font-bold">{ratingText}</span>
      <Stars mode={animate ? 'hero' : 'none'} />
      <span className={onDark ? 'text-fog' : 'text-slate'}>
        {google.reviewCount} {reviewsLabel(google.reviewCount)}
      </span>
    </a>
  );
}

/** Logo „G“ pro rozpoznání zdroje hodnocení. */
function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8h-4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8z" />
    </svg>
  );
}
