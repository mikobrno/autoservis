import Link from 'next/link';
import { business } from '@/lib/contact';

/**
 * Logo: šestiúhelník s iniciálami + název. Obojí se bere z contact.ts
 * (`monogram`, `tradeName`), takže přejmenování servisu logo nerozbije.
 * Statické public/images/logo-dk.svg a ikony se pak přegenerují skriptem
 * scripts/build-icons.mjs.
 */
export function LogoMark({ className = 'h-10 w-10', animate = false }: { className?: string; animate?: boolean }) {
  return (
    <svg viewBox="0 0 48 42" className={`${className} ${animate ? 'dk-logo-mark' : ''}`} aria-hidden="true" focusable="false">
      <polygon
        points="12,1.5 36,1.5 46.5,21 36,40.5 12,40.5 1.5,21"
        fill="#14171c"
        stroke="#ffb21e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text
        x="24"
        y="28.5"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-heading), "Arial Narrow", Arial, sans-serif' }}
        fontWeight="700"
        fontSize="19"
        letterSpacing="0.5"
        fill="#ffffff"
      >
        {business.monogram}
      </text>
    </svg>
  );
}

/**
 * `animate` = šestiúhelník se při načtení „utáhne“ jako matice, přes logo přejede
 * odlesk a šestiúhelník zazáří (jen v hlavičce, CSS dk-logo-mark / dk-shine).
 */
export default function Logo({ onDark = true, animate = false }: { onDark?: boolean; animate?: boolean }) {
  const [first, ...rest] = business.tradeName.split(' ');
  return (
    <Link href="/" className="group relative inline-flex items-center gap-3" aria-label={`${business.tradeName} – úvod`}>
      {animate && <span aria-hidden="true" className="dk-shine" />}
      <LogoMark animate={animate} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold uppercase tracking-wide ${onDark ? 'text-white' : 'text-ink'}`}>
          {first} <span className="text-amber">{rest.join(' ')}</span>
        </span>
        <span className={`mt-1 text-xs font-medium uppercase tracking-[0.16em] ${onDark ? 'text-fog' : 'text-slate'}`}>
          {business.city}
        </span>
      </span>
    </Link>
  );
}
