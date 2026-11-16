import { CircleCheck, MessageCircle } from 'lucide-react';
import ButtonLink from '@/components/ui/Button';
import HexCluster from '@/components/ui/HexCluster';
import { business, waHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Děkuji, objednávka dorazila',
  description: 'Objednávka dorazila. Ozvu se vám a potvrdím termín.',
  path: '/dekujeme',
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-white md:py-32">
      <HexCluster className="pointer-events-none absolute -right-24 top-0 w-[520px] opacity-15" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <CircleCheck className="mx-auto h-16 w-16 text-ok" aria-hidden="true" />
        <h1 className="mt-6 font-display text-5xl font-bold uppercase">Díky, objednávka dorazila</h1>
        <p className="mt-6 text-lg leading-relaxed text-fog">
          Ozvu se vám a potvrdím termín. Pokud spěcháte nebo máte fotku či video závady, pošlete je rovnou na WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {business.whatsapp && (
            <ButtonLink href={waHref('Dobrý den, posílám fotky k objednávce z webu: ')} variant="whatsapp" size="lg" external>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Poslat fotky na WhatsApp
            </ButtonLink>
          )}
          <ButtonLink href="/" variant="outlineDark" size="lg">
            Zpět na úvod
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
