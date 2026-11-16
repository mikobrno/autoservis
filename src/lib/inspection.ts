/**
 * Prověření auta před koupí – balíčky, checklist a ukázkový report.
 *
 * Inspirace: velcí prodejci ojetin (Carvana „150-point inspection“, Carvago
 * „CarAudit“, AAA Auto) nedávají jen slib, ale pojmenovaný checklist, fotky vad
 * a verdikt. Tady to dělá mechanik, který s prodejcem nemá nic společného.
 *
 * TODO(podklady): Dennis musí checklist i balíčky potvrdit (hlavně tloušťkoměr,
 * prověření historie přes Cebia a dojezd výjezdu). Počet bodů se počítá z dat.
 */

export type CheckPoint = {
  label: string;
  /** Jde udělat i u prodejce bez zvedáku? */
  onSite: boolean;
};

export type CheckSection = {
  id: string;
  title: string;
  why: string;
  points: CheckPoint[];
};

export const checklist: CheckSection[] = [
  {
    id: 'historie',
    title: 'Doklady a historie',
    why: 'Stočené kilometry nebo leasing na autě se poznají z dokladů a databází.',
    points: [
      { label: 'VIN na karoserii odpovídá technickému průkazu', onSite: true },
      { label: 'Prověření historie vozu (najeté km, leasing, odcizení, škody)', onSite: true },
      { label: 'Servisní záznamy a jejich návaznost', onSite: true },
      { label: 'Počet majitelů a původ vozu', onSite: true },
      { label: 'Shoda výbavy s dokladem a VIN', onSite: true },
    ],
  },
  {
    id: 'karoserie',
    title: 'Karoserie a lak',
    why: 'Měřením laku se pozná, které díly byly opravované.',
    points: [
      { label: 'Měření tloušťky laku na všech dílech', onSite: true },
      { label: 'Spáry a přesazení dílů', onSite: true },
      { label: 'Stopy po opravách, tmelu a přestřiku', onSite: true },
      { label: 'Koroze prahů, podběhů, dveří a víka kufru', onSite: true },
      { label: 'Skla, světlomety a zrcátka', onSite: true },
    ],
  },
  {
    id: 'motor',
    title: 'Motor',
    why: 'Motor kontroluji za studena, kdy se problémy projeví nejvíc.',
    points: [
      { label: 'Studený start a poslech motoru', onSite: true },
      { label: 'Úniky oleje a chladicí kapaliny', onSite: true },
      { label: 'Stav a hladina oleje a chladicí kapaliny', onSite: true },
      { label: 'Kouřivost výfuku', onSite: true },
      { label: 'Řemeny, kladky a příslušenství motoru', onSite: true },
      { label: 'Turbodmychadlo a sání', onSite: false },
    ],
  },
  {
    id: 'elektronika',
    title: 'Diagnostika a elektronika',
    why: 'V řídicích jednotkách bývají uložené chyby i kilometry, které nesedí s tachometrem.',
    points: [
      { label: 'Chybové kódy ve všech řídicích jednotkách', onSite: true },
      { label: 'Stopy po nedávném mazání chyb', onSite: true },
      { label: 'Nájezd km v jednotkách oproti tachometru', onSite: true },
      { label: 'Kontrolky, klimatizace, okna a ovládání', onSite: true },
    ],
  },
  {
    id: 'interier',
    title: 'Interiér',
    why: 'Opotřebení interiéru by mělo odpovídat najetým kilometrům.',
    points: [
      { label: 'Opotřebení volantu, pedálů a sedadla oproti km', onSite: true },
      { label: 'Vlhkost, zápach a stopy po zatečení', onSite: true },
      { label: 'Funkce bezpečnostních pásů a airbagů (kontrolka)', onSite: true },
    ],
  },
  {
    id: 'podvozek',
    title: 'Podvozek a brzdy',
    why: 'Vůle v podvozku je spolehlivě vidět jen na zvedáku.',
    points: [
      { label: 'Tlumiče, ramena, čepy a silentbloky', onSite: false },
      { label: 'Brzdové kotouče, destičky a hadice', onSite: true },
      { label: 'Ložiska kol a manžety poloos', onSite: false },
      { label: 'Řízení a jeho vůle', onSite: true },
    ],
  },
  {
    id: 'spodek',
    title: 'Spodek vozu',
    why: 'Koroze a úniky ze spodu auta na fotkách v inzerátu nebývají.',
    points: [
      { label: 'Koroze podlahy, rámu a úchytů', onSite: false },
      { label: 'Výfuk a jeho uchycení', onSite: false },
      { label: 'Úniky z převodovky a diferenciálu', onSite: false },
      { label: 'Stopy po nárazu na spodku', onSite: false },
    ],
  },
  {
    id: 'pneu',
    title: 'Kola a pneumatiky',
    why: 'Nerovnoměrně sjeté pneumatiky ukazují na problém s geometrií nebo podvozkem.',
    points: [
      { label: 'Hloubka dezénu a stáří pneumatik', onSite: true },
      { label: 'Rovnoměrnost sjetí', onSite: true },
      { label: 'Stav disků', onSite: true },
    ],
  },
  {
    id: 'jizda',
    title: 'Zkušební jízda',
    why: 'Až za jízdy se ukáže, jak auto řadí, brzdí a drží stopu.',
    points: [
      { label: 'Řazení, spojka nebo automatická převodovka', onSite: true },
      { label: 'Brzdění a tah do strany', onSite: true },
      { label: 'Hluky podvozku a převodovky', onSite: true },
      { label: 'Výkon a chování motoru v zátěži', onSite: true },
    ],
  },
];

