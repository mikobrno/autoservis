import { revalidatePath } from 'next/cache';
import { siteUrl } from '@/lib/contact';
import type { Job } from '@/lib/jobs';
import { jobsBlobStore, loadJobs, photoBlobStore, readJson, saveJobs } from '@/lib/jobsStore';
import { getService, services } from '@/lib/services';

/**
 * Administrace zakázek přes Telegram. Dennis napíše botovi „?“ a dostane menu:
 * přidat zakázku (bot se postupně zeptá na auto, popis a fotku), upravit,
 * skrýt nebo smazat. Změna je na webu hned – bot po uložení nechá stránky
 * přegenerovat.
 *
 * Pouští jen chat z TELEGRAM_CHAT_ID (a případně další ID v TELEGRAM_ADMIN_IDS,
 * oddělená čárkou). Rozdělaný krok si pamatuje v Netlify Blobs (`state/<chat>`).
 * Texty bota Dennisovi tykají, na web se nedostanou.
 */

type TextField = 'car' | 'title' | 'problem' | 'work' | 'takeaway';

const FIELDS: Record<TextField, { label: string; ask: string; max: number }> = {
  car: { label: 'Auto', ask: 'Jaké auto? Značka a model, třeba „Škoda Octavia 3“.', max: 40 },
  title: { label: 'Nadpis', ask: 'Krátký nadpis zakázky, třeba „Tlumiče a olej v DSG“.', max: 80 },
  problem: { label: 'Co zákazník řešil', ask: 'Co zákazník řešil? Jedna nebo dvě věty.', max: 300 },
  work: {
    label: 'Co jsem udělal',
    ask: 'Co jsi na autě udělal? Každou věc napiš na nový řádek a piš za sebe („Vyměnil jsem…“).',
    max: 1500,
  },
  takeaway: { label: 'Ponaučení', ask: 'Ponaučení pro ostatní řidiče, jedna věta. Nemusí být.', max: 300 },
};
const ADD_ORDER: TextField[] = ['car', 'title', 'problem', 'work', 'takeaway'];

/** Štítek na kartě zakázky podle vybrané služby. */
const SERVICE_TAGS: Record<string, string> = {
  diagnostika: 'diagnostika',
  'vymena-oleje': 'olej',
  brzdy: 'brzdy',
  podvozek: 'podvozek',
  'opravy-motoru': 'motor',
  'priprava-na-stk': 'STK',
};

type Draft = { car?: string; title?: string; problem?: string; work?: string[]; takeaway?: string; serviceSlug?: string; photo?: string };

type State = {
  mode?: 'add' | 'edit';
  /** Na co bot právě čeká. */
  wait?: TextField | 'service' | 'photo' | 'plate' | 'preview';
  draft?: Draft;
  /** Upravovaná zakázka. */
  slug?: string;
  /** Zakázky v naposledy poslaném seznamu (tlačítka nesou jen pořadí). */
  slugs?: string[];
  /** Nová fotka při úpravě, než Dennis potvrdí, že na ní není SPZ. */
  pendingPhoto?: string;
};

type Button = { text: string; callback_data: string };
type TgMessage = {
  chat: { id: number };
  text?: string;
  photo?: Array<{ file_id: string }>;
  document?: { file_id: string; mime_type?: string };
};
type TgUpdate = {
  message?: TgMessage;
  callback_query?: { id: string; data?: string; message?: { chat: { id: number }; message_id: number } };
};

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function tg<T = unknown>(method: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = (await response.json()) as { ok: boolean; result: T; description?: string };
  if (!json.ok) throw new Error(`Telegram ${method}: ${json.description}`);
  return json.result;
}

const send = (chatId: number, text: string, buttons?: Button[][]) =>
  tg('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
    ...(buttons ? { reply_markup: { inline_keyboard: buttons } } : {}),
  });

const stateKey = (chatId: number) => `state/${chatId}`;
const getState = async (chatId: number) => (await readJson<State>(jobsBlobStore(), stateKey(chatId))) ?? {};
const setState = (chatId: number, state: State) => jobsBlobStore().setJSON(stateKey(chatId), state);

const isAdmin = (chatId: number) =>
  [process.env.TELEGRAM_CHAT_ID, ...(process.env.TELEGRAM_ADMIN_IDS ?? '').split(',')]
    .map((id) => id?.trim())
    .filter(Boolean)
    .includes(String(chatId));

