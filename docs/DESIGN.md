# DESIGN – autoservisdk.cz

## Motiv

Dílna má na stropě **šestiúhelníková LED světla** (viz fotky z Google profilu). Web je z nich postavený:
tmavý grafit, studeně bílé šestiúhelníky (`HexCluster`, jemný glow) a jedna signální barva — **jantarová
„kontrolka"** z palubní desky. Stavové barvy (zelená / oranžová / červená) patří jen k prověrkám a reportům.

## Tokeny (`src/app/globals.css`, `@theme`)

| Token | Hodnota | Použití |
|---|---|---|
| `ink` | #0c0e11 | hero, patička, nejtmavší plochy |
| `graphite` | #14171c | tmavé sekce |
| `steel` | #1d2228 | karty na tmavém |
| `line` | #2d343d | linky na tmavém |
| `fog` | #a3acb6 | sekundární text na tmavém (7,6 : 1) |
| `paper` | #f4f4f1 | výchozí světlé pozadí |
| `slate` | #4a525c | sekundární text na světlém (7,4 : 1) |
| `amber` | #ffb21e | tlačítka, zvýraznění — **text na ní vždy `ink`** (11 : 1) |
| `ok` / `warn` / `bad` | #1f9d55 / #c77700 / #d23b3b | stavy prověrky (+ `-soft` pozadí) |

WhatsApp tlačítko: #25d366 s tmavým textem.

## Typografie

- Nadpisy: **Barlow Condensed** 700. H1 velkými písmeny, H2 normálně (velká písmena všude působila šablonovitě).
- Text: **systémové písmo** (San Francisco / Roboto / Segoe UI) – nic se nestahuje a nepůsobí šablonovitě jako Inter. Barlow jen řez 700 s `latin-ext`.
- Kicker nad nadpisem: `.kicker` (malý jantarový šestiúhelník + kapitálky).

## Komponenty

- `Header` (sticky, tmavý), `MobileActionBar` (mobil: Zavolat · WhatsApp · Objednat — vždy vidět), `Footer`.
- `PageHero` — úvod podstránky (drobečky + BreadcrumbList JSON-LD, jediný H1, fotka nebo `aside`).
- `GoogleRating` — odznak (`badge`) nebo karta (`card`) s odkazy na recenze a „Napsat recenzi".
- `ReportPreview`, `StatusBadge` — karta výsledku prověrky, štítky V pořádku / Pozor / Vada (barva + ikona + text).
- `ServiceRequestForm` — jeden formulář pro servis, pneu, prověrku (Netlify Forms `objednavka`).
- `MapEmbed` — mapa Google až po kliknutí (bez cookies předem).
- `CtaBand`, `BookingOptions`, `ContactCard`, `PriceList`, `JobCard`, `ProcessSteps`, `FaqList` (`<details>`).

## Fotky

Jen skutečné fotky z dílny (starý web + Google profil), převedené do WebP 1200 px. **SPZ rozmazané.**
Chybí portrét Dennise (TODO v `o-mne`). Dennis by měl poslat originály fotek z Google profilu ve vyšším rozlišení
(Jaguar má jen 1122 px na šířku).
