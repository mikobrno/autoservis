import { business } from '@/lib/contact';

/**
 * Servisní služby – každá má vlastní stránku /servis/[slug] (lokální SEO:
 * jedna stránka = jedna hledaná fráze, např. „výměna oleje Frýdek-Místek“).
 *
 * Zdroj rozsahu: popis Google profilu („počítačová diagnostika, výměny olejů
 * a filtrů, opravy brzd a podvozku, opravy motorů… pneuservis"), starý web
 * („Diagnostika, Opravy všech druhů, Příprava na STK“) a případovky.
 * Služby, které Dennis zatím nepotvrdil (klimatizace, rozvody, geometrie…),
 * tu záměrně nejsou.
 */
export type ServiceIcon = 'diagnostika' | 'olej' | 'brzdy' | 'podvozek' | 'motor' | 'stk' | 'pneu' | 'proverka';

export type Service = {
  slug: string;
  name: string;
  /** Krátký popis do karet. */
  short: string;
  icon: ServiceIcon;
  /** SEO */
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Kdy přijet – příznaky, které zákazník pozná sám. */
  signs: string[];
  /** Co přesně udělám. */
  includes: string[];
  /** Jak to probíhá u téhle služby (doplněk k obecnému postupu). */
  note?: string;
  /** Klíč do ceníku (src/lib/pricing.ts) pro „cena od“. */
  priceKey?: string;
  image?: { src: string; alt: string };
  /** Text předvyplněný do WhatsAppu. */
  waText: string;
};

