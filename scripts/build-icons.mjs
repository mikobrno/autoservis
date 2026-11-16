// Vygeneruje ikony aplikace z logo-dk.svg (šestiúhelník s iniciálami)
// Vytvoří icon.png (512×512), apple-icon.png (180×180) a favicon.ico
// Spustit pomocí: node scripts/build-icons.mjs

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const monogramPath = join(__dirname, '..', 'public', 'images', 'logo-dk.svg');
const appDir = join(__dirname, '..', 'src', 'app');

async function main() {
  try {
    // App icon 512×512
    await sharp(monogramPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(appDir, 'icon.png'));
    console.log(`✅ src/app/icon.png — 512×512`);

    // Apple icon 180×180
    await sharp(monogramPath)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(appDir, 'apple-icon.png'));
    console.log(`✅ src/app/apple-icon.png — 180×180`);

    // Favicon 32×32 (uloženo jako PNG s příponou .ico)
    // Moderní prohlížeče přijímají PNG data v .ico souboru
    await sharp(monogramPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(appDir, 'favicon.ico'));
    console.log(`✅ src/app/favicon.ico — 32×32 (PNG data v souboru .ico)`);
  } catch (error) {
    console.error('❌ Nepodařilo se vygenerovat ikony:', error.message);
    process.exit(1);
  }
}

main();
