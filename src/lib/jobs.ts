/**
 * Zakázky do sekce „Naše práce“. Texty převzaté ze starého webu
 * (autoservisdk.cz/nase-prace), převedené do 1. osoby. Datum = datum fotky.
 * Ve fázi 2 se zakázky budou přidávat z administrace (Supabase).
 */
export type Job = {
  slug: string;
  car: string;
  title: string;
  date: string; // ISO
  /** Co zákazník řešil. */
  problem: string;
  /** Co jsem našel a udělal. */
  work: string[];
  /** Ponaučení / proč to stojí za zmínku. */
  takeaway: string;
  tags: string[];
  image: { src: string; alt: string };
  /** Odkaz na související službu (/servis/[slug]). */
  serviceSlug?: string;
};

export const jobs: Job[] = [
  {
    slug: 'skoda-octavia-3-tlumice-dsg-napinak',
    car: 'Škoda Octavia 3',
    title: 'Tlumiče, olej v DSG a klepání za studena',
    date: '2026-03-11',
    problem: 'Pravidelný servis a k tomu jemný klepavý zvuk, hlavně při studeném startu.',
    work: [
      'Vyměnil jsem přední tlumiče včetně horního uložení a nové sady prachovek.',
      'Vyměnil jsem olej v motoru a v automatické převodovce DSG – s proplachem a přidáním aditiv.',
      'Při hledání příčiny klepání jsem našel opotřebenou napínací kladku. Vyměnil jsem ji spolu s klínovým řemenem.',
    ],
    takeaway: 'Klepání při studeném startu se vyplatí řešit hned. Výměna kladky je výrazně levnější než následky utrženého řemene.',
    tags: ['podvozek', 'olej DSG', 'motor'],
    image: { src: '/images/prace-skoda-octavia-3.webp', alt: 'Škoda Octavia 3 v dílně na Palkovické' },
    serviceSlug: 'podvozek',
  },
  {
    slug: 'audi-a4-b8-klepani-brzdy',
    car: 'Audi A4 B8',
    title: 'Hlasité klepání za jízdy a brzdy pod limitem',
    date: '2026-03-18',
    problem: 'Zákazník si stěžoval na hlasité klepání během jízdy.',
    work: [
      'Po prohlídce jsem zjistil, že příčinou byly povolené šrouby na kole.',
      'Zároveň jsem našel brzdové kotouče s výraznou hranou, jejichž tloušťka už nedosahovala minimální hodnoty.',
      'Po domluvě se zákazníkem jsem vyměnil brzdové kotouče i destičky.',
    ],
    takeaway: 'Povolené šrouby kola jsou vážná věc. Při té příležitosti jsem zkontroloval i brzdy.',
    tags: ['brzdy', 'bezpečnost'],
    image: { src: '/images/prace-audi-a4-b8.webp', alt: 'Audi A4 B8 v dílně na Palkovické' },
    serviceSlug: 'brzdy',
  },
  {
    slug: 'bmw-e92-335i-podvozek-prevodovka',
    car: 'BMW E92 335i',
    title: 'Preventivní podvozek, převodovka a diferenciál',
    date: '2026-02-26',
    problem: 'Majitel chtěl mít auto v pořádku dřív, než se něco ozve.',
    work: [
      'Preventivně jsem vyměnil přední ramena, stabilizační tyčky a uložení stabilizátoru.',
      'Vyměnil jsem olej v převodovce a v diferenciálu.',
    ],
    takeaway: 'U výkonnějších aut dostává podvozek zabrat, preventivní výměna se vyplatí.',
    tags: ['podvozek', 'převodovka', 'prevence'],
    image: { src: '/images/prace-bmw-e92-335i.webp', alt: 'BMW E92 335i v dílně na Palkovické' },
    serviceSlug: 'podvozek',
  },
];

export const getJob = (slug: string) => jobs.find((job) => job.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
