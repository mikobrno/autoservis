import type { CSSProperties, ReactNode } from 'react';

/**
 * Pod textem projede auto, za koly se práší a za sebou „vytáhne“ jantarové
 * podtržení (stopu). Animace v globals.css (dk-car-*, dk-road-*, dk-dust),
 * spouští ji HeroLights třídou dk-lights-go. Konečný stav = jen podtržení.
 *
 * Časování musí sedět s CSS: jízda 1.4 s od 1.75 s po startu, auto jede
 * lineárně z −20 % na 110 % šířky textu. Obláček na pozici p (0–1) se zvedne,
 * když kolem projede zadní kolo: 1.75 + 1.4 × (p + 0.2) / 1.3 s.
 */
const DRIVE_START = 1.75;
const DRIVE_DURATION = 1.4;
const PUFFS = [0.04, 0.2, 0.37, 0.54, 0.71, 0.88];

const dustDelay = (position: number) =>
  `${(DRIVE_START + (DRIVE_DURATION * (position + 0.2)) / 1.3).toFixed(2)}s`;

function Car() {
  return (
    <svg viewBox="0 0 48 18" className="h-[16px] w-[43px] text-[#d6dbe1] lg:h-[22px] lg:w-[59px]" aria-hidden="true" focusable="false">
      <path
        d="M2 13.2v-2.6c0-1 .9-1.6 2-1.8l7-1.2 5.4-4c.8-.6 1.8-.9 2.9-.9h10.6c1.2 0 2.3.5 3.1 1.3l3.9 4 6 1c1.8.3 3 1.6 3 3.4v.8z"
        fill="currentColor"
      />
      <path d="M17.6 7.6l2.9-3.3h5.3v3.3zM27.3 7.6V4.3h3.1l3.2 3.3z" fill="#0c0e11" opacity="0.55" />
      <g className="dk-wheel">
        <circle cx="11.5" cy="13.6" r="3.5" fill="#0c0e11" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11.5 10.8v5.6" stroke="currentColor" strokeWidth="1" />
      </g>
      <g className="dk-wheel">
        <circle cx="36.5" cy="13.6" r="3.5" fill="#0c0e11" stroke="currentColor" strokeWidth="1.6" />
        <path d="M36.5 10.8v5.6" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function RoadUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full mt-0.5 h-4 lg:mt-1 lg:h-6">
        <span className="dk-road-line absolute inset-x-0 bottom-[2px] h-[3px] origin-left rounded-full bg-amber lg:h-1" />
        {PUFFS.map((position) => (
          <span
            key={position}
            className="dk-dust absolute bottom-0 h-5 w-5 rounded-full"
            style={
              {
                left: `${position * 100}%`,
                '--t': dustDelay(position),
                background: 'radial-gradient(circle, rgba(214, 219, 225, 0.55) 0%, rgba(214, 219, 225, 0) 70%)',
              } as CSSProperties
            }
          />
        ))}
        <span className="dk-car-track absolute inset-0">
          <span className="absolute bottom-[1px] left-0">
            <Car />
          </span>
        </span>
      </span>
    </span>
  );
}
