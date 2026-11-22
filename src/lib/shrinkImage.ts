/**
 * Zmenší fotku z mobilu před odesláním formuláře.
 *
 * Fotka z telefonu má klidně 4–6 MB, Netlify Forms bere nejvýš 8 MB na celé
 * odeslání a na nižších tarifech má i měsíční limit na nahrané soubory.
 * Techničák zůstane čitelný i na 1600 px delší strany (obvykle 200–500 kB).
 *
 * Když prohlížeč fotku neumí přečíst (třeba HEIC na Windows), vrátí originál.
 */
export async function shrinkImage(file: File, maxSide = 1600, quality = 0.82): Promise<File> {
  if (!file.type.startsWith('image/') || typeof createImageBitmap !== 'function') return file;

  try {
    // from-image = otočit podle EXIF, jinak by fotka na výšku přišla položená.
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'technicak';
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() });
  } catch {
    return file;
  }
}