export const services: Service[] = [
  {
    slug: 'diagnostika',
    name: 'Diagnostika a prohlídka vozu',
    short: 'Počítačová diagnostika, čtení chyb a prohlídka auta na zvedáku.',
    icon: 'diagnostika',
    title: `Diagnostika auta Frýdek-Místek – ${business.tradeName}`,
    description:
      'Počítačová diagnostika a prohlídka auta ve Frýdku-Místku. Najdu příčinu závady, ukážu vám ji na fotce a řeknu cenu opravy dřív, než začnu.',
    h1: 'Diagnostika a prohlídka auta ve Frýdku-Místku',
    intro:
      'Když svítí kontrolka, auto cuká nebo něco klepe, připojím diagnostiku a přečtu chybové kódy. Auto ale vždycky prohlédnu i na zvedáku, protože ne všechno se ukáže v počítači. Co najdu, vám vysvětlím a pošlu na fotce.',
    signs: [
      'svítí kontrolka motoru, ABS, airbagu nebo jiná',
      'auto cuká, ztrácí výkon nebo jde do nouzového režimu',
      'nový zvuk – klepání, pískání, bzučení',
      'auto hůř startuje, hlavně za studena',
      'chcete znát stav vozu před delší cestou nebo prodejem',
    ],
    includes: [
      'počítačová diagnostika a čtení chybových kódů',
      'kontrola živých hodnot motoru a převodovky',
      'prohlídka na zvedáku – podvozek, úniky, brzdy',
      'fotky a vysvětlení nálezů, odhad ceny opravy předem',
    ],
    note: 'Samotný chybový kód nestačí. Než doporučím nový díl, ověřím, že je opravdu vadný.',
    priceKey: 'diagnostika',
    image: { src: '/images/dilna-bmw-e60.webp', alt: 'BMW řady 5 na zvedáku v dílně na Palkovické' },
    waText: 'Dobrý den, potřeboval/a bych diagnostiku auta. Auto: ',
  },
  {
    slug: 'vymena-oleje',
    name: 'Výměna oleje a filtrů',
    short: 'Motorový olej a filtry, olej v DSG, převodovce i diferenciálu.',
    icon: 'olej',
    title: 'Výměna oleje Frýdek-Místek – servisní prohlídka',
    description:
      'Výměna motorového oleje a filtrů ve Frýdku-Místku, olej v automatu DSG i diferenciálu. Při výměně zkontroluji podvozek a brzdy a řeknu, co čeká.',
    h1: 'Výměna oleje a filtrů ve Frýdku-Místku',
    intro:
      'Vyměním motorový olej a filtry podle předpisu výrobce. Když už je auto na zvedáku, podívám se i na brzdy, podvozek a úniky a řeknu vám, co bude potřeba řešit příště.',
    signs: [
      'blíží se servisní interval nebo svítí upozornění na servis',
      'olej jste neměnili déle než rok',
      'chystáte se na dlouhou cestu',
      'automatická převodovka (DSG) řadí tvrdě nebo cuká',
    ],
    includes: [
      'motorový olej podle specifikace výrobce a olejový filtr',
      'vzduchový, palivový a kabinový filtr podle potřeby',
      'výměna oleje v automatické převodovce DSG včetně proplachu',
      'výměna oleje v diferenciálu a manuální převodovce',
      'kontrola brzd, podvozku a provozních kapalin',
    ],
    priceKey: 'olej',
    image: { src: '/images/prace-skoda-octavia-3.webp', alt: 'Škoda Octavia 3 v dílně na Palkovické' },
    waText: 'Dobrý den, chtěl/a bych objednat výměnu oleje. Auto: ',
  },
  {
    slug: 'brzdy',
    name: 'Opravy brzd',
    short: 'Destičky, kotouče, brzdová kapalina. Změřím opotřebení a řeknu, jestli výměna spěchá.',
    icon: 'brzdy',
    title: 'Výměna brzd Frýdek-Místek – kotouče a destičky',
    description:
      'Výměna brzdových destiček a kotoučů ve Frýdku-Místku. Změřím opotřebení, ukážu vám ho na fotce a vyměním jen to, co je opravdu potřeba.',
    h1: 'Opravy brzd ve Frýdku-Místku',
    intro:
      'Změřím tloušťku kotoučů a destiček, zkontroluji třmeny a brzdovou kapalinu a ukážu vám, jak na tom jsou. Vyměním jen to, co je pod limitem nebo opotřebené, a vždy po domluvě s vámi.',
    signs: [
      'pískání nebo skřípání při brzdění',
      'vibrace ve volantu nebo v pedálu',
      'auto při brzdění táhne do strany',
      'svítí kontrolka opotřebení destiček',
      'na kotouči je znatelná hrana',
    ],
    includes: [
      'změření tloušťky kotoučů a destiček',
      'výměna destiček a kotoučů',
      'kontrola a čištění třmenů, vodítek a hadic',
      'výměna brzdové kapaliny',
    ],
    note: 'U Audi A4 jsem kvůli klepání našel povolené šrouby kola a při té příležitosti i kotouče pod minimální tloušťkou.',
    priceKey: 'brzdy',
    image: { src: '/images/prace-audi-a4-b8.webp', alt: 'Audi A4 B8 před výměnou brzd v dílně na Palkovické' },
    waText: 'Dobrý den, potřeboval/a bych zkontrolovat brzdy. Auto: ',
  },
  {
    slug: 'podvozek',
    name: 'Podvozek a tlumiče',
    short: 'Tlumiče, ramena, čepy, stabilizátory a jejich uložení.',
    icon: 'podvozek',
    title: 'Oprava podvozku Frýdek-Místek – tlumiče a ramena',
    description:
      'Oprava podvozku ve Frýdku-Místku: tlumiče, ramena, stabilizátory a jejich uložení. Najdu, co klepe, ukážu vám vůli na fotce nebo videu a řeknu cenu.',
    h1: 'Oprava podvozku a výměna tlumičů ve Frýdku-Místku',
    intro:
      'Klepání přes retardéry, vrzání nebo auto, které „plave“, bývá znak opotřebeného podvozku. Na zvedáku projdu ramena, čepy, silentbloky, tlumiče i stabilizátory a co má vůli, vám ukážu.',
    signs: [
      'klepání přes nerovnosti nebo retardéry',
      'auto plave, houpe se nebo táhne do strany',
      'nerovnoměrně sjeté pneumatiky',
      'vrzání při zatáčení nebo parkování',
    ],
    includes: [
      'výměna tlumičů včetně horních uložení a prachovek',
      'výměna ramen, čepů a silentbloků',
      'výměna stabilizačních tyček a uložení stabilizátoru',
      'kontrola ložisek kol a manžet',
    ],
    priceKey: 'podvozek',
    image: { src: '/images/podvozek.webp', alt: 'Pohled na podvozek a zavěšení kola na zvedáku' },
    waText: 'Dobrý den, něco mi klepe v podvozku. Auto: ',
  },
  {
    slug: 'opravy-motoru',
    name: 'Opravy motoru',
    short: 'Řemeny a kladky, úniky oleje a kapaliny, problémy se startem.',
    icon: 'motor',
    title: `Oprava motoru Frýdek-Místek – ${business.tradeName}`,
    description:
      'Opravy motoru ve Frýdku-Místku: řemeny a napínací kladky, úniky oleje a chladicí kapaliny, problémy se startem. Příčinu najdu a cenu řeknu předem.',
    h1: 'Opravy motoru ve Frýdku-Místku',
    intro:
      'Nový zvuk, úbytek oleje nebo horší startování se vyplatí řešit hned. U Octavie bylo za jemným klepáním při studeném startu opotřebená napínací kladka klínového řemene, výměna stála zlomek toho, co by stál utržený řemen.',
    signs: [
      'klepání, pískání nebo cvakání z motoru, hlavně za studena',
      'úbytek oleje nebo chladicí kapaliny, skvrny pod autem',
      'kouř z výfuku, zápach spáleného oleje',
      'ztráta výkonu, vyšší spotřeba',
    ],
    includes: [
      'výměna klínového řemene a napínacích kladek',
      'odstranění úniků oleje a chladicí kapaliny',
      'diagnostika a oprava problémů se startováním',
      'opravy příslušenství motoru',
    ],
    priceKey: 'motor',
    image: { src: '/images/dilna-zvedak.webp', alt: 'BMW na zvedáku během opravy v dílně na Palkovické' },
    waText: 'Dobrý den, mám problém s motorem. Auto: ',
  },
  {
    slug: 'priprava-na-stk',
    name: 'Příprava na STK',
    short: 'Projdu auto jako technik na STK a opravím, co by neprošlo.',
    icon: 'stk',
    title: `Příprava na STK Frýdek-Místek – ${business.tradeName}`,
    description:
      'Příprava auta na STK ve Frýdku-Místku. Zkontroluji vše, co kontroluje technik, opravím závady a na technickou pak jedete bez stresu a opakování.',
    h1: 'Příprava auta na STK ve Frýdku-Místku',
    intro:
      'Projdu auto tak, jak ho bude procházet technik na STK: světla, brzdy, podvozek, úniky, pneumatiky a výfuk. Co by neprošlo, vám ukážu a po domluvě opravím, abyste nemuseli jezdit dvakrát.',
    signs: [
      'za měsíc nebo dva vám končí technická',
      'minule jste na STK neprošli',
      'auto jste koupili a nevíte, v jakém je stavu',
    ],
    includes: [
      'kontrola světel, brzd, podvozku a řízení',
      'kontrola úniků kapalin, výfuku a koroze',
      'kontrola pneumatik a chybových kódů',
      'oprava nalezených závad po vaší domluvě',
    ],
    note: 'Samotnou technickou kontrolu dělá stanice technické kontroly. Já auto připravím, aby prošlo napoprvé.',
    priceKey: 'stk',
    image: { src: '/images/prace-bmw-e92-335i.webp', alt: 'BMW E92 335i připravené v dílně na Palkovické' },
    waText: 'Dobrý den, chtěl/a bych připravit auto na STK. Auto: ',
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);

/** Pneuservis má vlastní stránku /pneuservis. */
export const tyreServices: Array<{ name: string; text: string; priceKey?: string }> = [
  {
    name: 'Přezutí pneumatik',
    text: 'Přezutí letních a zimních kol – kola na discích i přezutí pneumatik na disky. Při tom zkontroluji hloubku dezénu a stáří pneumatik.',
    priceKey: 'prezuti',
  },
  {
    name: 'Vyvážení kol',
    text: 'Vyvážení na vyvažovačce. Konec vibracím ve volantu při vyšších rychlostech.',
    priceKey: 'vyvazeni',
  },
  {
    name: 'Oprava defektu',
    text: 'Píchlou pneumatiku opravím, pokud to jde bezpečně. Když ne, řeknu vám to rovnou.',
    priceKey: 'defekt',
  },
  {
    name: 'Kontrola při přezutí',
    text: 'Když už je auto na zvedáku, mrknu na brzdy a podvozek. Dozvíte se, jestli něco nečeká – bez povinnosti cokoliv objednat.',
  },
];
