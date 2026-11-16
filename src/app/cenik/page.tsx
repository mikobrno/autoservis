import { CalendarCheck, Info } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import PriceList from '@/components/PriceList';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { hasPublishedPrices, priceGroups } from '@/lib/pricing';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ceník autoservisu a pneuservisu Frýdek-Místek',
  description:
    'Ceník servisu, pneuservisu a prověrky ojetiny ve Frýdku-Místku. Ceny jsou konečné, přesnou částku vám vždy řeknu předem – po prohlídce auta.',
  path: '/cenik',
});

export default function CenikPage() {
  return (
    <>
      <PageHero
        kicker="Ceník"
        title="Ceník"
        lead="Cenu vám vždy řeknu předem – po prohlídce auta, ne až na faktuře. Díly a náplně účtuji podle skutečnosti a jejich cenu znáte dřív, než je objednám."
        breadcrumbs={[{ label: 'Ceník', href: '/cenik' }]}
        actions={
          <ButtonLink href="/objednat" size="lg">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Objednat
          </ButtonLink>
        }
      />

      <Section tone="paper">
        {!hasPublishedPrices && (
          <p className="mb-8 flex gap-3 rounded-[var(--radius-card)] border border-ink/15 bg-amber-soft p-4 text-sm text-ink">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Ceník právě doplňuji. Do té doby vám cenu rád řeknu po telefonu nebo přes WhatsApp – stačí typ auta a co potřebujete.</span>
          </p>
        )}
        <div className="grid gap-6 lg:grid-cols-2">
          {priceGroups.map((group) => (
            <section key={group.id} aria-labelledby={`cenik-${group.id}`}>
              <PriceList group={group} />
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate">
          Ceny jsou orientační „od“ a platí pro běžná osobní auta. U větších vozů, SUV a dodávek se mohou lišit – vždy vám
          je řeknu předem.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
