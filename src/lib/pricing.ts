/**
 * Ceník. Ceny jsou KONEČNÉ (včetně DPH, pokud je Dennis plátce) a „od“ –
 * přesnou cenu vždy řeknu předem, po prohlídce auta.
 *
 * Dokud cena není potvrzená (`price: null`), web ukazuje „na dotaz“.
 * Žádnou cenu si nevymýšlíme – viz CLAUDE.md.
 */
export type PriceItem = {
  key?: string;
  name: string;
  price: number | null;
  /** true = „od X Kč“ */
  from?: boolean;
  unit?: string;
  note?: string;
};

export type PriceGroup = {
  id: 'servis' | 'pneuservis' | 'proverka' | 'prace';
  title: string;
  lead: string;
  items: PriceItem[];
};

export const priceGroups: PriceGroup[] = [
  {
    id: 'servis',
    title: 'Servis',
    lead: 'Cena zahrnuje práci. Díly a náplně účtuji podle skutečnosti a jejich cenu znáte předem.',
    items: [
      { key: 'diagnostika', name: 'Počítačová diagnostika', price: null, from: true }, // TODO(podklady)
      { key: 'olej', name: 'Výměna oleje a filtru', price: null, from: true, note: 'bez ceny oleje a filtru' }, // TODO(podklady)
      { key: 'olej-dsg', name: 'Výměna oleje v převodovce DSG', price: null, from: true }, // TODO(podklady)
      { key: 'brzdy', name: 'Výměna brzdových destiček (náprava)', price: null, from: true }, // TODO(podklady)
      { key: 'brzdy-kotouce', name: 'Výměna kotoučů a destiček (náprava)', price: null, from: true }, // TODO(podklady)
      { key: 'podvozek', name: 'Výměna tlumičů (náprava)', price: null, from: true }, // TODO(podklady)
      { key: 'motor', name: 'Výměna klínového řemene a kladek', price: null, from: true }, // TODO(podklady)
      { key: 'stk', name: 'Příprava na STK (kontrola)', price: null, from: true }, // TODO(podklady)
    ],
  },
  {
    id: 'pneuservis',
    title: 'Pneuservis',
    lead: 'Cena za sadu čtyř kol u osobního auta. U SUV a dodávek se cena liší – řeknu ji předem.',
    items: [
      { key: 'prezuti', name: 'Přezutí kol na discích', price: null, from: true }, // TODO(podklady)
      { key: 'prezuti-pneu', name: 'Přezutí pneumatik na disky vč. vyvážení', price: null, from: true }, // TODO(podklady)
      { key: 'vyvazeni', name: 'Vyvážení kol', price: null, from: true }, // TODO(podklady)
      { key: 'defekt', name: 'Oprava defektu', price: null, from: true }, // TODO(podklady)
    ],
  },
  {
    id: 'proverka',
    title: 'Prověření auta před koupí',
    lead: 'Cena za prověrku včetně reportu s fotkami. Výjezd platí pro Frýdek-Místek a okolí.',
    items: [
      { key: 'proverka-vyjezd', name: 'Prověrka u prodejce (výjezd)', price: null, note: 'dojezd mimo okolí F-M dle km' }, // TODO(podklady)
      { key: 'proverka-dilna', name: 'Kompletní prověrka v dílně na zvedáku', price: null }, // TODO(podklady)
    ],
  },
  {
    id: 'prace',
    title: 'Ostatní práce',
    lead: 'Práce, které nejdou ocenit paušálem, účtuji podle času. Odhad dostanete vždy předem.',
    items: [
      { key: 'hodina', name: 'Hodinová sazba', price: null, unit: 'hod' }, // TODO(podklady)
    ],
  },
];

const allItems = priceGroups.flatMap((group) => group.items);

export const getPrice = (key?: string) => (key ? allItems.find((item) => item.key === key) : undefined);

const czk = (value: number) => `${value.toLocaleString('cs-CZ')} Kč`;

export const formatPrice = (item?: PriceItem) => {
  if (!item || item.price === null) return 'na dotaz';
  const base = czk(item.price);
  const withUnit = item.unit ? `${base} / ${item.unit}` : base;
  return item.from ? `od ${withUnit}` : withUnit;
};

/** Jsou už ve webu nějaké potvrzené ceny? Podle toho se ladí texty („ceny předem“ vs. „cenu řeknu předem“). */
export const hasPublishedPrices = allItems.some((item) => item.price !== null);
