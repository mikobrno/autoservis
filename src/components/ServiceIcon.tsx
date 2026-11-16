import { CircleDot, ClipboardCheck, Cog, Disc3, Droplet, Gauge, SearchCheck, Wrench } from 'lucide-react';
import type { ServiceIcon as ServiceIconName } from '@/lib/services';

const icons = {
  diagnostika: Gauge,
  olej: Droplet,
  brzdy: Disc3,
  podvozek: Wrench,
  motor: Cog,
  stk: ClipboardCheck,
  pneu: CircleDot,
  proverka: SearchCheck,
} satisfies Record<ServiceIconName, unknown>;

export default function ServiceIcon({ name, className = 'h-6 w-6' }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
