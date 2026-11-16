import BookingOptions from '@/components/BookingOptions';
import ContactCard from '@/components/ContactCard';
import GoogleRating from '@/components/GoogleRating';
import MapEmbed from '@/components/MapEmbed';
import PageHero from '@/components/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { business, fullAddress } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Kontakt – autoservis Palkovická, Frýdek-Místek',
  description:
    'Autoservis a pneuservis na Palkovické ve Frýdku-Místku. Telefon, WhatsApp, otevírací doba, mapa a navigace. Otevřeno ve všední dny i v sobotu.',
  path: '/kontakt',
});

export default function KontaktPage() {
  return (
    <>
      <PageHero
        kicker="Kontakt"
        title="Kde mě najdete"
        lead={`${fullAddress}. Nejrychleji mě zastihnete po telefonu nebo přes WhatsApp – když zrovna ležím pod autem, zavolám zpátky.`}
        breadcrumbs={[{ label: 'Kontakt', href: '/kontakt' }]}
      />

      <Section tone="paper">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactCard />
          <MapEmbed />
        </div>
      </Section>

      <Section tone="white" aria-labelledby="objednani">
        <SectionHeader id="objednani" title="Jak se objednat" />
        <div className="mt-10">
          <BookingOptions />
        </div>
      </Section>

      <Section tone="paper" aria-labelledby="recenze">
        <SectionHeader id="recenze" title={`${business.tradeName} na Googlu`} />
        <div className="mt-10">
          <GoogleRating variant="card" />
        </div>
      </Section>
    </>
  );
}
