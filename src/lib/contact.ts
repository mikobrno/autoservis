/**
 * Jediné místo s názvem, kontakty a údaji o servisu. Nikde jinde v kódu se
 * název, telefon, e-mail, IČO ani adresa nesmí objevit natvrdo – viz CLAUDE.md.
 *
 * Název „DK Autoservis“ je zatím pracovní (může se změnit – zásoba volných
 * názvů je v docs/BRIEF.md §1). Přejmenování = úprava `tradeName`, `siteName`
 * a `siteUrl` tady, nic jiného.
 *
 * Dennis dělá v dílně sám, proto texty mluví v 1. osobě jednotného čísla.
 */
export const business = {
  tradeName: 'DK Autoservis',
  /** Iniciály v šestiúhelníku loga (max. 3 znaky). */
  monogram: 'DK',
  /** Název z Google profilu – kvůli konzistenci NAP (název, adresa, telefon). */
  googleName: 'DK Autoservis a Pneuservis',
  owner: 'Dennis Koribanič',
  ownerFirstName: 'Dennis',
  // TODO(podklady): Google profil uvádí +420 774 883 911, starý web +420 737 020 324 – ověřit, které platí.
  phone: '+420 737 020 324',
  email: '', // TODO(podklady): e-mail pro poptávky
  ico: '', // TODO(podklady): IČO
  street: 'Palkovická 2204',
  city: 'Frýdek-Místek',
  postalCode: '738 01',
  country: 'CZ',
  /** Souřadnice z Google profilu (místo „DK Autoservis a Pneuservis“). */
  geo: { lat: 49.6614526, lng: 18.3328221 },
  instagram: 'dk_autoservis_',
  /** Pokud Dennis WhatsApp na tomhle čísle nepoužívá, nastavit na false – odkazy zmizí. */
  whatsapp: true, // TODO(podklady): potvrdit WhatsApp na hlavním čísle
  vatPayer: null as boolean | null, // TODO(podklady): plátce DPH? (ceny uvádíme konečné)
};

/** Otevírací doba podle Google profilu (stav k 16. 11. 2026). */
export const openingHours: Array<{ days: string; schemaDays: string[]; opens: string | null; closes: string | null }> = [
  { days: 'Po–Pá', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
  { days: 'Sobota', schemaDays: ['Saturday'], opens: '08:00', closes: '15:00' },
  { days: 'Neděle', schemaDays: ['Sunday'], opens: null, closes: null },
];

export const formatHours = (opens: string | null, closes: string | null) =>
  opens && closes ? `${opens.replace(/^0/, '')}–${closes.replace(/^0/, '')}` : 'zavřeno';

/** Google profil – hodnocení a odkazy na recenze. */
export const google = {
  placeId: 'ChIJLyOX4fP3E0cRrmVonB1fySA',
  rating: 5.0,
  reviewCount: 11,
  /** Kdy jsme hodnocení naposledy opsali z Googlu. Při změně počtu recenzí aktualizovat. */
  checkedAt: '2026-11-16',
};

export const googleReviewsUrl = `https://search.google.com/local/reviews?placeid=${google.placeId}`;
export const googleWriteReviewUrl = `https://search.google.com/local/writereview?placeid=${google.placeId}`;
export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.googleName}, ${business.street}, ${business.city}`,
)}&query_place_id=${google.placeId}`;
export const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.street}, ${business.postalCode} ${business.city}`,
)}&destination_place_id=${google.placeId}`;
export const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&hl=cs&output=embed`;

export const instagramUrl = `https://www.instagram.com/${business.instagram}/`;

/** Online kalendář (Reservio). Dokud je prázdný, web místo kalendáře nabídne formulář, WhatsApp a telefon. */
export const bookingUrl = ''; // TODO(podklady): odkaz na Reservio, např. https://dk-autoservis.reservio.com

export const siteUrl = 'https://autoservisdk.cz';
export const siteName = 'DK Autoservis Frýdek-Místek';

export const fullAddress = `${business.street}, ${business.postalCode} ${business.city}`;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

/** WhatsApp odkaz s předvyplněnou zprávou (wa.me chce číslo bez + a mezer). */
export const waHref = (text = 'Dobrý den, ') =>
  `https://wa.me/${business.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(text)}`;

export const mailHref = (email: string) => `mailto:${email}`;
