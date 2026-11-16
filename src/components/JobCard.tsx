import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatDate, type Job } from '@/lib/jobs';

export default function JobCard({ job, headingLevel = 'h3' }: { job: Job; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card-lg)] bg-card ring-1 ring-ink/5 transition hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-steel">
        <Image
          src={job.image.src}
          alt={job.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 66vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-md bg-ink/85 px-2.5 py-1 font-display text-sm font-bold uppercase tracking-wide text-white">
          {job.car}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
          <time dateTime={job.date}>{formatDate(job.date)}</time>
        </p>
        <Heading className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-ink">
          <Link href={`/nase-prace/${job.slug}`} className="after:absolute after:inset-0">
            {job.title}
          </Link>
        </Heading>
        <p className="mt-3 text-sm leading-relaxed text-slate">{job.problem}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {job.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink">
              {tag}
            </span>
          ))}
          <ArrowRight className="ml-auto h-5 w-5 text-ink transition group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
