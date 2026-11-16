import { formatPrice, type PriceGroup } from '@/lib/pricing';

/** Ceník jedné skupiny. Neověřené ceny se zobrazují jako „na dotaz“. */
export default function PriceList({ group, showHeading = true }: { group: PriceGroup; showHeading?: boolean }) {
  return (
    <div className="rounded-[var(--radius-card-lg)] bg-card p-6 ring-1 ring-ink/5 md:p-8">
      {showHeading && (
        <>
          <h2 id={`cenik-${group.id}`} className="font-display text-3xl font-bold uppercase text-ink">
            {group.title}
          </h2>
          <p className="mt-2 text-sm text-slate">{group.lead}</p>
        </>
      )}
      <dl className={`${showHeading ? 'mt-6' : ''} divide-y divide-ink/10`}>
        {group.items.map((item) => (
          <div key={item.name} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="text-ink">
              {item.name}
              {item.note && <span className="block text-xs text-slate">{item.note}</span>}
            </dt>
            <dd className={`shrink-0 text-right font-semibold ${item.price === null ? 'text-slate' : 'text-ink'}`}>
              {formatPrice(item)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
