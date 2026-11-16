import { Plus } from 'lucide-react';
import type { FaqItem } from '@/lib/faq';
import { faqJsonLd, jsonLdScript } from '@/lib/seo';

type FaqListProps = {
  items: FaqItem[];
  /** FAQPage JSON-LD – jen na jedné stránce pro danou sadu otázek, ať se nedublují. */
  withJsonLd?: boolean;
};

/** Časté dotazy přes nativní <details> – funguje bez JavaScriptu a text je pro vyhledávače vidět. */
export default function FaqList({ items, withJsonLd = false }: FaqListProps) {
  return (
    <div className="divide-y divide-ink/10 rounded-[var(--radius-card-lg)] bg-card ring-1 ring-ink/5">
      {items.map((item) => (
        <details key={item.id} className="group px-5 md:px-7">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left">
            <span className="text-base font-semibold text-ink md:text-lg">{item.q}</span>
            <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-soft text-ink transition-transform duration-200">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="pb-6 leading-relaxed text-slate">{item.a}</p>
        </details>
      ))}
      {withJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(items))} />}
    </div>
  );
}