const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '');

const today = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Prague' });

const deletePhoto = async (src?: string) => {
  if (src?.startsWith('/foto/')) await photoBlobStore().delete(src.slice('/foto/'.length)).catch(() => {});
};

/** Změna zakázek se má na webu projevit hned, ne až po vypršení cache. */
const refreshSite = () => revalidatePath('/', 'layout');

const CANCEL: Button = { text: 'Zrušit', callback_data: 'menu' };

const menu = (chatId: number, intro = 'Co chceš udělat?') =>
  send(chatId, intro, [
    [{ text: '➕ Přidat zakázku', callback_data: 'add' }],
    [{ text: '✏️ Upravit nebo smazat zakázku', callback_data: 'list' }],
  ]);

const serviceButtons = (): Button[][] => [
  ...services.map((service) => [{ text: service.name, callback_data: `svc:${service.slug}` }]),
  [{ text: 'Žádná z nich', callback_data: 'svc:none' }],
];

const describe = (job: Draft & { date?: string; hidden?: boolean }) =>
  [
    `<b>${esc(job.car ?? '')} – ${esc(job.title ?? '')}</b>${job.hidden ? ' (skrytá)' : ''}`,
    '',
    `<b>Co zákazník řešil:</b> ${esc(job.problem ?? '')}`,
    '<b>Co jsem udělal:</b>',
    ...(job.work ?? []).map((item) => `• ${esc(item)}`),
    ...(job.takeaway ? [`<b>Ponaučení:</b> ${esc(job.takeaway)}`] : []),
    `<b>Služba:</b> ${esc(getService(job.serviceSlug ?? '')?.name ?? 'žádná')}`,
  ].join('\n');

/** Zkontroluje a uloží textovou odpověď do zakázky. Vrací text chyby, nebo null. */
function applyText(target: Draft, field: TextField, raw: string): string | null {
  const text = raw.trim();
  if (!text) return 'Napiš to prosím textem.';
  if (text.length > FIELDS[field].max) return `To je moc dlouhé (nejvýš ${FIELDS[field].max} znaků). Zkus to zkrátit.`;
  if (field === 'work') {
    const items = text
      .split('\n')
      .map((line) => line.replace(/^\s*(?:[-•*–]|\d+[.)])\s*/, '').trim())
      .filter(Boolean);
    if (!items.length) return 'Napiš aspoň jednu věc, kterou jsi udělal.';
    target.work = items.slice(0, 8);
  } else {
    target[field] = text.replace(/\s+/g, ' ');
  }
  return null;
}

