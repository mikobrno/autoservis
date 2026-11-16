// Vygeneruje náhledový obrázek pro sdílení (Open Graph / X), 1200×630.
// Vlevo text na tmavém pozadí se šestiúhelníky, vpravo fotka z dílny.
// Spustit: node scripts/build-og-image.mjs
//
// Pozor: název a údaje jsou tu kvůli jednoduchosti napsané ručně. Při
// přejmenování servisu (src/lib/contact.ts) je upravte i tady a skript spusťte znovu.

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_WIDTH = 470;

const NAME_FIRST = 'DK';
const NAME_REST = 'AUTOSERVIS';
const CITY = 'FRÝDEK-MÍSTEK';

const INK = '#0c0e11';
const AMBER = '#ffb21e';
const FOG = '#a3acb6';

const hex = (cx, cy, r) =>
  [0, 60, 120, 180, 240, 300]
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`;
    })
    .join(' ');

const cells = [
  [0, 1], [1, 0], [1, 1], [2, 0], [2, 1], [2, 2], [3, 0], [3, 1],
].map(([col, row]) => {
  const r = 46;
  const cx = 470 + col * 1.5 * r;
  const cy = 40 + row * Math.sqrt(3) * r + (col % 2 ? (Math.sqrt(3) * r) / 2 : 0);
  return `<polygon points="${hex(cx, cy, r)}" fill="none" stroke="#eef4ff" stroke-width="3" opacity="0.18"/>`;
});

const svg = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}"/>
  ${cells.join('\n  ')}
  <polygon points="${hex(110, 120, 44)}" fill="#14171c" stroke="${AMBER}" stroke-width="5"/>
  <text x="110" y="135" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="40" fill="#fff">${NAME_FIRST}</text>
  <text x="172" y="112" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="34" fill="#fff" letter-spacing="1">${NAME_FIRST} <tspan fill="${AMBER}">${NAME_REST}</tspan></text>
  <text x="172" y="144" font-family="Arial, sans-serif" font-size="18" fill="${FOG}" letter-spacing="3">${CITY}</text>
  <text x="66" y="290" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="66" fill="#fff">AUTOSERVIS, KDE VÍTE,</text>
  <text x="66" y="362" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="66" fill="${AMBER}">ZA CO PLATÍTE</text>
  <text x="66" y="440" font-family="Arial, sans-serif" font-size="26" fill="${FOG}">Servis · pneuservis · prověrka ojetiny před koupí</text>
  <rect x="66" y="500" width="300" height="56" rx="28" fill="${AMBER}"/>
  <text x="216" y="536" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="22" fill="${INK}">Palkovická 2204</text>
</svg>`);

const photo = await sharp(join(imagesDir, 'dilna-jaguar.webp'))
  .resize(PHOTO_WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(svg)
  .composite([{ input: photo, left: WIDTH - PHOTO_WIDTH, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile(join(imagesDir, 'og-autoservisdk.jpg'));

console.log('✅ public/images/og-autoservisdk.jpg — 1200×630');
