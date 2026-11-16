import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Lightbulb } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import JobCard from '@/components/JobCard';
import PageHero from '@/components/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { formatDate, getJob, jobs } from '@/lib/jobs';
import { pageMetadata } from '@/lib/seo';
import { getService } from '@/lib/services';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

/** Popis 120–155 znaků poskládaný z dat zakázky. */
const describe = (car: string, problem: string) => {
  const text = `${car}: ${problem} Co jsem našel, co jsem vyměnil a proč – zakázka z dílny ve Frýdku-Místku.`;
  return text.length > 155 ? `${text.slice(0, 152).trimEnd()}…` : text;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  const title = `${job.car} – ${job.title}`;
  return pageMetadata({
    title: title.length > 60 ? `${title.slice(0, 59).trimEnd()}…` : title,
    description: describe(job.car, job.problem),
    path: `/nase-prace/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const service = job.serviceSlug ? getService(job.serviceSlug) : undefined;
  const others = jobs.filter((other) => other.slug !== job.slug);

  return (
    <>
      <PageHero
        kicker={job.car}
        title={job.title}
        lead={job.problem}
        breadcrumbs={[
          { label: 'Zakázky', href: '/nase-prace' },
          { label: job.car, href: `/nase-prace/${job.slug}` },
        ]}
      >
        <p className="mt-6 text-sm text-fog">
          <time dateTime={job.date}>{formatDate(job.date)}</time> · {job.tags.join(' · ')}
        </p>
      </PageHero>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card-lg)] bg-steel">
            <Image
              src={job.image.src}
              alt={job.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-ink">Co jsem udělal</h2>
            <ul className="mt-6 space-y-4">
              {job.work.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-relaxed text-ink">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ok" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3 rounded-[var(--radius-card)] bg-amber-soft p-5 text-ink">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="leading-relaxed">{job.takeaway}</p>
            </div>
            {service && (
              <Link
                href={`/servis/${service.slug}`}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-ink hover:underline"
              >
                Služba: {service.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="white" aria-labelledby="dalsi">
          <SectionHeader id="dalsi" title="Další zakázky" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <JobCard key={other.slug} job={other} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
