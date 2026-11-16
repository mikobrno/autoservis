import { Clock, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  business,
  formatHours,
  fullAddress,
  googleDirectionsUrl,
  instagramUrl,
  mailHref,
  openingHours,
  telHref,
  waHref,
} from '@/lib/contact';

/** Kontakt + otevírací doba v jedné kartě (kontakt, objednávka). */
export default function ContactCard() {
  const row = 'flex gap-4 py-4';
  const icon = 'mt-0.5 h-5 w-5 shrink-0 text-ink';
  return (
    <div className="divide-y divide-ink/10 rounded-[var(--radius-card-lg)] bg-card px-6 ring-1 ring-ink/5">
      <div className={row}>
        <Phone className={icon} aria-hidden="true" />
        <div>
          <p className="text-sm text-slate">Telefon</p>
          <a href={telHref(business.phone)} className="inline-block py-1.5 text-lg font-bold text-ink hover:underline">
            {business.phone}
          </a>
          {business.whatsapp && (
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-2 text-sm font-semibold text-[#128c4a] hover:underline"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> i přes WhatsApp
            </a>
          )}
          {business.email && (
            <a href={mailHref(business.email)} className="block py-2 text-sm text-ink hover:underline">
              {business.email}
            </a>
          )}
        </div>
      </div>
      <div className={row}>
        <MapPin className={icon} aria-hidden="true" />
        <div>
          <p className="text-sm text-slate">Adresa dílny</p>
          <p className="font-semibold text-ink">{fullAddress}</p>
          <a
            href={googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 text-sm font-semibold text-ink underline underline-offset-2"
          >
            Navigovat
          </a>
        </div>
      </div>
      <div className={row}>
        <Clock className={icon} aria-hidden="true" />
        <div className="w-full">
          <p className="text-sm text-slate">Otevírací doba</p>
          <dl className="mt-1 space-y-1">
            {openingHours.map((hours) => (
              <div key={hours.days} className="flex justify-between gap-4">
                <dt className="text-ink">{hours.days}</dt>
                <dd className="font-semibold text-ink">{formatHours(hours.opens, hours.closes)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className={row}>
        <Instagram className={icon} aria-hidden="true" />
        <div>
          <p className="text-sm text-slate">Instagram</p>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2 font-semibold text-ink hover:underline">
            @{business.instagram}
          </a>
        </div>
      </div>
    </div>
  );
}
