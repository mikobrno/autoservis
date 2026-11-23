import { photoBlobStore, readBinary } from '@/lib/jobsStore';

/**
 * Fotky zakázek, které Dennis poslal botovi v Telegramu (uložené v Netlify Blobs).
 * Název souboru obsahuje náhodnou část, takže se dá cachovat napořád – výměna
 * fotky znamená nový název.
 */
const TYPES: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const type = TYPES[name.split('.').pop()?.toLowerCase() ?? ''];
  if (!type || !/^[a-z0-9-]+\.[a-z]+$/.test(name)) return new Response('Not found', { status: 404 });

  const data = await readBinary(photoBlobStore(), name);
  if (!data) return new Response('Not found', { status: 404 });

  return new Response(data, {
    headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
