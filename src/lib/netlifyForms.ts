/**
 * Odeslání formuláře do Netlify Forms.
 *
 * Data jdou jako `application/x-www-form-urlencoded` na /__forms.html, kde jsou
 * formuláře deklarované – Netlify je při buildu načte z toho statického souboru.
 * Pole `company` je honeypot, který Netlify zná přes data-netlify-honeypot.
 *
 * Kódujeme ručně přes encodeURIComponent, ne přes URLSearchParams: ten totiž
 * převádí mezery na `+` a Netlify je pak v notifikačním e-mailu zahodí
 * ("Dobrý den" dorazí jako "Dobrýden"). `%20` projde správně.
 */
export type NetlifyFormName = 'objednavka';

const encodeBody = (fields: Record<string, string>) =>
  Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`)
    .join('&');

export async function submitNetlifyForm(
  formName: NetlifyFormName,
  fields: Record<string, string>,
) {
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: encodeBody({ 'form-name': formName, ...fields }),
  });

  if (!response.ok) {
    throw new Error(`Netlify Forms odmítlo odeslání (${response.status}).`);
  }
}
