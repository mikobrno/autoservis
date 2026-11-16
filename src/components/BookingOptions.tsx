import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { bookingUrl, business, telHref, waHref } from '@/lib/contact';

/**
 * Tři cesty k termínu (plán: kalendář + formulář + WhatsApp). Kalendář
 * (Reservio) se ukáže, až bude v contact.ts `bookingUrl`.
 */
export default function BookingOptions({ waText }: { waText?: string }) {
  const tile =
    'group flex flex-col gap-3 rounded-[var(--radius-card)] border border-ink/10 bg-card p-5 transition hover:border-ink/40 hover:shadow-md';
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {bookingUrl ? (
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={tile}>
          <CalendarCheck className="h-7 w-7 text-ink" aria-hidden="true" />
          <span className="font-display text-xl font-bold uppercase">Termín online</span>
          <span className="text-sm text-slate">Vyberte si volný čas v kalendáři. Potvrzení přijde SMS.</span>
        </a>
      ) : (
        <a href="#formular" className={tile}>
          <CalendarCheck className="h-7 w-7 text-ink" aria-hidden="true" />
          <span className="font-display text-xl font-bold uppercase">Formulář</span>
          <span className="text-sm text-slate">Napište, s čím přijedete a kdy se vám to hodí. Termín potvrdím telefonem.</span>
        </a>
      )}
      {business.whatsapp && (
        <a href={waHref(waText)} target="_blank" rel="noopener noreferrer" className={tile}>
          <MessageCircle className="h-7 w-7 text-[#1fb857]" aria-hidden="true" />
          <span className="font-display text-xl font-bold uppercase">WhatsApp</span>
          <span className="text-sm text-slate">Pošlete fotku nebo video závady. Často poznám, co to je, ještě než přijedete.</span>
        </a>
      )}
      <a href={telHref(business.phone)} className={tile}>
        <Phone className="h-7 w-7 text-ink" aria-hidden="true" />
        <span className="font-display text-xl font-bold uppercase">Zavolat</span>
        <span className="text-sm text-slate">
          <strong className="text-ink">{business.phone}</strong>. Když zrovna nemůžu, jsem pod autem – zavolám zpátky.
        </span>
      </a>
    </div>
  );
}
