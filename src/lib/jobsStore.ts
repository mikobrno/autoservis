import { getStore } from '@netlify/blobs';
import { staticJobs, type Job } from '@/lib/jobs';

/**
 * Úložiště zakázek (Netlify Blobs). Jen pro server – nikdy neimportovat
 * do klientské komponenty.
 *
 * `zakazky/jobs.json` drží celý seznam zakázek. Dokud v něm nic není, platí
 * výchozí sada z src/lib/jobs.ts; první úprava přes Telegram ji tam zkopíruje
 * a od té chvíle je zdrojem pravdy úložiště.
 * `zakazky-foto` drží fotky, které Dennis poslal botovi (servíruje /foto/[name]).
 */
const JOBS_KEY = 'jobs.json';

export const jobsBlobStore = () => getStore({ name: 'zakazky', consistency: 'strong' });
export const photoBlobStore = () => getStore({ name: 'zakazky-foto', consistency: 'strong' });

type BlobStore = ReturnType<typeof getStore>;

/**
 * Čtení přes tyhle funkce, ne přímo store.get(): čtení klíče, který ještě
 * neexistuje, na Netlify s Next.js visí až do vypršení funkce (30 s, ověřeno
 * 23. 11. 2026, @netlify/blobs 11). Dotaz na metadata vrátí „není" hned.
 */
export async function readJson<T>(store: BlobStore, key: string): Promise<T | null> {
  if (!(await store.getMetadata(key))) return null;
  return (await store.get(key, { type: 'json' })) as T | null;
}

export async function readBinary(store: BlobStore, key: string): Promise<ArrayBuffer | null> {
  if (!(await store.getMetadata(key))) return null;
  return store.get(key, { type: 'arrayBuffer' });
}

/** Pojistka pro web: když úložiště neodpoví včas, stránka se nezasekne a ukáže výchozí sadu. */
const withTimeout = <T,>(promise: Promise<T>, ms = 5000) =>
  Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Úložiště zakázek neodpovídá')), ms))]);

/**
 * Všechny zakázky včetně skrytých.
 * `strict` = při chybě úložiště vyhodit výjimku. Používá bot: kdyby při výpadku
 * potichu dostal výchozí sadu a pak ji uložil, přepsal by Dennisovy zakázky.
 * Web naopak při chybě (build, lokální vývoj bez Netlify) ukáže výchozí sadu.
 */
export async function loadJobs({ strict = false } = {}): Promise<Job[]> {
  try {
    const saved = await withTimeout(readJson<Job[]>(jobsBlobStore(), JOBS_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) {
    if (strict) throw error;
  }
  return staticJobs;
}

export async function saveJobs(jobs: Job[]) {
  await jobsBlobStore().setJSON(JOBS_KEY, jobs);
}

/** Zakázky pro web: bez skrytých, nejnovější první. */
export async function getJobs(): Promise<Job[]> {
  const all = await loadJobs();
  return all.filter((job) => !job.hidden).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getJob(slug: string) {
  return (await getJobs()).find((job) => job.slug === slug);
}
