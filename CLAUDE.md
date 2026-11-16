# autoservisdk.cz – pravidla projektu

Web **Dennise Koribaniče**, který **sám** vede autoservis a pneuservis na Palkovické 2204 ve **Frýdku-Místku**
a nabízí i **prověření ojetého auta před koupí** (u prodejce i v dílně). Auta **neprodává**.
Závazný brief: `docs/BRIEF.md`. Design: `docs/DESIGN.md`. Chybějící podklady: `docs/PODKLADY.md`.
Šablona: `..\EkoUklidDomu` (Next.js 16, Tailwind 4, Netlify).

## Neporušitelná pravidla
- Texty v **1. osobě jednotného čísla**, vykání („prověřím", „zavolejte mi"). Nikde „tým", „naši mechanici",
  „naše firma", „zaměstnanci". „Domluvíme se" (vy a já) je v pořádku.
- **Název, kontakty, hodiny, hodnocení a odkazy jen v `src/lib/contact.ts`.** Název se může změnit
  (zásoba v briefu §1) — nikde jinde ho nepiš natvrdo, používej `business.tradeName` / `business.monogram`.
- **Žádná nepotvrzená čísla ani sliby:** ceny (`src/lib/pricing.ts`, `price: null` = „na dotaz"), roky praxe,
  záruky, pneuhotel, náhradní auto, doby oprav. Placeholdery mají `// TODO(podklady)`.
- **Hodnocení z Googlu** (`google.rating`, `google.reviewCount`) se opisuje ručně — při změně aktualizuj i `checkedAt`.
  Nedávej ho do JSON-LD jako `aggregateRating` (self-serving reviews).
- **Fotky:** jen skutečné z dílny (`public/images/`), žádná fotobanka. **SPZ vždy rozmazat** před použitím.
- Ukázkový report (`sampleReport` v `src/lib/inspection.ts`) je smyšlený — na webu musí být vždy označený jako ukázka.
- Každá stránka: jeden H1, `pageMetadata()` ze `src/lib/seo.ts` (title ≤ 60 zn., description 120–155 zn., canonical).
- Obsah jako data v `src/lib/*.ts`, komponenty bez natvrdo zapsaných kontaktů.
- Formulář = Netlify Forms: nové pole přidej do `ServiceRequestForm.tsx` **i** do `public/__forms.html`.

## Příkazy
- `npm run dev` – vývoj, `npm run build` – produkční build (musí projít), `npm run lint`.
- `node scripts/build-og-image.mjs` – OG obrázek, `node scripts/build-icons.mjs` – ikony z `public/images/logo-dk.svg`,
  `node scripts/optimize-images.mjs` – optimalizace fotek.

## Kontrola před dokončením úkolu
```
grep -rniE "\b(tým|týmu|týmem)\b|naše firma|naši mechanici|zaměstnanc" src public/llms.txt
grep -rn "DK Autoservis" src --include=*.tsx --include=*.ts | grep -v "src/lib/contact.ts"
```
první musí vrátit 0 řádků (kromě komentářů), druhý jen komentáře.
Před spuštěním webu: `grep -rn "TODO(podklady)" src` — projít s Milanem, co zůstává na „na dotaz".
