import Link from 'next/link';
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import CookieSettingsLink from '@/components/CookieSettingsLink';
import GoogleRating from '@/components/GoogleRating';
import Logo from '@/components/Logo';
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
import { services } from '@/lib/services';

export default function Footer() {
  const year = new Date().getFullYear();
  const linkCls = 'inline-block py-1 text-fog transition-colors hover:text-white';

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:grid-cols-4 lg:gap-12">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-fog">
            Poctivý autoservis a pneuservis ve Frýdku-Místku. Servis, opravy, přezutí a prověrka ojetých aut před koupí.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <GoogleRating onDark />
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-white hover:text-amber"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />@{business.instagram}
            </a>
          </div>
        </div>

        <div className="hidden md:block">
          <p className="font-display text-lg font-bold uppercase tracking-wide">Servis</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/servis/${service.slug}`} className={linkCls}>
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/pneuservis" className={linkCls}>
                Pneuservis
              </Link>
            </li>
            <li>
              <Link href="/provereni-auta-pred-koupi" className={linkCls}>
                Prověření auta před koupí
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-bold uppercase tracking-wide">Kontakt</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={googleDirectionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 py-1 text-fog transition-colors hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {fullAddress}
              </a>
            </li>
            <li>
              <a href={telHref(business.phone)} className="inline-flex gap-2 py-1 font-semibold text-white hover:text-amber">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {business.phone}
              </a>
            </li>
            {business.whatsapp && (
              <li>
                <a href={waHref()} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 py-1 text-fog transition-colors hover:text-white">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Napsat na WhatsApp
                </a>
              </li>
            )}
            {business.email && (
              <li>
                <a href={mailHref(business.email)} className={linkCls}>
                  {business.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-bold uppercase tracking-wide">Otevírací doba</p>
          <dl className="mt-4 space-y-2 text-sm">
            {openingHours.map((row) => (
              <div key={row.days} className="flex justify-between gap-6 border-b border-line pb-2">
                <dt className="text-fog">{row.days}</dt>
                <dd className="font-semibold">{formatHours(row.opens, row.closes)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-fog">Ve svátky se otevírací doba může lišit – radši zavolejte.</p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-fog sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.tradeName} · {business.owner}
            {business.ico ? ` · IČO ${business.ico}` : ''}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/ochrana-osobnich-udaju" className="inline-block py-2 hover:text-white">
              Ochrana osobních údajů
            </Link>
            <CookieSettingsLink className="py-2 hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
