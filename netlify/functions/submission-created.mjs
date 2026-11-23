/**
 * Pošle novou objednávku z webu Dennisovi do Telegramu.
 *
 * Netlify tuhle funkci spouští samo po každém přijatém odeslání formuláře
 * (podle názvu souboru „submission-created"). Spam, který Netlify odfiltruje,
 * sem nedojde. Objednávka zůstává uložená i v Netlify (Forms), Telegram je
 * jen upozornění.
 *
 * Nastavení v Netlify → Environment variables:
 *   TELEGRAM_BOT_TOKEN – token bota od @BotFather (nikdy nedávat do kódu)
 *   TELEGRAM_CHAT_ID   – ID chatu, kam bot píše (Dennis musí botovi nejdřív poslat /start)
 */
const API = 'https://api.telegram.org';

const LABELS = [
  ['name', 'Jméno'],
  ['phone', 'Telefon'],
  ['car', 'Auto'],
  ['plate', 'SPZ'],
  ['vin', 'VIN'],
  ['listing', 'Inzerát'],
  ['location', 'Kde auto stojí'],
  ['package', 'Balíček'],
  ['preferredDate', 'Termín'],
  ['message', 'Zpráva'],
];

const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const call = async (token, method, body) => {
  const isForm = body instanceof FormData;
  const response = await fetch(`${API}/bot${token}/${method}`, {
    method: 'POST',
    headers: isForm ? undefined : { 'Content-Type': 'application/json' },
    body: isForm ? body : JSON.stringify(body),
  });
  if (!response.ok) {
    // Text chyby od Telegramu token neobsahuje, URL ano – tu nelogujeme.
    throw new Error(`Telegram ${method} ${response.status}: ${await response.text()}`);
  }
};

export const handler = async (event) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('Chybí TELEGRAM_BOT_TOKEN nebo TELEGRAM_CHAT_ID – objednávka je jen v Netlify Forms.');
    return { statusCode: 200, body: 'telegram not configured' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body ?? '{}').payload ?? {};
  } catch {
    return { statusCode: 400, body: 'bad payload' };
  }
  if (payload.form_name !== 'objednavka') return { statusCode: 200, body: 'ignored' };

  const data = payload.data ?? {};
  const lines = [`<b>Nová objednávka z webu</b>${data.type ? `: ${esc(data.type)}` : ''}`, ''];
  for (const [key, label] of LABELS) {
    const value = typeof data[key] === 'string' ? data[key].trim() : '';
    if (!value) continue;
    // Telefon necháváme jako holý text – Telegram z něj sám udělá odkaz k vytočení.
    lines.push(`<b>${label}:</b> ${esc(value)}`);
  }

  try {
    await call(token, 'sendMessage', {
      chat_id: chatId,
      text: lines.join('\n').slice(0, 4000),
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    });

    // Fotka techničáku: Netlify ji ukládá u sebe a v datech posílá odkaz.
    const photo = data.techPhoto;
    const photoUrl = typeof photo === 'string' ? photo : photo?.url;
    if (photoUrl) {
      const caption = `Techničák: ${data.name ?? ''}${data.car ? `, ${data.car}` : ''}`.slice(0, 1000);
      try {
        const file = await fetch(photoUrl);
        if (!file.ok) throw new Error(`stažení fotky ${file.status}`);
        const form = new FormData();
        form.append('chat_id', chatId);
        form.append('caption', caption);
        form.append('document', await file.blob(), photo?.filename || 'technicak.jpg');
        // sendDocument, ne sendPhoto: Telegram fotky zmenšuje a VIN by nemusel jít přečíst.
        await call(token, 'sendDocument', form);
      } catch (error) {
        console.error(error);
        await call(token, 'sendMessage', { chat_id: chatId, text: `${caption}\n${photoUrl}` });
      }
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'telegram failed' };
  }

  return { statusCode: 200, body: 'ok' };
};
