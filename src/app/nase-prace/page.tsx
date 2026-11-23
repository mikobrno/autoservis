import { Instagram } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import JobCard from '@/components/JobCard';
import PageHero from '@/components/PageHero';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { business, instagramUrl } from '@/lib/contact';
import { getJobs } from '@/lib/jobsStore';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Zakázky z dílny – opravy aut Frýdek-Místek',
  description:
    'Skutečné opravy z dílny ve Frýdku-Místku: co zákazník řešil, co jsem našel a co jsem opravil. Škoda, Audi, BMW – podvozek, brzdy, převodovka i motor.',
  path: '/nase-prace',
});

/** Zakázky si Dennis mění přes Telegram – bot stránku po změně přegeneruje sám, tohle je jen pojistka. */
export const revalidate = 3600;

export default async function JobsPage() {
  const sorted = await getJobs();
  return (
    <>
      <PageHero
        kicker="Z dílny"
        title="Zakázky"
        lead="Co zákazníci řešili, co jsem našel a jak jsem to opravil. Skutečná auta a skutečné fotky – průběžně přidávám další."
        breadcrumbs={[{ label: 'Zakázky', href: '/nase-prace' }]}
        actions={
          <ButtonLink href={instagramUrl} variant="outlineDark" external>
            <Instagram className="h-5 w-5" aria-hidden="true" />
            Víc na Instagramu @{business.instagram}
          </ButtonLink>
        }
      />
      <Section tone="paper">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((job) => (
            <JobCard key={job.slug} job={job} headingLevel="h2" />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
