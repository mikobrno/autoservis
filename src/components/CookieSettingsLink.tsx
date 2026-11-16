'use client';

import { resetConsent } from '@/lib/analytics';

/**
 * Odvolání souhlasu. GDPR vyžaduje, aby to šlo stejně snadno jako souhlas udělit –
 * proto je odkaz trvale v patičce. Smaže uložené rozhodnutí, vypne měření
 * a znovu zobrazí lištu, aniž by se stránka musela načítat znovu.
 */
export default function CookieSettingsLink({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Nastavení cookies
    </button>
  );
}
