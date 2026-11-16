import BookingOptions from '@/components/BookingOptions';
import ContactCard from '@/components/ContactCard';
import PageHero from '@/components/PageHero';
import ServiceRequestForm from '@/components/ServiceRequestForm';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Objednat do autoservisu – Frýdek-Místek',
  description:
    'Objednejte se do autoservisu ve Frýdku-Místku: formulářem, přes WhatsApp nebo telefonem. Servis, přezutí i prověření auta před koupí. Termín potvrdím.',
  path: '/objednat',
});

export default function ObjednatPage() {
  return (
    <>
      <PageHero
        kicker="Objednávka"
        title="Objednat termín"
        lead="Vyberte si, co je pro vás nejpohodlnější. Termín vám potvrdím – a když budete mít fotku nebo video závady, pošlete ji, ať vím, co mám připravit."
        breadcrumbs={[{ label: 'Objednat', href: '/objednat' }]}
      />

      <Section tone="paper">
        <BookingOptions />
      </Section>

      <Section tone="white" id="formular" aria-labelledby="formular-nadpis" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeader id="formular-nadpis" title="Napište mi" />
            <div className="mt-8">
              <ServiceRequestForm />
            </div>
          </div>
          <aside aria-label="Kontakt">
            <ContactCard />
          </aside>
        </div>
      </Section>
    </>
  );
}
