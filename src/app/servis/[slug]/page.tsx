import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarCheck, Check, MessageCircle, TriangleAlert } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import JobCard from '@/components/JobCard';
import PageHero from '@/components/PageHero';
import ServiceIcon from '@/components/ServiceIcon';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { business, waHref } from '@/lib/contact';
import { getJobs } from '@/lib/jobsStore';
import { formatPrice, getPrice } from '@/lib/pricing';
import { jsonLdScript, pageMetadata, serviceJsonLd } from '@/lib/seo';
import { getService, services } from '@/lib/services';

type Props = { params: Promise<{ slug: string }> };

// Musí být true: stránka se kvůli zakázkám přegenerovává (revalidate) a s `false`
// ji Netlify po prvním přegenerování začne vracet jako 404 (stalo se 23. 11. 2026).
// Neznámý slug stejně skončí na notFound() níže.
export const dynamicParams = true;
/** Zakázky si Dennis mění přes Telegram – bot stránku po změně přegeneruje sám, tohle je jen pojistka. */
export const revalidate = 3600;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.description, path: `/servis/${service.slug}` });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const price = getPrice(service.priceKey);
  const relatedJobs = (await getJobs()).filter((job) => job.serviceSlug === service.slug);
  const otherServices = services.filter((other) => other.slug !== service.slug);

  return (
    <>
      <PageHero
        kicker="Servis"
        title={service.h1}
        lead={service.intro}
        breadcrumbs={[
          { label: 'Servis', href: '/servis' },
          { label: service.name, href: `/servis/${service.slug}` },
        ]}
        image={service.image}
        actions={
          <>
            <ButtonLink href="/objednat" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Objednat
            </ButtonLink>
            {business.whatsapp && (
              <ButtonLink href={waHref(service.waText)} variant="whatsapp" size="lg" external>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Poslat fotku na WhatsApp
              </ButtonLink>
            )}
          </>
        }
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
          {price?.price != null ? (
            <>
              Cena: <strong className="text-white">{formatPrice(price)}</strong>
              <span className="text-fog">· přesně po prohlídce</span>
            </>
          ) : (
            <span className="text-fog">Cenu vám řeknu po prohlídce, ještě než začnu.</span>
          )}
        </p>
      </PageHero>

      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card-lg)] bg-card p-6 ring-1 ring-ink/5 md:p-8">
            <h2 className="flex items-center gap-3 font-display text-3xl font-bold uppercase text-ink">
              <TriangleAlert className="h-7 w-7 text-warn" aria-hidden="true" />
              Kdy přijet
            </h2>
            <ul className="mt-6 space-y-3">
              {service.signs.map((sign) => (
                <li key={sign} className="flex gap-3 text-ink">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-warn" aria-hidden="true" />
                  {sign}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--radius-card-lg)] bg-ink p-6 text-white md:p-8">
            <h2 className="flex items-center gap-3 font-display text-3xl font-bold uppercase">
              <ServiceIcon name={service.icon} className="h-7 w-7 text-amber" />
              Co udělám
            </h2>
            <ul className="mt-6 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            {service.note && <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-fog">{service.note}</p>}
          </div>
        </div>
      </Section>

      {relatedJobs.length > 0 && (
        <Section tone="white" aria-labelledby="zakazky">
          <SectionHeader id="zakazky" title="Podobné zakázky" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="paper" aria-labelledby="dalsi">
        <SectionHeader id="dalsi" title="Další služby" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/servis/${other.slug}`}
                className="group flex items-center gap-3 rounded-[var(--radius-card)] bg-card p-4 font-semibold text-ink ring-1 ring-ink/5 hover:ring-ink/30"
              >
                <ServiceIcon name={other.icon} className="h-5 w-5 text-slate" />
                {other.name}
                <ArrowRight className="ml-auto h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/provereni-auta-pred-koupi"
              className="group flex items-center gap-3 rounded-[var(--radius-card)] bg-card p-4 font-semibold text-ink ring-1 ring-ink/5 hover:ring-ink/30"
            >
              <ServiceIcon name="proverka" className="h-5 w-5 text-slate" />
              Prověření auta před koupí
              <ArrowRight className="ml-auto h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </Section>

      <CtaBand waText={service.waText} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          serviceJsonLd({ name: service.name, description: service.description, path: `/servis/${service.slug}` }),
        )}
      />
    </>
  );
}
