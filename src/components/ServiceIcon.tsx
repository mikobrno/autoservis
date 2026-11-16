import { ClipboardCheck, Cog, Disc3, Droplet, Gauge, SearchCheck, Wrench } from 'lucide-react';
import type { ServiceIcon as ServiceIconName } from '@/lib/services';

/** Kolo s paprsky – na rozdíl od kroužku s tečkou je vidět, že se kutálí. Kreslené ve stylu lucide. */
function TyreIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
      <path d="M12 7v4M16.75 10.45l-3.8 1.24M14.94 16.05l-2.35-3.24M9.06 16.05l2.35-3.24M7.25 10.45l3.8 1.24" />
    </svg>
  );
}

const icons = {
  diagnostika: Gauge,
  olej: Droplet,
  brzdy: Disc3,
  podvozek: Wrench,
  motor: Cog,
  stk: ClipboardCheck,
  pneu: TyreIcon,
  proverka: SearchCheck,
} satisfies Record<ServiceIconName, unknown>;

/**
 * Ikona služby s krátkou animací podle významu (globals.css, .dk-ico-*):
 * ručička budíku švihne, kapka oleje ukápne, brzdový kotouč se roztočí a zabrzdí,
 * klíč se pootočí, ozubené kolo otočí, odškrtne se protokol, kolo přijede, lupa prohledá.
 * Spustí se jednou, když ikona dojede na obrazovku (data-reveal → RevealObserver),
 * a znovu při najetí myší na kartu (odkaz nebo [data-ico-card]).
 */
export default function ServiceIcon({ name, className = 'h-6 w-6' }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return (
    <span data-reveal="icon" className={`dk-ico dk-ico-${name}`}>
      <Icon className={className} aria-hidden="true" />
    </span>
  );
}
