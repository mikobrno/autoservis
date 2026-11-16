import Image from 'next/image';
import { CalendarCheck, CircleDot } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import FaqList from '@/components/FaqList';
import PageHero from '@/components/PageHero';
import TyrePriceTables from '@/components/TyrePriceTables';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { faqByCategory } from '@/lib/faq';
import { formatPrice, getPrice } from '@/lib/pricing';
import { jsonLdScript, pageMetadata, serviceJsonLd } from '@/lib/seo';
import { tyreServices } from '@/lib/services';

const description =
  'Pneuservis ve Frýdku-Místku: výměna kol od 400 Kč, přezutí pneumatik od 700 Kč, oprava defektu od 200 Kč. Ceny podle rozměru kol, konečné.';

export const metadata = pageMetadata({
  title: 'Pneuservis Frýdek-Místek – přezutí a vyvážení',
  description,
  path: '/pneuservis',
});

export default function PneuservisPage() {
  return (
    <>
      <PageHero
        kicker="Pneuservis"
        title="Pneuservis ve Frýdku-Místku"
        lead="Přezutí, vyvážení a oprava defektu. Při přezutí zkontroluji dezén a stáří pneumatik a řeknu vám, jestli vydrží další sezónu."
        breadcrumbs={[{ label: 'Pneuservis', href: '/pneuservis' }]}
        image={{ src: '/images/dilna-bmw-e60.webp', alt: 'BMW na zvedáku, v pozadí stohy pneumatik' }}
        actions={
          <ButtonLink href="/objednat" size="lg">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Objednat přezutí
          </ButtonLink>
        }
      />

      <Section tone="paper" aria-labelledby="co-delam">
        <SectionHeader id="co-delam" title="Co dělám" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {tyreServices.map((item) => (
            <div key={item.name} className="rounded-[var(--radius-card-lg)] bg-card p-6 ring-1 ring-ink/5 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <CircleDot className="h-7 w-7 text-ink" aria-hidden="true" />
                {item.priceKey && <span className="text-base font-bold text-ink">{formatPrice(getPrice(item.priceKey))}</span>}
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink">{item.name}</h3>
              <p className="mt-2 leading-relaxed text-slate">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" aria-labelledby="dilna">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card-lg)] lg:aspect-[4/5]">
            <Image
              src="/images/dilna-jaguar.webp"
              alt="Zouvačka a vyvažovačka kol vedle Jaguaru v dílně"
              fill
              sizes="(min-width: 1024px) 45vw, 66vw"
              className="object-cover object-left"
            />
          </div>
          <div>
            <SectionHeader
              id="dilna"
              title="Při přezutí zkontroluji i brzdy"
              lead="Když už je auto na zvedáku, podívám se na kotouče, destičky, manžety a vůle v podvozku. Řeknu vám, jestli něco nečeká. Objednávat nic nemusíte."
            />
          </div>
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="cenik">
        <SectionHeader id="cenik" title="Ceník pneuservisu" lead="Ceny za sadu 4 kol podle rozměru. Uvedené ceny jsou konečné." />
        <div className="mt-8">
          <TyrePriceTables />
        </div>
      </Section>

      <Section tone="white" aria-labelledby="dotazy">
        <SectionHeader id="dotazy" title="Časté dotazy" />
        <div className="mt-10">
          <FaqList items={[...faqByCategory('pneuservis'), ...faqByCategory('obecne').slice(0, 2)]} withJsonLd />
        </div>
      </Section>

      <CtaBand title="Objednejte přezutí" waText="Dobrý den, chtěl/a bych objednat přezutí. Auto: " />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(serviceJsonLd({ name: 'Pneuservis', description, path: '/pneuservis' }))}
      />
    </>
  );
}
