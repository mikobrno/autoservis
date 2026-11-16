import Link from 'next/link';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import FaqList from '@/components/FaqList';
import PageHero from '@/components/PageHero';
import ProcessSteps from '@/components/ProcessSteps';
import ServiceIcon from '@/components/ServiceIcon';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { faqByCategory } from '@/lib/faq';
import { formatPrice, getPrice } from '@/lib/pricing';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata({
  title: 'Autoservis Frýdek-Místek – opravy a servis aut',
  description:
    'Autoservis ve Frýdku-Místku: diagnostika, výměna oleje, brzdy, podvozek, opravy motoru a příprava na STK. Závadu vám ukážu a cenu řeknu předem.',
  path: '/servis',
});

export default function ServisPage() {
  return (
    <>
      <PageHero
        kicker="Servis a opravy"
        title="Autoservis ve Frýdku-Místku"
        lead="Opravuji osobní auta běžných značek. Než začnu, víte, co se s autem děje a kolik bude oprava stát. Bez domluvy s vámi nic nedělám."
        breadcrumbs={[{ label: 'Servis', href: '/servis' }]}
        image={{ src: '/images/dilna-fiat-zvedak.webp', alt: 'Fiat na zvedáku v dílně, vedle BMW čekající na opravu' }}
        actions={
          <ButtonLink href="/objednat" size="lg">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Objednat do servisu
          </ButtonLink>
        }
      />

      <Section tone="paper" aria-labelledby="sluzby">
        <SectionHeader id="sluzby" title="Co opravuji" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servis/${service.slug}`}
              className="group flex flex-col rounded-[var(--radius-card-lg)] bg-card p-6 ring-1 ring-ink/5 transition hover:shadow-lg md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-amber">
                  <ServiceIcon name={service.icon} />
                </span>
                {getPrice(service.priceKey)?.price != null && (
                  <span className="text-sm font-semibold text-slate">{formatPrice(getPrice(service.priceKey))}</span>
                )}
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold uppercase text-ink">{service.name}</h2>
              <p className="mt-2 leading-relaxed text-slate">{service.short}</p>
              <ul className="mt-4 space-y-1 text-sm text-ink">
                {service.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber-dark" aria-hidden="true">
                      ▸
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-ink">
                Detail služby <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="white" aria-labelledby="postup">
        <SectionHeader id="postup" title="Jak oprava probíhá" />
        <div className="mt-10">
          <ProcessSteps />
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="dotazy">
        <SectionHeader id="dotazy" title="Časté dotazy" />
        <div className="mt-10">
          <FaqList items={[...faqByCategory('obecne'), ...faqByCategory('servis')]} withJsonLd />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
