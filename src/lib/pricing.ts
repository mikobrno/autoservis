/**
 * Ceník. Ceny jsou KONEČNÉ – Dennis není plátce DPH.
 *
 * Pneuservis: přepsáno z Dennisova ceníku „Frýdek-Místek | Pneuservis – ceník"
 * (Google profil, listopad 2026; ověřeno proti originálu v plném rozlišení). Při změně ceníku
 * upravit `tyrePriceTables` – souhrnné ceny „od" se z nich počítají samy.
 *
 * Servis: diagnostiku, olej, kotouče s destičkami a hodinovou sazbu poslal Dennis 23. 11. 2026 (WhatsApp).
 * Servis a prověrka: dokud cena není potvrzená (`price: null`), web ukazuje
 * „na dotaz". Žádnou cenu si nevymýšlíme – viz CLAUDE.md.
 */
export type PriceItem = {
  key?: string;
  name: string;
  price: number | null;
  /** true = „od X Kč" */
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

/** Tabulka pneuservisu – řádky podle rozměru kol nebo podle služby. */
export type TyrePriceTable = {
  id: string;
  title: string;
  /** Záhlaví sloupců: první sloupec (Rozměr / Služba) a cena (Cena za 4 kola / Cena). */
  columns: [string, string];
  rows: Array<{ label: string; price: number; unit?: string }>;
  notes?: string[];
};

export const tyrePriceTables: TyrePriceTable[] = [
  {
    id: 'kompletni-prezuti',
    title: 'Kompletní přezutí pneumatik',
    columns: ['Rozměr', 'Cena za 4 kola'],
    rows: [
      { label: 'R13–R14', price: 700 },
      { label: 'R15–R16', price: 800 },
      { label: 'R17', price: 900 },
      { label: 'R18', price: 1000 },
      { label: 'R19', price: 1200 },
      { label: 'R20', price: 1300 },
      { label: 'R21–R22', price: 1500 },
    ],
    notes: [
      'V ceně: demontáž pneumatik z disků, montáž nových pneumatik a vyvážení všech 4 kol včetně běžného závaží.',
      'Příplatky: profil 30 a méně +200 Kč/sada; RunFlat (RFT) +200 Kč/sada. Kombinace obou +400 Kč. R23 a větší – individuální cena.',
    ],
  },
  {
    id: 'vymena-kol',
    title: 'Výměna kompletních kol',
    columns: ['Rozměr', 'Cena za 4 kola'],
    rows: [
      { label: 'R13–R18', price: 400 },
      { label: 'R19–R20', price: 500 },
      { label: 'R21–R24', price: 600 },
    ],
    notes: ['Vyvážení celé sady (4 kola) při výměně: +200 Kč.'],
  },
  {
    id: 'defekt',
    title: 'Oprava defektu',
    columns: ['Služba', 'Cena'],
    rows: [
      { label: 'Oprava knotem', price: 200 },
      { label: 'Oprava zevnitř pneumatiky', price: 350 },
    ],
    notes: ['Opravy provádím pouze u pneumatik, které jsou bezpečně opravitelné.'],
  },
  {
    id: 'vyvazeni',
    title: 'Samostatné vyvážení',
    columns: ['Služba', 'Cena'],
    rows: [{ label: 'Vyvážení celé sady (4 kola), bez montáže', price: 400 }],
  },
  {
    id: 'dalsi',
    title: 'Další služba',
    columns: ['Služba', 'Cena'],
    rows: [{ label: 'Výměna gumového ventilku', price: 50, unit: 'ks' }],
  },
];

const minPrice = (tableId: string) => Math.min(...tyrePriceTables.find((t) => t.id === tableId)!.rows.map((r) => r.price));

export const priceGroups: PriceGroup[] = [
  {
    id: 'pneuservis',
    title: 'Pneuservis',
    lead: 'Ceny za sadu 4 kol osobního auta. Podrobně podle rozměru kol níže.',
    items: [
      { key: 'prezuti-kola', name: 'Výměna kompletních kol (na discích)', price: minPrice('vymena-kol'), from: true },
      { key: 'prezuti-pneu', name: 'Kompletní přezutí pneumatik vč. vyvážení', price: minPrice('kompletni-prezuti'), from: true },
      { key: 'vyvazeni', name: 'Samostatné vyvážení sady', price: minPrice('vyvazeni') },
      { key: 'defekt', name: 'Oprava defektu', price: minPrice('defekt'), from: true },
      { key: 'ventilek', name: 'Výměna gumového ventilku', price: 50, unit: 'ks' },
    ],
  },
  {
    id: 'servis',
    title: 'Servis a opravy',
    lead: 'Cenu opravy vám řeknu po prohlídce auta, ještě než začnu. Díly a náplně účtuji podle skutečnosti.',
    items: [
      { key: 'diagnostika', name: 'Počítačová diagnostika', price: 500, note: 'zdarma, když pak auto opravuji já' },
      { key: 'olej', name: 'Výměna oleje a filtru', price: 800, from: true, note: 'jen práce, bez ceny oleje a filtru' },
      { key: 'olej-dsg', name: 'Výměna oleje v převodovce DSG', price: null, from: true }, // TODO(podklady)
      { key: 'brzdy', name: 'Výměna brzdových destiček (náprava)', price: null, from: true }, // TODO(podklady)
      { key: 'brzdy-kotouce', name: 'Výměna kotoučů a destiček', price: 1300, from: true }, // TODO(podklady): ověřit, jestli je to za nápravu
      { key: 'podvozek', name: 'Výměna tlumičů (náprava)', price: null, from: true }, // TODO(podklady)
      { key: 'motor', name: 'Výměna klínového řemene a kladek', price: null, from: true }, // TODO(podklady)
      { key: 'stk', name: 'Příprava na STK (kontrola)', price: null, from: true }, // TODO(podklady)
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
      { key: 'hodina', name: 'Hodinová sazba mechanické práce', price: 500, unit: 'hod' },
    ],
  },
];

/** Patička ceníku – z Dennisova ceníku („Uvedené ceny jsou konečné. Nejsme plátci DPH."), v 1. osobě. */
export const priceFootnote = 'Uvedené ceny jsou konečné. Nejsem plátce DPH.';

const allItems = priceGroups.flatMap((group) => group.items);

export const getPrice = (key?: string) => (key ? allItems.find((item) => item.key === key) : undefined);

export const czk = (value: number) => `${value.toLocaleString('cs-CZ')} Kč`;

export const formatPrice = (item?: PriceItem) => {
  if (!item || item.price === null) return 'na dotaz';
  const base = czk(item.price);
  const withUnit = item.unit ? `${base} / ${item.unit}` : base;
  return item.from ? `od ${withUnit}` : withUnit;
};

/** Má skupina aspoň jednu potvrzenou cenu? (Skupiny bez cen ceník ukazuje jinak.) */
export const groupHasPrices = (group: PriceGroup) => group.items.some((item) => item.price !== null);
