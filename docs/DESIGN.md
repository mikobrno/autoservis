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

## Rozsvícení dílny (úvodní efekt)

Při první návštěvě úvodní stránky je fotka dílny „zhasnutá“ a po jejím načtení světla naskočí jako zářivky
(2× bliknou, ~2 s), s nimi se rozsvítí jantarové „za co platíte“ v H1. Logo v hlavičce se obkreslí a zazáří,
šestiúhelníky v úvodu podstránek (desktop) naskakují postupně.

- Kód: `src/components/HeroLights.tsx`, třídy `dk-lights-*`, `dk-neon`, `dk-tube`, `dk-logo-*` v `globals.css`,
  skript v `<head>` v `layout.tsx`.
- Start až po načtení fotky (jinak by blikání proběhlo nad prázdnou plochou), pojistka 3 s.
- Přehraje se při každém zobrazení úvodu (načtení, obnovení, návrat přes menu) – Milan si to tak přál.
- Při vypnutých animacích v systému (`prefers-reduced-motion`, ve Windows časté) jen plynulé rozsvícení bez blikání;
  bez JavaScriptu se nic nespouští (`<noscript>` styl).
- Pozor: na adresách *.netlify.app vkládá Netlify do `<head>` HTML komentář, který rozbije hydrataci Reactu
  (chyba #418, stránka se překreslí). Na vlastní doméně se to neděje. HeroLights to ustojí (useLayoutEffect).

## Další animace úvodu (navázané na stejný start `dk-lights-go`)

Časová osa od rozsvícení (≈ 3 s, při každém zobrazení úvodu):

| čas | co | kde |
|---|---|---|
| od načtení | logo se „utáhne“ jako matice, přejede odlesk, šestiúhelník zazáří | `Logo.tsx` (`animate`), `.dk-logo-mark`, `.dk-shine` |
| 0–0.8 s | nadpis H1 se „usadí“ (jen transform + opacity) | `.dk-h1` v `page.tsx` |
| 0.1–1.65 s | palubní deska: kontrolky naskočí a postupně zhasnou | `Dashboard.tsx`, `.dk-dash-*` |
| 1.75 s | „✓ Vše v pořádku“ | `.dk-dash-ok` |
| 1.75–3.15 s | auto projede pod „za co platíte“, práší se, zůstane podtržení | `RoadUnderline.tsx`, `.dk-car-track`, `.dk-dust`, `.dk-road-line` |

Při scrollování (všechny stránky): nadpisy sekcí a jejich úvodní odstavce nalétávají zleva jako na milankost.cz
(`SectionHeader` → `data-reveal`, `RevealObserver.tsx`), report prověrky se „vyplní“ a dopadne razítko
(`ReportPreview` → `data-reveal="report"`). Záměrně jen nadpisy a report – karty, odstavce a fotky se nehýbou.

Pravidla:
- `dk-lights-go` zůstává na `<html>` do odchodu z úvodu (jinak by se zastavilo auto); při odchodu se uklidí,
  takže po návratu se vše spustí znovu.
- Stav „před startem“ a skryté nadpisy jsou v `@media (scripting: enabled)` → bez JavaScriptu je všechno vidět.
- Vypnuté animace v systému: nic se nehýbe ani nebliká, vše se jen prolne (auto a prach se nezobrazí).

## Ikony služeb (`ServiceIcon.tsx`, `.dk-ico-*` v `globals.css`)

Každá ikona krátce „ožije“ podle významu: diagnostika – ručička budíku švihne; olej – kapka ukápne; brzdy – kotouč
se roztočí a zabrzdí; podvozek – klíč se pootočí; motor – ozubené kolo se otočí; STK – fajfka se dokreslí;
pneu – kolo (vlastní SVG s paprsky, aby bylo vidět kutálení) přijede; prověrka – lupa prohledá a odškrtne.
Spustí se jednou při doscrollování (`data-reveal="icon"`) a znovu po najetí myší na kartu – `RevealObserver`
restartuje animace v nejbližším odkazu nebo prvku s `data-ico-card`. Animace musí mít fill `both` (jinak restart
nefunguje). Vypnuté animace: ikona jen krátce zjantaruje.
