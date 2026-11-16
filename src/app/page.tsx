import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, Check, ChevronRight, Clock, MessageCircle } from 'lucide-react';
import ContactCard from '@/components/ContactCard';
import CtaBand from '@/components/CtaBand';
import FaqList from '@/components/FaqList';
import GoogleRating from '@/components/GoogleRating';
import HeroLights from '@/components/HeroLights';
import JobCard from '@/components/JobCard';
import MapEmbed from '@/components/MapEmbed';
import ProcessSteps from '@/components/ProcessSteps';
import ReportPreview from '@/components/ReportPreview';
import ServiceIcon from '@/components/ServiceIcon';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { business, formatHours, openingHours, waHref } from '@/lib/contact';
import { homepageFaq } from '@/lib/faq';
import { totalPoints } from '@/lib/inspection';
import { jobs } from '@/lib/jobs';
import { formatPrice, getPrice } from '@/lib/pricing';
import { services } from '@/lib/services';

const pillars = [
  {
    href: '/servis',
    title: 'Servis a opravy',
    text: 'Diagnostika, olej, brzdy, podvozek, motor a příprava na STK.',
    image: { src: '/images/dilna-fiat-zvedak.webp', alt: 'Fiat na zvedáku v dílně' },
  },
  {
    href: '/pneuservis',
    title: 'Pneuservis',
    text: `Výměna kol ${formatPrice(getPrice('prezuti-kola'))}, přezutí pneumatik ${formatPrice(getPrice('prezuti-pneu'))}, defekty.`,
    image: { src: '/images/dilna-bmw-e60.webp', alt: 'BMW mezi sloupy zvedáku, v pozadí pneumatiky' },
  },
  {
    href: '/provereni-auta-pred-koupi',
    title: 'Prověrka před koupí',
    text: 'Ojeté auto prověřím u prodejce nebo u sebe na zvedáku.',
    image: { src: '/images/podvozek.webp', alt: 'Podvozek ojetého auta na zvedáku' },
  },
];

/** Na mobilu vodorovný posuvník (scroll-snap), od md mřížka. */
const rail =
  '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden';
const railItem = 'w-[78%] shrink-0 snap-start sm:w-[45%] md:w-auto';

