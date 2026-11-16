import Image from 'next/image';
import { Check, MessageCircle, Minus } from 'lucide-react';
import ChecklistAccordion from '@/components/ChecklistAccordion';
import FaqList from '@/components/FaqList';
import PageHero from '@/components/PageHero';
import ReportPreview from '@/components/ReportPreview';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { business, waHref } from '@/lib/contact';
import { faqByCategory } from '@/lib/faq';
import { checklist, packages, totalPoints } from '@/lib/inspection';
import { formatPrice, getPrice } from '@/lib/pricing';
import { jsonLdScript, pageMetadata, serviceJsonLd } from '@/lib/seo';

const description =
  'Prověření ojetého auta před koupí ve Frýdku-Místku – u prodejce nebo v dílně na zvedáku. Kontrola km, laku a diagnostika. Report s fotkami a verdikt.';

export const metadata = pageMetadata({
  title: 'Prověření auta před koupí Frýdek-Místek',
  description,
  path: '/provereni-auta-pred-koupi',
});

const waText = 'Dobrý den, chtěl/a bych prověřit auto před koupí. Odkaz na inzerát: ';

const steps = [
  'Pošlete mi odkaz na inzerát přes WhatsApp nebo formulář. Často vám hned řeknu, na co si u daného auta dát pozor.',
  'Domluvíme termín. Za autem přijedu k prodejci, nebo ho přivezete ke mně do dílny. Klidně se domluvím přímo s prodejcem.',
  `Auto projdu podle checklistu – ${totalPoints} bodů od dokladů a laku přes motor a elektroniku po zkušební jízdu.`,
  'Výsledek vám řeknu hned a pošlu report s fotkami a odhadem oprav. Rozhodnutí je na vás.',
];

