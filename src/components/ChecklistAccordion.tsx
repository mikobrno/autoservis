'use client';

import { useEffect, useRef } from 'react';
import { Check, Plus } from 'lucide-react';
import type { CheckSection } from '@/lib/inspection';

/**
 * Checklist prověrky. Na mobilu jsou sekce zavřené (jinak je stránka nekonečná),
 * od 768 px se po načtení otevřou všechny. Bez JavaScriptu zůstanou zavřené
 * a jdou rozkliknout – obsah je v HTML, takže ho vidí i vyhledávače.
 */
export default function ChecklistAccordion({ sections }: { sections: CheckSection[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    ref.current?.querySelectorAll('details').forEach((el) => {
      el.open = true;
    });
  }, []);

  return (
    <div ref={ref} className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {sections.map((section) => (
        <details key={section.id} className="group rounded-[var(--radius-card)] border border-line bg-steel">
          <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 md:cursor-default md:p-6 md:pb-0">
            <span>
              <span className="block font-display text-xl font-bold md:text-2xl">{section.title}</span>
              <span className="text-sm text-fog md:hidden">{section.points.length} bodů</span>
            </span>
            <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform md:hidden">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="px-4 pb-4 md:px-6 md:pb-6">
            <p className="mt-1 text-sm text-fog md:mt-2">{section.why}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {section.points.map((point) => (
                <li key={point.label} className="flex items-start justify-between gap-3">
                  <span className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden="true" />
                    {point.label}
                  </span>
                  {!point.onSite && (
                    <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-fog">
                      zvedák
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