/** Stáhne fotku z Telegramu do úložiště a vrátí adresu, na které ji web ukáže. */
async function storePhoto(message: TgMessage, nameHint: string): Promise<string | null> {
  const isImageFile = message.document?.mime_type?.startsWith('image/');
  const fileId = message.photo?.at(-1)?.file_id ?? (isImageFile ? message.document?.file_id : undefined);
  if (!fileId) return null;

  const file = await tg<{ file_path: string }>('getFile', { file_id: fileId });
  const response = await fetch(`https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`);
  if (!response.ok) throw new Error(`stažení fotky ${response.status}`);

  const ext = (file.file_path.split('.').pop() ?? 'jpg').toLowerCase();
  const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
  const name = `${slugify(nameHint) || 'zakazka'}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  await photoBlobStore().set(name, await response.arrayBuffer());
  return `/foto/${name}`;
}

const askPlate = (chatId: number) =>
  send(chatId, 'Fotku mám. Je na ní vidět SPZ? Na web smí jen fotka, kde SPZ není čitelná.', [
    [{ text: 'SPZ není vidět', callback_data: 'plate:ok' }],
    [{ text: 'Je vidět, pošlu jinou', callback_data: 'plate:no' }],
    [CANCEL],
  ]);

const jobMenu = (chatId: number, job: Job) =>
  send(chatId, `${describe(job)}\n\nCo chceš změnit?`, [
    [
      { text: 'Auto', callback_data: 'f:car' },
      { text: 'Nadpis', callback_data: 'f:title' },
    ],
    [
      { text: 'Co zákazník řešil', callback_data: 'f:problem' },
      { text: 'Co jsem udělal', callback_data: 'f:work' },
    ],
    [
      { text: 'Ponaučení', callback_data: 'f:takeaway' },
      { text: 'Služba', callback_data: 'f:service' },
    ],
    [{ text: 'Fotka', callback_data: 'f:photo' }],
    [
      { text: job.hidden ? 'Zobrazit na webu' : 'Skrýt z webu', callback_data: 'hide' },
      { text: 'Smazat', callback_data: 'del' },
    ],
    [{ text: 'Hotovo', callback_data: 'menu' }],
  ]);

/** Další otázka při přidávání zakázky. */
async function askNext(chatId: number, state: State) {
  const draft = state.draft ?? {};
  const next = ADD_ORDER.find((field) => draft[field] === undefined);
  if (next) {
    await setState(chatId, { ...state, wait: next });
    const skip: Button[] = next === 'takeaway' ? [{ text: 'Přeskočit', callback_data: 'skip' }] : [];
    return send(chatId, FIELDS[next].ask, [[...skip, CANCEL]]);
  }
  if (draft.serviceSlug === undefined) {
    await setState(chatId, { ...state, wait: 'service' });
    return send(chatId, 'Ke které službě zakázka patří?', serviceButtons());
  }
  if (!draft.photo) {
    await setState(chatId, { ...state, wait: 'photo' });
    return send(chatId, 'Teď pošli jednu fotku auta z dílny. Nejlíp na výšku a tak, aby nebyla vidět SPZ.', [[CANCEL]]);
  }
  await setState(chatId, { ...state, wait: 'preview' });
  return send(chatId, `Takhle to bude na webu:\n\n${describe(draft)}`, [
    [{ text: '✅ Zveřejnit', callback_data: 'pub' }],
    [CANCEL],
  ]);
}

async function publish(chatId: number, draft: Draft) {
  const jobs = await loadJobs({ strict: true });
  const base = slugify(`${draft.car} ${draft.title}`) || 'zakazka';
  let slug = base;
  for (let n = 2; jobs.some((job) => job.slug === slug); n++) slug = `${base}-${n}`;

  const tag = SERVICE_TAGS[draft.serviceSlug ?? ''];
  const job: Job = {
    slug,
    car: draft.car!,
    title: draft.title!,
    date: today(),
    problem: draft.problem!,
    work: draft.work!,
    ...(draft.takeaway ? { takeaway: draft.takeaway } : {}),
    tags: tag ? [tag] : [],
    image: { src: draft.photo!, alt: `${draft.car} v dílně` },
    ...(draft.serviceSlug ? { serviceSlug: draft.serviceSlug } : {}),
  };
  await saveJobs([job, ...jobs]);
  refreshSite();
  await setState(chatId, {});
  await send(chatId, `Hotovo, zakázka je na webu:\n${siteUrl}/nase-prace/${slug}`);
  return menu(chatId, 'Ještě něco?');
}

/** Uloží změnu jedné zakázky a ukáže její menu. */
async function updateJob(chatId: number, slug: string, change: (job: Job) => void) {
  const jobs = await loadJobs({ strict: true });
  const job = jobs.find((item) => item.slug === slug);
  if (!job) return menu(chatId, 'Tu zakázku už nemůžu najít.');
  change(job);
  await saveJobs(jobs);
  refreshSite();
  await setState(chatId, { mode: 'edit', slug });
  await send(chatId, 'Uloženo, na webu je to změněné.');
  return jobMenu(chatId, job);
}

async function reset(chatId: number, state: State) {
  // Fotky rozdělané zakázky, která se nezveřejnila, v úložišti nenecháváme.
  if (state.mode === 'add') await deletePhoto(state.draft?.photo);
  await deletePhoto(state.pendingPhoto);
  await setState(chatId, {});
}

async function onCallback(chatId: number, data: string, state: State) {
  if (data === 'menu') {
    await reset(chatId, state);
    return menu(chatId);
  }
  if (data === 'add') {
    await reset(chatId, state);
    return askNext(chatId, { mode: 'add', draft: {} });
  }
  if (data === 'list') {
    await reset(chatId, state);
    const jobs = (await loadJobs({ strict: true })).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);
    if (!jobs.length) return menu(chatId, 'Zatím tu není žádná zakázka.');
    await setState(chatId, { mode: 'edit', slugs: jobs.map((job) => job.slug) });
    return send(chatId, 'Kterou zakázku?', [
      ...jobs.map((job, index) => [
        { text: `${job.hidden ? '(skrytá) ' : ''}${job.car} – ${job.title}`.slice(0, 60), callback_data: `j:${index}` },
      ]),
      [CANCEL],
    ]);
  }
  if (data.startsWith('j:') && state.slugs) {
    const slug = state.slugs[Number(data.slice(2))];
    const job = (await loadJobs({ strict: true })).find((item) => item.slug === slug);
    if (!job) return menu(chatId, 'Tu zakázku už nemůžu najít.');
    await setState(chatId, { mode: 'edit', slug });
    return jobMenu(chatId, job);
  }

  // --- přidávání
  if (state.mode === 'add' && state.draft) {
    if (data === 'skip' && state.wait === 'takeaway') {
      return askNext(chatId, { ...state, draft: { ...state.draft, takeaway: '' } });
    }
    if (data.startsWith('svc:') && state.wait === 'service') {
      const slug = data.slice(4);
      return askNext(chatId, { ...state, draft: { ...state.draft, serviceSlug: slug === 'none' ? '' : slug } });
    }
    if (data === 'plate:ok' && state.wait === 'plate' && state.pendingPhoto) {
      return askNext(chatId, { mode: 'add', draft: { ...state.draft, photo: state.pendingPhoto } });
    }
    if (data === 'plate:no' && state.wait === 'plate') {
      await deletePhoto(state.pendingPhoto);
      await setState(chatId, { mode: 'add', draft: state.draft, wait: 'photo' });
      return send(chatId, 'Dobře, pošli jinou fotku, nebo tu samou s rozmazanou SPZ.', [[CANCEL]]);
    }
    if (data === 'pub' && state.wait === 'preview') return publish(chatId, state.draft);
  }

  // --- úprava
  if (state.mode === 'edit' && state.slug) {
    const slug = state.slug;
    if (data.startsWith('f:')) {
      const field = data.slice(2);
      if (field === 'service') {
        await setState(chatId, { mode: 'edit', slug, wait: 'service' });
        return send(chatId, 'Ke které službě zakázka patří?', serviceButtons());
      }
      if (field === 'photo') {
        await setState(chatId, { mode: 'edit', slug, wait: 'photo' });
        return send(chatId, 'Pošli novou fotku. Nejlíp na výšku a tak, aby nebyla vidět SPZ.', [[CANCEL]]);
      }
      if (field in FIELDS) {
        await setState(chatId, { mode: 'edit', slug, wait: field as TextField });
        const clear: Button[] = field === 'takeaway' ? [{ text: 'Smazat ponaučení', callback_data: 'skip' }] : [];
        return send(chatId, FIELDS[field as TextField].ask, [[...clear, CANCEL]]);
      }
    }
    if (data === 'skip' && state.wait === 'takeaway') {
      return updateJob(chatId, slug, (job) => {
        delete job.takeaway;
      });
    }
    if (data.startsWith('svc:') && state.wait === 'service') {
      const service = data.slice(4);
      return updateJob(chatId, slug, (job) => {
        const oldTag = SERVICE_TAGS[job.serviceSlug ?? ''];
        if (service === 'none') delete job.serviceSlug;
        else job.serviceSlug = service;
        // Štítek měníme jen tam, kde ho bot sám vytvořil (jediný štítek podle služby).
        if (job.tags.length === 0 || (job.tags.length === 1 && job.tags[0] === oldTag)) {
          job.tags = SERVICE_TAGS[service] ? [SERVICE_TAGS[service]] : [];
        }
      });
    }
    if (data === 'plate:ok' && state.wait === 'plate' && state.pendingPhoto) {
      const photo = state.pendingPhoto;
      let old: string | undefined;
      const result = await updateJob(chatId, slug, (job) => {
        old = job.image.src;
        job.image = { src: photo, alt: `${job.car} v dílně` };
      });
      await deletePhoto(old);
      return result;
    }
    if (data === 'plate:no' && state.wait === 'plate') {
      await deletePhoto(state.pendingPhoto);
      await setState(chatId, { mode: 'edit', slug, wait: 'photo' });
      return send(chatId, 'Dobře, pošli jinou fotku, nebo tu samou s rozmazanou SPZ.', [[CANCEL]]);
    }
    if (data === 'hide') {
      return updateJob(chatId, slug, (job) => {
        if (job.hidden) delete job.hidden;
        else job.hidden = true;
      });
    }
    if (data === 'del') {
      return send(chatId, 'Opravdu smazat? Nejde to vrátit. Jestli ji chceš jen schovat, dej „Skrýt z webu“.', [
        [{ text: 'Ano, smazat', callback_data: 'delyes' }],
        [{ text: 'Ne, nechat', callback_data: `j:keep` }],
      ]);
    }
    if (data === 'j:keep') {
      const job = (await loadJobs({ strict: true })).find((item) => item.slug === slug);
      return job ? jobMenu(chatId, job) : menu(chatId);
    }
    if (data === 'delyes') {
      const jobs = await loadJobs({ strict: true });
      const job = jobs.find((item) => item.slug === slug);
      await saveJobs(jobs.filter((item) => item.slug !== slug));
      refreshSite();
      await deletePhoto(job?.image.src);
      await setState(chatId, {});
      return menu(chatId, 'Smazáno. Ještě něco?');
    }
  }

  // Tlačítko ze staré zprávy, které už k rozdělané práci nepatří.
  return menu(chatId, 'Tohle tlačítko už neplatí. Co chceš udělat?');
}

async function onMessage(chatId: number, message: TgMessage, state: State) {
  const text = message.text?.trim() ?? '';
  if (['?', '/start', '/menu', 'menu'].includes(text.toLowerCase())) {
    await reset(chatId, state);
    return menu(chatId);
  }

  if (state.wait === 'photo' && state.mode) {
    const hint = state.mode === 'add' ? state.draft?.car ?? '' : state.slug ?? '';
    const photo = await storePhoto(message, hint);
    if (!photo) return send(chatId, 'Tady potřebuju fotku. Pošli ji prosím jako obrázek.', [[CANCEL]]);
    await setState(chatId, { ...state, wait: 'plate', pendingPhoto: photo });
    return askPlate(chatId);
  }

  if (state.wait && state.wait in FIELDS && text) {
    const field = state.wait as TextField;
    if (state.mode === 'add' && state.draft) {
      const draft = { ...state.draft };
      const problem = applyText(draft, field, text);
      if (problem) return send(chatId, problem, [[CANCEL]]);
      return askNext(chatId, { ...state, draft });
    }
    if (state.mode === 'edit' && state.slug) {
      const probe: Draft = {};
      const problem = applyText(probe, field, text);
      if (problem) return send(chatId, problem, [[CANCEL]]);
      return updateJob(chatId, state.slug, (job) => {
        const autoAlt = job.image.alt === `${job.car} v dílně`;
        Object.assign(job, probe);
        if (field === 'car' && autoAlt) job.image.alt = `${job.car} v dílně`;
      });
    }
  }

  if (state.wait) return send(chatId, 'Tomu nerozumím. Odpověz prosím na poslední otázku, nebo to zruš.', [[CANCEL]]);
  return send(chatId, 'Napiš <b>?</b> a ukážu ti, co všechno můžeš na webu upravit.');
}

export async function handleTelegramUpdate(update: TgUpdate) {
  const chatId = update.message?.chat.id ?? update.callback_query?.message?.chat.id;
  if (!chatId) return;
  if (!isAdmin(chatId)) {
    // Cizí člověk se dál nedostane. ID mu ukážeme, aby ho šlo případně přidat mezi správce.
    await send(chatId, `Tenhle bot je jen pro majitele servisu. Tvoje ID: ${chatId}`).catch(() => {});
    return;
  }

  try {
    const state = await getState(chatId);
    if (update.callback_query) {
      const { id, data, message } = update.callback_query;
      await tg('answerCallbackQuery', { callback_query_id: id }).catch(() => {});
      // Použitá tlačítka schováme, ať se na ně nedá kliknout podruhé.
      if (message) {
        await tg('editMessageReplyMarkup', { chat_id: chatId, message_id: message.message_id }).catch(() => {});
      }
      await onCallback(chatId, data ?? '', state);
    } else if (update.message) {
      await onMessage(chatId, update.message, state);
    }
  } catch (error) {
    console.error('Telegram bot:', error instanceof Error ? error.message : error);
    await send(chatId, 'Něco se nepovedlo a změna se neuložila. Zkus to prosím znovu, nebo napiš Milanovi.').catch(() => {});
  }
}
