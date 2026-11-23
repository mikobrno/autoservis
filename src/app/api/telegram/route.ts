import { handleTelegramUpdate } from '@/lib/telegramBot';

/**
 * Webhook Telegramu – sem bot posílá všechno, co mu Dennis napíše.
 * Telegram k požadavku přidává tajnou hlavičku (nastavená při setWebhook),
 * bez ní nikoho nepustíme. Vždy odpovídáme 200, jinak by Telegram zprávu
 * posílal pořád dokola.
 */
export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || request.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return new Response('Forbidden', { status: 403 });
  }
  try {
    await handleTelegramUpdate(await request.json());
  } catch (error) {
    console.error('Telegram webhook:', error instanceof Error ? error.message : error);
  }
  return new Response('ok');
}
