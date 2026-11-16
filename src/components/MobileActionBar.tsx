import Link from 'next/link';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { business, telHref, waHref } from '@/lib/contact';

/**
 * Pevná lišta na mobilu: Zavolat · WhatsApp · Objednat. Trend z amerických
 * servisů a dealerů – hlavní akce je vždy na dosah palce.
 */
export default function MobileActionBar() {
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold';
  return (
    <nav
      aria-label="Rychlý kontakt"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <a href={telHref(business.phone)} className={`${item} text-white`}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        Zavolat
      </a>
      {business.whatsapp && (
        <a href={waHref()} target="_blank" rel="noopener noreferrer" className={`${item} text-[#25d366]`}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          WhatsApp
        </a>
      )}
      <Link href="/objednat" className={`${item} bg-amber text-ink`}>
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        Objednat
      </Link>
    </nav>
  );
}
