// Skript pro optimalizaci obrázků
// Spustit pomocí: node scripts/optimize-images.mjs

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagesDir = join(__dirname, '..', 'public', 'images');

// Konfigurace
const CONFIG = {
  // Maximální šířka pro velké obrázky
  maxWidth: 1920,
  // Kvalita WebP
  webpQuality: 85,
  // Kvalita JPEG
  jpegQuality: 85,
  // Minimální velikost pro optimalizaci (v KB)
  minSizeKB: 50,
};

async function getImageFiles() {
  const files = await readdir(imagesDir);
  return files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
}

async function optimizeImage(filename) {
  const inputPath = join(imagesDir, filename);
  const stats = await stat(inputPath);
  const sizeKB = stats.size / 1024;
  
  // Skip small images
  if (sizeKB < CONFIG.minSizeKB) {
    console.log(`⏭️  Skipping ${filename} (${sizeKB.toFixed(1)} KB - too small)`);
    return { skipped: true };
  }

  const baseName = filename.replace(/\.(png|jpg|jpeg)$/i, '');
  const webpPath = join(imagesDir, `${baseName}.webp`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize if too large
    let pipeline = image;
    if (metadata.width > CONFIG.maxWidth) {
      pipeline = pipeline.resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }
    
    // Convert to WebP
    await pipeline
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);
    
    const newStats = await stat(webpPath);
    const newSizeKB = newStats.size / 1024;
    const savings = ((sizeKB - newSizeKB) / sizeKB * 100).toFixed(1);
    
    console.log(`✅ ${filename} → ${baseName}.webp`);
    console.log(`   ${sizeKB.toFixed(1)} KB → ${newSizeKB.toFixed(1)} KB (${savings}% saved)`);
    
    return {
      original: filename,
      webp: `${baseName}.webp`,
      originalSize: sizeKB,
      newSize: newSizeKB,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return { error: true, filename };
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`📁 Directory: ${imagesDir}\n`);
  
  const files = await getImageFiles();
  console.log(`Found ${files.length} images to process\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const file of files) {
    const result = await optimizeImage(file);
    
    if (result.skipped) {
      skipped++;
    } else if (result.error) {
      errors++;
    } else if (result.originalSize && result.newSize) {
      processed++;
      totalOriginal += result.originalSize;
      totalOptimized += result.newSize;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Processed: ${processed} files`);
  console.log(`   Skipped: ${skipped} files`);
  console.log(`   Errors: ${errors} files`);
  
  if (totalOriginal > 0) {
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    console.log(`\n💾 Total savings: ${(totalOriginal - totalOptimized).toFixed(1)} KB (${totalSavings}%)`);
    console.log(`   Original: ${(totalOriginal / 1024).toFixed(2)} MB`);
    console.log(`   Optimized: ${(totalOptimized / 1024).toFixed(2)} MB`);
  }
}

main().catch(console.error);
