import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import { sampleReport, verdictLabels } from '@/lib/inspection';

/**
 * Náhled reportu z prověrky – „karta výsledku“, jak ji zákazník dostane.
 * Data jsou ze smyšleného ukázkového vozu a karta to vždy říká.
 */
export default function ReportPreview({ limit = 6 }: { limit?: number }) {
  const verdict = verdictLabels[sampleReport.verdict];
  const findings = [...sampleReport.findings]
    .sort((a, b) => ['bad', 'warn', 'ok'].indexOf(a.status) - ['bad', 'warn', 'ok'].indexOf(b.status))
    .slice(0, limit);
  const counts = {
    ok: sampleReport.findings.filter((f) => f.status === 'ok').length,
    warn: sampleReport.findings.filter((f) => f.status === 'warn').length,
    bad: sampleReport.findings.filter((f) => f.status === 'bad').length,
  };

  return (
    <div className="overflow-hidden rounded-[var(--radius-card-lg)] bg-card text-ink shadow-2xl shadow-black/40 ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4 border-b border-mist px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">Ukázka reportu z prověrky</p>
          <p className="mt-1 font-display text-xl font-bold uppercase leading-tight">{sampleReport.car}</p>
          <p className="text-sm text-slate">
            {sampleReport.year} · {sampleReport.odometer}
          </p>
        </div>
        <span className="rounded-md bg-bad px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
          {verdict.label}
        </span>
      </div>

      <div className="grid grid-cols-3 border-b border-mist text-center text-sm">
        <div className="px-2 py-3">
          <p className="font-display text-2xl font-bold text-ok">{counts.ok}</p>
          <p className="text-slate">v pořádku</p>
        </div>
        <div className="border-x border-mist px-2 py-3">
          <p className="font-display text-2xl font-bold text-warn">{counts.warn}</p>
          <p className="text-slate">pozor</p>
        </div>
        <div className="px-2 py-3">
          <p className="font-display text-2xl font-bold text-bad">{counts.bad}</p>
          <p className="text-slate">vady</p>
        </div>
      </div>

      <ul className="divide-y divide-mist">
        {findings.map((finding) => (
          <li key={finding.label} className="flex items-start justify-between gap-3 px-5 py-3 max-md:nth-[n+4]:hidden">
            <div className="min-w-0">
              <p className="text-sm font-semibold">{finding.label}</p>
              {finding.note && <p className="mt-0.5 text-xs leading-relaxed text-slate">{finding.note}</p>}
            </div>
            <StatusBadge status={finding.status} compact />
          </li>
        ))}
      </ul>

      <Link
        href="/provereni-auta-pred-koupi/ukazkovy-report"
        className="flex items-center justify-between bg-mist/60 px-5 py-3 text-sm font-semibold hover:bg-mist"
      >
        Celý ukázkový report
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
