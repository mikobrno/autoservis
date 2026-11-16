import { czk, priceFootnote, tyrePriceTables } from '@/lib/pricing';

/**
 * Ceník pneuservisu podle rozměru kol – stejné tabulky jako Dennisův ceník
 * na Google profilu. Dvousloupcové řádky, na mobilu se nic neposouvá do strany.
 */
export default function TyrePriceTables({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {tyrePriceTables.map((table) => (
          <section
            key={table.id}
            aria-labelledby={`pneu-${table.id}`}
            className="rounded-[var(--radius-card-lg)] bg-card p-5 ring-1 ring-ink/5 md:p-6"
          >
            <Heading id={`pneu-${table.id}`} className="font-display text-2xl font-bold text-ink">
              {table.title}
            </Heading>
            <table className="mt-4 w-full text-left">
              <thead>
                <tr className="border-b border-ink/15 text-xs uppercase tracking-wide text-slate">
                  <th scope="col" className="pb-2 font-semibold">
                    {table.columns[0]}
                  </th>
                  <th scope="col" className="pb-2 text-right font-semibold">
                    {table.columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {table.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-2.5 pr-4 font-normal text-ink">
                      {row.label}
                    </th>
                    <td className="whitespace-nowrap py-2.5 text-right font-semibold text-ink">
                      {czk(row.price)}
                      {row.unit ? ` / ${row.unit}` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {table.notes && (
              <ul className="mt-3 space-y-1 text-sm leading-relaxed text-slate">
                {table.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold text-ink">{priceFootnote}</p>
    </div>
  );
}
