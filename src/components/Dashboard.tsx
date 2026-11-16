import type { CSSProperties, ReactNode } from 'react';
import { Check } from 'lucide-react';

/**
 * Palubní deska přes spodek úvodní fotky – jako po otočení klíčku zapalování:
 * kontrolky naskočí, postupně zhasnou a zůstane „Vše v pořádku“.
 * Animace je čistě v CSS (globals.css, třídy dk-dash-*), spouští ji HeroLights
 * třídou dk-lights-go na <html>. Celé je to dekorace → aria-hidden.
 */

const AMBER = '#ffb21e';
const RED = '#ef4444';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-full w-full',
};

/** Obloučky po stranách – typické pro symboly ABS a brzd. */
const SideArcs = () => <path d="M4.2 6.8a9 9 0 0 0 0 10.4M19.8 6.8a9 9 0 0 1 0 10.4" />;

const lights: Array<{ id: string; color: string; icon: ReactNode }> = [
  {
    id: 'motor',
    color: AMBER,
    icon: (
      <svg {...iconProps}>
        <path d="M9 5h5M11.5 5v2.5" />
        <path d="M6 9.5h2.5l1-2h5l1 2h1.5l2 2H21v5.5h-2l-2 2H9.5L6 16.5z" />
        <path d="M6 11.5H3.5M3.5 9.5v4.5" />
      </svg>
    ),
  },
  {
    id: 'olej',
    color: RED,
    icon: (
      <svg {...iconProps}>
        <path d="M3 11h3.5l2-2h5.5l2.5 2.5 4.5-2-5.5 6.5H8l-1.5-2H3z" />
        <path d="M21.5 16.5c0 .9-.6 1.5-1.2 1.5s-1.2-.6-1.2-1.5.6-1.7 1.2-2.5c.6.8 1.2 1.6 1.2 2.5z" />
      </svg>
    ),
  },
  {
    id: 'baterie',
    color: RED,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="7.5" width="18" height="12" rx="1.5" />
        <path d="M6.5 7.5V5.5h3v2M14.5 7.5V5.5h3v2M6.5 13.5h3.5M14 13.5h3.5M15.75 11.75v3.5" />
      </svg>
    ),
  },
  {
    id: 'abs',
    color: AMBER,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="6.5" />
        <SideArcs />
        <text
          x="12"
          y="14.1"
          textAnchor="middle"
          fontSize="5.6"
          fontWeight="700"
          fill="currentColor"
          stroke="none"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          ABS
        </text>
      </svg>
    ),
  },
  {
    id: 'brzdy',
    color: RED,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="6.5" />
        <SideArcs />
        <path d="M12 8.6v4.2" />
        <circle cx="12" cy="15.4" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'tlak-pneu',
    color: AMBER,
    icon: (
      <svg {...iconProps}>
        <path d="M7 19.5c-1.8-2-2.8-4.6-2.8-7.4 0-2.6.8-4.9 2.2-6.6M17 19.5c1.8-2 2.8-4.6 2.8-7.4 0-2.6-.8-4.9-2.2-6.6" />
        <path d="M6 19.5h12" />
        <path d="M12 8.6v4.2" />
        <circle cx="12" cy="15.4" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[3.75rem] left-4 flex items-center gap-3 rounded-full border border-white/10 bg-ink/70 px-3.5 py-2 backdrop-blur-sm sm:bottom-14 sm:left-6 lg:bottom-5 lg:left-5"
    >
      <div className="flex items-center gap-2">
        {lights.map((light, index) => (
          <span
            key={light.id}
            className="dk-dash-icon block h-[18px] w-[18px]"
            style={{ '--c': light.color, '--i': index } as CSSProperties}
          >
            {light.icon}
          </span>
        ))}
      </div>
      <span className="h-4 w-px bg-white/15" />
      <span className="dk-dash-ok flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[#4ade80]">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
        Vše v pořádku
      </span>
    </div>
  );
}
