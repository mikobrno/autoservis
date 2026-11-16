import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import ButtonLink from '@/components/ui/Button';
import { business, telHref, waHref } from '@/lib/contact';

type CtaBandProps = {
  title?: string;
  text?: string;
  /** Předvyplněná zpráva do WhatsAppu podle stránky. */
  waText?: string;
};

/**
 * Výzva k objednání na konci stránek. Na mobilu jen „Objednat" – telefon
 * a WhatsApp jsou ve spodní liště (MobileActionBar), nemá smysl je opakovat.
 */
export default function CtaBand({
  title = 'Objednejte se',
  text = 'Zavolejte, napište na WhatsApp, nebo vyplňte krátký formulář. Fotka nebo video závady mi hodně pomůže.',
  waText,
}: CtaBandProps) {
  return (
    <section className="bg-ink py-12 text-white md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-[2rem] font-bold leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 leading-relaxed text-fog sm:text-lg">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/objednat" size="lg" className="w-full sm:w-auto">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Objednat termín
          </ButtonLink>
          <ButtonLink href={telHref(business.phone)} variant="outlineDark" size="lg" className="max-sm:hidden">
            <Phone className="h-5 w-5" aria-hidden="true" />
            {business.phone}
          </ButtonLink>
          {business.whatsapp && (
            <ButtonLink href={waHref(waText)} variant="whatsapp" size="lg" external className="max-sm:hidden">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
