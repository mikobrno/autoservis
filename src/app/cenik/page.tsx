import Link from 'next/link';
import { CalendarCheck, MessageCircle } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import PriceList from '@/components/PriceList';
import TyrePriceTables from '@/components/TyrePriceTables';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { business, waHref } from '@/lib/contact';
import { groupHasPrices, priceGroups } from '@/lib/pricing';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ceník pneuservisu a autoservisu Frýdek-Místek',
  description:
    'Ceník přezutí pneumatik podle rozměru kol od 700 Kč, výměna kol od 400 Kč, defekt od 200 Kč. Ceny jsou konečné. Servis a opravy cenově předem.',
  path: '/cenik',
});

export default function CenikPage() {
  const otherGroups = priceGroups.filter((group) => group.id !== 'pneuservis');

  return (
    <>
      <PageHero
        kicker="Ceník"
        title="Ceník"
        lead="Pneuservis má pevné ceny podle rozměru kol. U oprav vám cenu řeknu po prohlídce auta, ještě než začnu – ne až na faktuře."
        breadcrumbs={[{ label: 'Ceník', href: '/cenik' }]}
        actions={
          <ButtonLink href="/objednat" size="lg">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Objednat
          </ButtonLink>
        }
      />

      <Section tone="paper" aria-labelledby="cenik-pneuservis">
        <SectionHeader id="cenik-pneuservis" title="Pneuservis" />
        <div className="mt-8">
          <TyrePriceTables />
        </div>
      </Section>

      <Section tone="white" aria-labelledby="cenik-servis">
        <SectionHeader
          id="cenik-servis"
          title="Servis, opravy a prověrka"
          lead="Každé auto je jiné, proto cenu opravy řeknu až po prohlídce – vždy předem a bez skrytých poplatků. Díly a náplně účtuji podle skutečnosti."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {otherGroups.map((group) =>
            groupHasPrices(group) ? (
              <PriceList key={group.id} group={group} />
            ) : (
              <section key={group.id} className="rounded-[var(--radius-card-lg)] bg-paper p-6 ring-1 ring-ink/5">
                <h3 className="font-display text-2xl font-bold text-ink">{group.title}</h3>
                <ul className="mt-4 space-y-1.5 text-ink">
                  {group.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate">{group.lead}</p>
              </section>
            ),
          )}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {business.whatsapp && (
            <ButtonLink
              href={waHref('Dobrý den, kolik by stála tahle oprava? Auto: ')}
              variant="whatsapp"
              size="lg"
              external
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Zeptat se na cenu
            </ButtonLink>
          )}
          <Link href="/servis" className="inline-flex items-center py-3 font-semibold text-ink underline underline-offset-4">
            Co všechno opravuji
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
