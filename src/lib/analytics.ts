/**
 * Google Analytics 4 se souhlasem podle Consent Mode v2.
 *
 * Záměrně používáme „basic“ režim: skript gtag.js se vůbec nenačte, dokud
 * návštěvník souhlas neudělí. Do té chvíle tedy na Google neodejde ani
 * cookieless ping s IP adresou. Je to přísnější než „advanced“ režim, ale
 * odpovídá to opt-in úpravě podle § 89 odst. 3 zákona č. 127/2005 Sb.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const CONSENT_STORAGE_KEY = 'autoservisdk-cookie-consent';

export type ConsentState = 'unknown' | 'granted' | 'denied';

const readStoredConsent = (): ConsentState => {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : 'unknown';
  } catch {
    // Prohlížeč může mít úložiště zakázané – pak se prostě zeptáme znovu.
    return 'unknown';
  }
};

/**
 * Malý externí store nad localStorage. Díky němu může komponenta stav číst
 * přes `useSyncExternalStore`, které správně řeší server rendering – na rozdíl
 * od načítání v `useEffect`, jež by způsobilo zbytečný překreslovací cyklus.
 * Snapshot se drží v proměnné, protože musí vracet stabilní referenci.
 */
let cachedConsent: ConsentState | null = null;
let listeners: Array<() => void> = [];

const emit = () => listeners.forEach((listener) => listener());

export const subscribeConsent = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((registered) => registered !== listener);
  };
};

export const getConsentSnapshot = (): ConsentState => {
  if (cachedConsent === null) cachedConsent = readStoredConsent();
  return cachedConsent;
};

/** Na serveru rozhodnutí neznáme – lišta se dorenderuje až v prohlížeči. */
export const getServerConsentSnapshot = (): ConsentState => 'unknown';

const applyToGtag = (value: 'granted' | 'denied') => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
};

export const decideConsent = (value: 'granted' | 'denied') => {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Bez úložiště souhlas nepřetrvá, měření tím ale nerozbijeme.
  }
  cachedConsent = value;
  applyToGtag(value);
  emit();
};

/** Odvolání souhlasu – vrátí web do stavu před rozhodnutím. */
export const resetConsent = () => {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Bez úložiště není co mazat.
  }
  cachedConsent = 'unknown';
  applyToGtag('denied');
  emit();
};