export const totalPoints = checklist.reduce((sum, section) => sum + section.points.length, 0);
export const onSitePoints = checklist.reduce(
  (sum, section) => sum + section.points.filter((point) => point.onSite).length,
  0,
);

export type InspectionPackage = {
  id: 'vyjezd' | 'dilna';
  name: string;
  tagline: string;
  where: string;
  points: number;
  includes: string[];
  missing?: string[];
  bestFor: string;
  priceKey: string;
};

export const packages: InspectionPackage[] = [
  {
    id: 'vyjezd',
    name: 'Prověrka u prodejce',
    tagline: 'Přijedu za autem',
    where: 'Bazar nebo soukromý prodejce ve Frýdku-Místku a okolí',
    points: onSitePoints,
    includes: [
      'kontrola dokladů a historie vozu',
      'měření laku a kontrola karoserie',
      'diagnostika všech řídicích jednotek',
      'studený start a zkušební jízda',
      'report s fotkami a verdikt ještě na místě',
    ],
    missing: ['bez zvedáku – spodek a podvozek jen zběžně'],
    bestFor: 'když prodejce auto do servisu pustit nechce nebo spěcháte',
    priceKey: 'proverka-vyjezd',
  },
  {
    id: 'dilna',
    name: 'Kompletní prověrka v dílně',
    tagline: 'Auto na zvedáku',
    where: 'V dílně na Palkovické – přijedete s prodejcem nebo s autem',
    points: totalPoints,
    includes: [
      'všechno z prověrky u prodejce',
      'podvozek, ložiska a manžety na zvedáku',
      'koroze podlahy, výfuk a úniky ze spodu',
      'odhad nákladů na opravy, které auto čekají',
      'podklady pro vyjednání ceny',
    ],
    bestFor: 'když jde o větší peníze a chcete mít jistotu',
    priceKey: 'proverka-dilna',
  },
];

/* -------------------------------------------------------------------------
 * Ukázkový report – SMYŠLENÝ vůz, slouží jen jako vzor toho, co zákazník
 * dostane. Na webu musí být vždy jasně označený jako ukázka.
 * ----------------------------------------------------------------------- */

export type FindingStatus = 'ok' | 'warn' | 'bad';

export type Finding = {
  section: string;
  label: string;
  status: FindingStatus;
  note?: string;
};

export type Verdict = 'doporucuji' | 'se-slevou' | 'nedoporucuji';

export const verdictLabels: Record<Verdict, { label: string; text: string }> = {
  doporucuji: { label: 'Doporučuji', text: 'Auto odpovídá popisu i ceně.' },
  'se-slevou': { label: 'Kupovat jen se slevou', text: 'Auto je v pořádku, ale čekají ho opravy – započítejte je do ceny.' },
  nedoporucuji: { label: 'Nedoporučuji', text: 'Nález, který se nevyplatí riskovat.' },
};

export const statusLabels: Record<FindingStatus, string> = {
  ok: 'V pořádku',
  warn: 'Pozor',
  bad: 'Vada',
};

export const sampleReport = {
  car: 'Škoda Octavia III Combi 2.0 TDI DSG',
  year: 2016,
  odometer: '214 000 km (tachometr)',
  date: 'ukázka',
  package: 'Kompletní prověrka v dílně',
  verdict: 'nedoporucuji' as Verdict,
  summary:
    'Auto působí udržovaně, ale v historii je z roku 2020 záznam 268 000 km. Dnes ukazuje tachometr o 54 000 km méně. Přední levý čep má vůli a zadní dveře jsou přelakované. Za inzerovanou cenu bych ho nekupoval.',
  repairEstimate: 'čep řízení, žhavicí svíčka a pneumatiky: přibližně 9 000 Kč',
  findings: [
    { section: 'Doklady a historie', label: 'VIN odpovídá technickému průkazu', status: 'ok' },
    {
      section: 'Doklady a historie',
      label: 'Najeté kilometry v historii',
      status: 'bad',
      note: 'Záznam z roku 2020: 268 000 km. Tachometr dnes: 214 000 km.',
    },
    {
      section: 'Karoserie a lak',
      label: 'Tloušťka laku',
      status: 'warn',
      note: 'Zadní pravé dveře 380 µm – přelakované. Ostatní díly původní.',
    },
    { section: 'Motor', label: 'Studený start', status: 'ok', note: 'Naskočil hned, bez klepání.' },
    {
      section: 'Diagnostika a elektronika',
      label: 'Chybové kódy',
      status: 'warn',
      note: 'Žhavicí svíčka válce 3. Chyby smazané krátce před prodejem.',
    },
    {
      section: 'Podvozek a brzdy',
      label: 'Čep řízení vpředu vlevo',
      status: 'bad',
      note: 'Znatelná vůle – nutná výměna.',
    },
    { section: 'Podvozek a brzdy', label: 'Brzdové kotouče a destičky', status: 'ok' },
    { section: 'Spodek vozu', label: 'Koroze a úniky', status: 'ok' },
    {
      section: 'Kola a pneumatiky',
      label: 'Stáří pneumatik',
      status: 'warn',
      note: 'Zimní pneu z roku 2019 – letos ještě, příští sezónu výměna.',
    },
    { section: 'Zkušební jízda', label: 'Převodovka DSG', status: 'ok', note: 'Řadí plynule, bez cukání.' },
  ] as Finding[],
};
