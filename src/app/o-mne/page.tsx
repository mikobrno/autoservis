import Image from 'next/image';
import { Check, Instagram } from 'lucide-react';
import CtaBand from '@/components/CtaBand';
import GoogleRating from '@/components/GoogleRating';
import PageHero from '@/components/PageHero';
import ButtonLink from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { business, instagramUrl } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: `O mně – ${business.owner}, autoservis F-M`,
  description:
    'Proč jsem založil vlastní autoservis ve Frýdku-Místku: po špatných zkušenostech se servisy chci místo, kde zákazník přesně ví, za co platí. Poctivě.',
  path: '/o-mne',
});

/** Hodnoty ze starého webu (sekce „Objevte spolehlivost a férový přístup“), převedené do 1. osoby. */
const values = [
  {
    title: 'Individuální přístup',
    text: 'Dbám na vaše potřeby a vysvětlím každý krok opravy, abyste měli jistotu kvality.',
  },
  {
    title: 'Férové ceny',
    text: 'Cenová kalkulace je vždy jasná a bez skrytých poplatků. Znáte ji dřív, než začnu.',
  },
  {
    title: 'Kvalitní díly a pečlivá práce',
    text: 'Používám díly ověřených značek, aby auto dlouho vydrželo. A práci dělám tak, jako by šlo o moje auto.',
  },
];

const gallery = [
  { src: '/images/dilna-hex.webp', alt: 'Dílna pod šestiúhelníkovými světly, auta zákazníků a zvedáky' },
  { src: '/images/dilna-fiat-zvedak.webp', alt: 'Fiat na zvedáku a BMW čekající na opravu' },
  { src: '/images/dilna-zvedak.webp', alt: 'BMW na zvedáku během opravy' },
  { src: '/images/dilna-bmw-e60.webp', alt: 'BMW řady 5 mezi sloupy zvedáku, v pozadí pneumatiky' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="O mně"
        title={`Jsem ${business.ownerFirstName}`}
        lead="Autoservis jsem založil z jednoduchého důvodu: dělat věci jinak a hlavně poctivě."
        breadcrumbs={[{ label: 'O mně', href: '/o-mne' }]}
        // TODO(podklady): portrét Dennise v dílně – zatím fotka dílny
        image={{ src: '/images/dilna-jaguar.webp', alt: 'Dílna na Palkovické s vybavením pneuservisu' }}
      />

      <Section tone="paper" narrow>
        <div className="prose-dk text-lg text-ink">
          <h2 className="font-display uppercase">Proč vlastní servis</h2>
          <p>
            Když jsem se staral o svá auta, prošel jsem si bohužel několika velmi špatnými zkušenostmi se servisy. Odcházel
            jsem s pocitem, že jsem zaplatil víc, než bylo potřeba, že mi namontovali nekvalitní díly, nebo že práce nebyla
            odvedená tak, jak by měla.
          </p>
          <p>Často chyběla komunikace, férové jednání a hlavně důvěra.</p>
          <p>Právě to byl moment, kdy jsem si řekl, že to jde dělat lépe.</p>
          <p>
            Servis jsem založil s cílem nabídnout lidem místo, kde přesně vědí, za co platí. Místo, kde se používají kvalitní
            díly, práce se dělá pečlivě a kde je samozřejmostí otevřená komunikace. Ke každému autu přistupuji, jako by bylo
            moje vlastní.
          </p>
          <p className="font-semibold">– {business.owner}</p>
        </div>
      </Section>

      <Section tone="white" aria-labelledby="hodnoty">
        <SectionHeader id="hodnoty" title="Co ode mě můžete čekat" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-[var(--radius-card-lg)] bg-paper p-6 ring-1 ring-ink/5">
              <Check className="h-7 w-7 text-ok" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase text-ink">{value.title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{value.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-ink py-16 text-white md:py-24" aria-labelledby="dilna">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            id="dilna"
            onDark
            title="Palkovická 2204"
            lead="Zvedáky, diagnostika, zouvačka a vyvažovačka kol pod jednou střechou. A ta světla nad zvedáky nejsou jen na efekt – při dobrém světle se líp hledají vady."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GoogleRating onDark />
            <ButtonLink href={instagramUrl} variant="outlineDark" external>
              <Instagram className="h-5 w-5" aria-hidden="true" />@{business.instagram}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
