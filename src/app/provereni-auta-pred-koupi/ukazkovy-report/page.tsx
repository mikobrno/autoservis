import { Info, Wrench } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import PageHero from '@/components/PageHero';
import StatusBadge from '@/components/StatusBadge';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { sampleReport, verdictLabels, type Finding } from '@/lib/inspection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ukázkový report z prověrky ojetého auta',
  description:
    'Takhle vypadá report z prověrky ojetiny před koupí: verdikt, stav každého bodu, nálezy s poznámkami a odhad nákladů na opravy. Ukázka na smyšleném autě.',
  path: '/provereni-auta-pred-koupi/ukazkovy-report',
});

const verdictStyle = {
  doporucuji: 'bg-ok text-white',
  'se-slevou': 'bg-warn text-white',
  nedoporucuji: 'bg-bad text-white',
};

export default function SampleReportPage() {
  const verdict = verdictLabels[sampleReport.verdict];
  const sections = sampleReport.findings.reduce<Record<string, Finding[]>>((acc, finding) => {
    (acc[finding.section] ??= []).push(finding);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        kicker="Ukázka"
        title="Ukázkový report z prověrky"
        lead="Tohle dostanete po prověrce: verdikt, stav každého bodu, nálezy s poznámkami a odhad nákladů na opravy. Ve skutečném reportu jsou u každé vady i fotky."
        breadcrumbs={[
          { label: 'Prověrka před koupí', href: '/provereni-auta-pred-koupi' },
          { label: 'Ukázkový report', href: '/provereni-auta-pred-koupi/ukazkovy-report' },
        ]}
      />

      <Section tone="paper" narrow>
        <p className="flex gap-3 rounded-[var(--radius-card)] border border-ink/15 bg-amber-soft p-4 text-sm text-ink">
          <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            <strong>Jde o ukázku na smyšleném autě.</strong> Hodnoty slouží jen k tomu, abyste viděli, jak report vypadá.
          </span>
        </p>

        <article className="mt-8 overflow-hidden rounded-[var(--radius-card-lg)] bg-card ring-1 ring-ink/10">
          <header className="border-b border-mist p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">{sampleReport.package}</p>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase text-ink">{sampleReport.car}</h2>
            <p className="mt-1 text-slate">
              Rok výroby {sampleReport.year} · {sampleReport.odometer}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className={`rounded-md px-3 py-1.5 font-display text-xl font-bold uppercase ${verdictStyle[sampleReport.verdict]}`}>
                {verdict.label}
              </span>
              <span className="text-sm text-slate">{verdict.text}</span>
            </div>
            <p className="mt-6 leading-relaxed text-ink">{sampleReport.summary}</p>
          </header>

          {Object.entries(sections).map(([section, findings]) => (
            <section key={section} className="border-b border-mist px-6 py-5 md:px-8">
              <h3 className="font-display text-xl font-bold uppercase text-slate">{section}</h3>
              <ul className="mt-3 divide-y divide-mist">
                {findings.map((finding) => (
                  <li key={finding.label} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-ink">{finding.label}</p>
                      {finding.note && <p className="mt-0.5 text-sm text-slate">{finding.note}</p>}
                    </div>
                    <StatusBadge status={finding.status} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <footer className="flex gap-3 bg-ink p-6 text-white md:p-8">
            <Wrench className="mt-1 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <p className="font-display text-xl font-bold uppercase">Odhad nákladů na opravy</p>
              <p className="mt-1 text-fog">{sampleReport.repairEstimate}</p>
            </div>
          </footer>
        </article>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/provereni-auta-pred-koupi#objednat" size="lg">
            Objednat prověrku
          </ButtonLink>
          <ButtonLink href="/provereni-auta-pred-koupi" variant="outlineLight" size="lg">
            Zpět na prověrku
          </ButtonLink>
        </div>
      </Section>

      <CtaBand
        title="Objednat prověrku"
        text="Pošlete mi odkaz na inzerát a domluvíme termín, ideálně dřív, než prodejce auto prodá někomu jinému."
        waText="Dobrý den, chtěl/a bych prověřit auto před koupí. Odkaz na inzerát: "
      />
    </>
  );
}