export default function HomePage() {
  const weekday = openingHours[0];
  const saturday = openingHours[1];

  return (
    <>
      {/* HERO – na mobilu fotka nahoře, od lg dva sloupce. HeroLights = „rozsvícení dílny“. */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-6 lg:py-16">
          {/* Na mobilu fotka nahoře jako pás s výřezem na auto, na desktopu karta vpravo. */}
          <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/9] lg:order-2 lg:aspect-[4/5] lg:rounded-[var(--radius-card-lg)] lg:ring-1 lg:ring-white/10">
            <Image
              src="/images/dilna-jaguar.webp"
              alt="Jaguar XF v dílně pod šestiúhelníkovými světly, vlevo zouvačka a vyvažovačka kol"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 66vw"
              className="object-cover object-[50%_62%] lg:object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent lg:hidden" aria-hidden="true" />
            <HeroLights />
          </div>

          <div className="relative -mt-8 px-4 pb-10 sm:px-6 lg:order-1 lg:mt-0 lg:p-0">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-amber">
              {business.city} · {business.street}
            </p>
            <h1 className="mt-3 font-display text-[2.75rem] font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              Autoservis, kde víte, <span className="dk-neon text-amber">za co platíte</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Jmenuji se {business.ownerFirstName} a na Palkovické opravuji auta. Než cokoliv vyměním, ukážu vám, co je
              špatně, a řeknu, kolik to bude stát.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href="/objednat"size="lg">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Objednat
              </ButtonLink>
              {business.whatsapp && (
                <ButtonLink href={waHref()} variant="whatsapp"size="lg" external>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp
                </ButtonLink>
              )}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <GoogleRating onDark />
              <p className="flex items-start gap-2 text-sm text-white/75">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                <span>
                  {weekday.days} {formatHours(weekday.opens, weekday.closes)}, So {formatHours(saturday.opens, saturday.closes)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CO DĚLÁM – fotky z dílny místo ikonek */}
      <Section tone="paper" aria-labelledby="sluzby-nadpis">
        <SectionHeader id="sluzby-nadpis" title="Co pro vás udělám" />
        <div className={`mt-8 ${rail}`}>
          {pillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className={`group overflow-hidden rounded-[var(--radius-card-lg)] bg-card ring-1 ring-ink/5 transition hover:shadow-xl ${railItem}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-steel">
                <Image
                  src={pillar.image.src}
                  alt={pillar.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 55vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="flex items-center justify-between gap-2 font-display text-2xl font-bold text-ink">
                  {pillar.title}
                  <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{pillar.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* PROVĚRKA PŘED KOUPÍ */}
      <section className="bg-graphite py-12 text-white md:py-20" aria-labelledby="proverka-nadpis">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <SectionHeader
              id="proverka-nadpis"
              onDark
              kicker="Kupujete ojeté auto?"
              title="Prověřím ho dřív, než za něj zaplatíte"
              lead="Pošlete mi inzerát. Za autem přijedu k prodejci, nebo ho prověřím u sebe na zvedáku. S prodejcem nemám nic společného, takže vám řeknu, jak to s autem opravdu je."
            />
            <ul className="mt-6 space-y-2.5">
              {[
                `${totalPoints} bodů od dokladů a laku po zkušební jízdu`,
                'diagnostika řídicích jednotek a kontrola kilometrů',
                'report s fotkami vad a odhadem oprav',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
                  <span className="sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/provereni-auta-pred-koupi" size="lg">
                Jak prověrka probíhá
              </ButtonLink>
              <ButtonLink href="/provereni-auta-pred-koupi/ukazkovy-report" variant="outlineDark" size="lg">
                Ukázka reportu
              </ButtonLink>
            </div>
          </div>
          <ReportPreview limit={4} />
        </div>
      </section>

      {/* SLUŽBY – na mobilu kompaktní řádky */}
      <Section tone="paper" aria-labelledby="servis-nadpis">
        <SectionHeader id="servis-nadpis" title="S čím vám pomůžu" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const price = getPrice(service.priceKey);
            return (
              <li key={service.slug}>
                <Link
                  href={`/servis/${service.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[var(--radius-card)] bg-card p-4 ring-1 ring-ink/5 transition hover:ring-ink/30 sm:items-start sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-soft text-ink">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold text-ink">{service.name}</span>
                    <span className="mt-1 hidden text-sm leading-relaxed text-slate sm:block">{service.short}</span>
                    {price?.price != null && (
                      <span className="mt-1 block text-sm font-semibold text-ink">{formatPrice(price)}</span>
                    )}
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate sm:hidden" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/cenik" className="mt-6 inline-flex items-center gap-2 py-2 font-semibold text-ink hover:underline">
          Ceník <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Section>

      {/* JAK TO U MĚ CHODÍ */}
      <Section tone="white" aria-labelledby="postup-nadpis">
        <SectionHeader
          id="postup-nadpis"
          title="Jak to u mě chodí"
          lead="Sám jsem ze servisů odcházel s pocitem, že jsem zaplatil víc, než bylo potřeba. U mě víte předem, co se bude dělat a za kolik."
        />
        <div className="mt-8">
          <ProcessSteps />
        </div>
      </Section>

      {/* ZAKÁZKY */}
      <Section tone="paper" aria-labelledby="prace-nadpis">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader id="prace-nadpis" title="Poslední zakázky" />
          <Link href="/nase-prace" className="hidden shrink-0 items-center gap-2 py-2 font-semibold text-ink hover:underline sm:inline-flex">
            Všechny <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className={`mt-8 ${rail}`}>
          {jobs.map((job) => (
            <div key={job.slug} className={railItem}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
        <Link href="/nase-prace" className="mt-4 inline-flex items-center gap-2 py-2 font-semibold text-ink sm:hidden">
          Všechny zakázky <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Section>

      {/* O MNĚ */}
      <section className="bg-ink py-12 text-white md:py-20" aria-labelledby="omne-nadpis">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card-lg)] lg:aspect-[3/4]">
            <Image
              src="/images/dilna-hex.webp"
              alt="Dílna na Palkovické se šestiúhelníkovými světly nad zvedáky"
              fill
              sizes="(min-width: 1024px) 40vw, 66vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div>
            <SectionHeader id="omne-nadpis" onDark title="Dělat věci jinak a hlavně poctivě" />
            <div className="mt-5 space-y-4 leading-relaxed text-fog sm:text-lg">
              <p>
                Když jsem se staral o svá auta, prošel jsem si několika špatnými zkušenostmi se servisy. Odcházel jsem s
                pocitem, že jsem zaplatil víc, než bylo potřeba, že mi namontovali nekvalitní díly, nebo že práce nebyla
                odvedená, jak měla.
              </p>
              <p className="text-white">
                Proto jsem založil vlastní servis. Místo, kde přesně víte, za co platíte. Ke každému autu přistupuji, jako
                by bylo moje vlastní.
              </p>
            </div>
            <p className="mt-5 text-sm text-fog">{business.owner}</p>
            <ButtonLink href="/o-mne" variant="outlineDark" className="mt-6">
              O mně a o dílně
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* HODNOCENÍ */}
      <Section tone="paper" aria-labelledby="recenze-nadpis">
        <SectionHeader id="recenze-nadpis" title="Hodnocení na Googlu" />
        <div className="mt-8">
          <GoogleRating variant="card" />
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white" aria-labelledby="faq-nadpis">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <SectionHeader id="faq-nadpis" title="Časté dotazy" />
          <FaqList items={homepageFaq} />
        </div>
      </Section>

      {/* KONTAKT */}
      <Section tone="paper" aria-labelledby="kontakt-nadpis">
        <SectionHeader id="kontakt-nadpis" title="Kde mě najdete" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactCard />
          <MapEmbed />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
