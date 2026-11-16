import Image from 'next/image';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import HexCluster from '@/components/ui/HexCluster';
import { breadcrumbJsonLd, jsonLdScript } from '@/lib/seo';

type PageHeroProps = {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Drobečková navigace bez „Úvod“ – ten se přidá sám. */
  breadcrumbs: Array<{ label: string; href: string }>;
  image?: { src: string; alt: string };
  /** Vlastní obsah vpravo místo fotky (např. náhled reportu). */
  aside?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

/** Úvod podstránky: tmavá plocha, drobečky, jediný H1, volitelně fotka z dílny. */
export default function PageHero({ kicker, title, lead, breadcrumbs, image, aside, actions, children }: PageHeroProps) {
  const crumbs = [{ label: 'Úvod', href: '/' }, ...breadcrumbs];
  const hasSide = Boolean(image || aside);

  return (
    <section className="relative overflow-hidden bg-graphite text-white">
      <HexCluster animated className="pointer-events-none absolute -right-24 -top-16 w-[520px] opacity-15 max-md:hidden" />
      <div
        className={`relative mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-6 sm:px-6 md:pb-20 md:pt-10 lg:gap-10 ${
          hasSide ? 'lg:grid-cols-[1.15fr_0.85fr] lg:items-center' : ''
        }`}
      >
        <div>
          <Breadcrumbs items={crumbs} />
          <p className="kicker text-amber">{kicker}</p>
          <h1 className="mt-3 font-display text-[2.1rem] font-bold uppercase leading-[1] sm:text-5xl md:text-6xl">{title}</h1>
          {lead && <div className="mt-5 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">{lead}</div>}
          {actions && <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          {children}
        </div>
        {image && !aside && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-card-lg)] ring-1 ring-white/10 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 40vw, 66vw" className="object-cover" priority />
          </div>
        )}
        {aside}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, href: c.href }))))}
      />
    </section>
  );
}