export default function ProverkaPage() {
  return (
    <>
      <PageHero
        kicker="Prověrka ojetiny"
        title="Prověření auta před koupí"
        lead="Než za ojeté auto zaplatíte, projdu ho za vás – u prodejce, nebo u sebe v dílně na zvedáku. S prodejcem nemám nic společného, takže vám řeknu, jak to s autem opravdu je."
        breadcrumbs={[{ label: 'Prověrka před koupí', href: '/provereni-auta-pred-koupi' }]}
        actions={
          <>
            <ButtonLink href="#objednat" size="lg">
              Objednat prověrku
            </ButtonLink>
            {business.whatsapp && (
              <ButtonLink href={waHref(waText)} variant="whatsapp" size="lg" external>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Poslat inzerát
              </ButtonLink>
            )}
          </>
        }
        aside={<ReportPreview limit={4} />}
      />

      {/* CO V INZERÁTU NEUVIDÍTE */}
      <Section tone="paper" aria-labelledby="proc">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div>
            <SectionHeader
              id="proc"
              title="Co v inzerátu neuvidíte"
              lead="Stočené kilometry, zamlčenou bouračku, smazané chyby v řídicí jednotce nebo rez na podlaze. To všechno se dá při prověrce najít."
            />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-[var(--radius-card)] bg-card p-4 ring-1 ring-ink/5 sm:p-5">
                <p className="font-display text-4xl font-bold text-bad sm:text-5xl">až 1/3</p>
                <p className="mt-2 text-sm text-slate">
                  ojetin může mít podle odhadu Cebie stočený tachometr.{' '}
                  <a
                    href="https://www.cebia.cz/novinky/tiskove-zpravy/informace-statistiky-a-zajimavosti-z-oblasti-prodeje-ojetych-vozidel-cebia-summary-2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    Zdroj
                  </a>
                </p>
              </div>
              <div className="rounded-[var(--radius-card)] bg-card p-4 ring-1 ring-ink/5 sm:p-5">
                <p className="font-display text-4xl font-bold text-ink sm:text-5xl">{totalPoints}</p>
                <p className="mt-2 text-sm text-slate">kontrolních bodů při prověrce v dílně</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card-lg)] lg:aspect-[4/5]">
            <Image
              src="/images/podvozek.webp"
              alt="Pohled zespodu na zavěšení kola na zvedáku"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* BALÍČKY */}
      <Section tone="white" aria-labelledby="balicky">
        <SectionHeader id="balicky" title="U prodejce, nebo na zvedáku" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {packages.map((pkg) => {
            const featured = pkg.id === 'dilna';
            return (
              <article
                key={pkg.id}
                className={`flex flex-col rounded-[var(--radius-card-lg)] p-6 md:p-8 ${
                  featured ? 'bg-ink text-white ring-2 ring-amber' : 'bg-paper text-ink ring-1 ring-ink/10'
                }`}
              >
                <p className={`text-sm font-semibold uppercase tracking-[0.12em] ${featured ? 'text-amber' : 'text-slate'}`}>
                  {pkg.tagline}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{pkg.name}</h2>
                <p className={`mt-1 text-sm ${featured ? 'text-fog' : 'text-slate'}`}>{pkg.where}</p>
                <p className="mt-5">
                  <span className="font-display text-4xl font-bold">{pkg.points}</span>{' '}
                  <span className={featured ? 'text-fog' : 'text-slate'}>kontrolních bodů</span>
                </p>
                <ul className="mt-5 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? 'text-amber' : 'text-ok'}`} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                  {pkg.missing?.map((item) => (
                    <li key={item} className={`flex gap-3 ${featured ? 'text-fog' : 'text-slate'}`}>
                      <Minus className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={`mt-5 text-sm ${featured ? 'text-fog' : 'text-slate'}`}>Hodí se, {pkg.bestFor}.</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                  <span className="text-lg font-bold">{formatPrice(getPrice(pkg.priceKey))}</span>
                  <ButtonLink href="#objednat" variant={featured ? 'primary' : 'outlineLight'}>
                    Objednat
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* CHECKLIST */}
      <section className="bg-graphite py-12 text-white md:py-20" aria-labelledby="checklist">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            id="checklist"
            onDark
            title="Co přesně kontroluji"
            lead="Celý checklist. Body označené „zvedák“ udělám jen při prověrce v dílně."
          />
          <div className="mt-8">
            <ChecklistAccordion sections={checklist} />
          </div>
        </div>
      </section>

      {/* POSTUP */}
      <Section tone="paper" aria-labelledby="postup">
        <SectionHeader id="postup" title="Jak prověrka probíhá" />
        <ol className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <p className="pt-1 leading-relaxed text-ink sm:text-lg">{step}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/provereni-auta-pred-koupi/ukazkovy-report" variant="outlineLight" className="mt-8">
          Ukázka reportu
        </ButtonLink>
      </Section>

      {/* FAQ */}
      <Section tone="white" aria-labelledby="dotazy">
        <SectionHeader id="dotazy" title="Časté dotazy k prověrce" />
        <div className="mt-8">
          <FaqList items={faqByCategory('proverka')} withJsonLd />
        </div>
      </Section>

      {/* OBJEDNÁVKA */}
      <Section tone="paper" id="objednat" aria-labelledby="objednat-nadpis" className="scroll-mt-16 lg:scroll-mt-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <SectionHeader
              id="objednat-nadpis"
              title="Objednat prověrku"
              lead="Vyplňte, co o autě víte, a já se vám ozvu s termínem. Rychlejší je poslat odkaz na inzerát přes WhatsApp."
            />
            {business.whatsapp && (
              <ButtonLink href={waHref(waText)} variant="whatsapp" size="lg" external className="mt-6 w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Poslat inzerát na WhatsApp
              </ButtonLink>
            )}
          </div>
          <div className="-mx-4 bg-card p-4 ring-1 ring-ink/5 sm:mx-0 sm:rounded-[var(--radius-card-lg)] sm:p-6 md:p-8">
            <ServiceRequestForm defaultType="proverka" />
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          serviceJsonLd({ name: 'Prověření auta před koupí', description, path: '/provereni-auta-pred-koupi' }),
        )}
      />
    </>
  );
}
