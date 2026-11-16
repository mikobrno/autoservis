import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react';
import { statusLabels, type FindingStatus } from '@/lib/inspection';

const styles: Record<FindingStatus, string> = {
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  bad: 'bg-bad-soft text-bad',
};

const icons = { ok: CircleCheck, warn: TriangleAlert, bad: CircleX };

/** Štítek stavu bodu prověrky: V pořádku / Pozor / Vada. Barva + ikona + text (nejen barva). */
export default function StatusBadge({ status, compact = false }: { status: FindingStatus; compact?: boolean }) {
  const Icon = icons[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold ${styles[status]} ${
        compact ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
