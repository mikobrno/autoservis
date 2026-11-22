/**
 * Odeslání formuláře do Netlify Forms.
 *
 * Data jdou na /__forms.html, kde jsou formuláře deklarované – Netlify je při
 * buildu načte z toho statického souboru. Pole `company` je honeypot, který
 * Netlify zná přes data-netlify-honeypot.
 *
 * Bez přílohy posíláme `application/x-www-form-urlencoded`. Kódujeme ručně přes
 * encodeURIComponent, ne přes URLSearchParams: ten totiž převádí mezery na `+`
 * a Netlify je pak v notifikačním e-mailu zahodí ("Dobrý den" dorazí jako
 * "Dobrýden"). `%20` projde správně.
 *
 * S přílohou (fotka techničáku) musí jít `multipart/form-data` přes FormData.
 * Content-Type pak nenastavujeme – prohlížeč do něj sám doplní boundary.
 * Netlify bere nejvýš 8 MB na celé odeslání a jeden soubor na pole.
 */
export type NetlifyFormName = 'objednavka';

const encodeBody = (fields: Record<string, string>) =>
  Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`)
    .join('&');

export async function submitNetlifyForm(
  formName: NetlifyFormName,
  fields: Record<string, string | File>,
) {
  const all: Record<string, string | File> = { 'form-name': formName, ...fields };
  const hasFile = Object.values(all).some((value) => value instanceof File);

  let init: RequestInit;
  if (hasFile) {
    const body = new FormData();
    for (const [key, value] of Object.entries(all)) {
      if (value instanceof File) body.append(key, value, value.name);
      else body.append(key, value ?? '');
    }
    init = { method: 'POST', body };
  } else {
    init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: encodeBody(all as Record<string, string>),
    };
  }

  const response = await fetch('/__forms.html', init);

  if (!response.ok) {
    throw new Error(`Netlify Forms odmítlo odeslání (${response.status}).`);
  }
}
