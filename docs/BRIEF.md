# BRIEF – autoservisdk.cz (Dennis Koribanič)

Závazný pro všechny, kdo na webu pracují. Vznikl 16. 11. 2026 z analýzy starého webu, Google profilu,
průzkumu trendů (USA/EU bazary a servisy) a místní konkurence.

## 1. Kdo a co

- **Dennis Koribanič**, autoservis na **Palkovická 2204, 738 01 Frýdek-Místek**. Pracuje **sám** → 1. osoba.
- **Služby:** servis a opravy (diagnostika, olej a filtry vč. DSG a diferenciálu, brzdy, podvozek, opravy motoru,
  příprava na STK), **pneuservis** (přezutí, vyvážení, defekty) a **prověření auta před koupí**
  (výjezd k prodejci nebo kompletně v dílně na zvedáku).
- **Neprodává auta** — žádný bazar.
- Zdroj rozsahu: popis Google profilu („počítačová diagnostika, výměny olejů a filtrů, opravy brzd a podvozku, opravy
  motorů … pneuservis, přezouvání pneumatik, vyvažování kol a opravy defektů"), starý web, případovky.
- **Název:** zatím **DK Autoservis** (Google: „DK Autoservis a Pneuservis"), doména **autoservisdk.cz** (zůstává).
  Zamítnuté návrhy: Koriban, Kori, Denkor, DK Motors, U Dennise, Garáž 2204, Auto na rovinu, Dennis Garage,
  Dennis servis, Denko servis. Zásoba volných .cz (RDAP CZ.NIC, 16. 11. 2026) pro případné přejmenování:
  autoserviskontrolka.cz, autoservisostravice.cz, autoservisbeskydy.cz, autoservispodlysou.cz,
  autoservisondrejnik.cz, jasnyautoservis.cz, autoservisnarovinu.cz, autoservisprimo.cz, autoservismistr.cz,
  autoservis2204.cz, autoservispalkovicka.cz, autoservismistek.cz. Pozor: „Kodis" koliduje s KODIS (doprava MSK).

## 2. Positioning a tón

Hlavní věta: **„Autoservis, kde víte, za co platíte."** (z Dennisova příběhu: „místo, kde lidé přesně vědí, za co platí")

USP v pořadí:
1. **Cena předem** — po prohlídce, ne až na faktuře. Bez souhlasu nic navíc.
2. **Co najdu, ukážu** — fotky a video nálezů (trend DVI z USA), staré díly k nahlédnutí.
3. **Prověrka ojetiny jako produkt** — pojmenovaný checklist, stavy OK / pozor / vada, verdikt, odhad oprav
   (inspirace Carvana, Carvago, AAA Auto). Dennis pracuje pro kupujícího, ne pro prodejce.
4. **Osobně** — jeden člověk, přímý telefon, WhatsApp.
5. **Kvalitní díly** a pečlivá práce („ke každému autu přistupuji, jako by bylo moje vlastní").

Tón: 1. osoba jednotného čísla, vykání, krátké věty, konkrétní příklady z dílny. Žádný korporátní jazyk
(„komplexní řešení", „špičková kvalita"). „Na rovinu" a „poctivě" ano, ale střídmě.

## 3. Místní konkurence (průzkum 16. 11. 2026)

- **H.A.S.** — jediný s online termíny (Reservio) a hodinovou sazbou. **Pneuservis Stískala** — nejvíc recenzí
  na firmy.cz, ceník prázdný. **AutoHerc** — bazar „připravený ve vlastním servisu", ale bez důkazů.
  **MAJCARS** — malý servis + prodej.
- Mezery, které web obsazuje: ceny s DPH u běžných úkonů, samoobslužné objednání, fotoreporty zakázek, recenze
  na webu, **doložená** prověrka ojetiny.

## 4. Údaje

| Údaj | Hodnota | Zdroj / stav |
|---|---|---|
| Telefon | +420 774 883 911 | potvrdil Dennis 16. 11. 2026, i pro WhatsApp (starý web měl 737 020 324) |
| Otevírací doba | Po–Pá 8–17, So 9–12, Ne zavřeno | Dennis 22. 11. 2026 (Google profil upravit) |
| Hodnocení | 5,0 ★, 11 recenzí | Google, 16. 11. 2026 |
| Google place ID | ChIJLyOX4fP3E0cRrmVonB1fySA | |
| Instagram | @dk_autoservis_ | starý web |
| IČO, e-mail | — | TODO(podklady) |
| Ceny | — | TODO(podklady), web ukazuje „na dotaz" |

## 5. Fáze

- **Fáze 1 (hotovo v kódu):** statický web, formulář (Netlify Forms), WhatsApp, Reservio připravené (`bookingUrl`).
- **Fáze 2:** administrace v Supabase — Dennis z mobilu zakládá prověrky (checklist + fotky) a zakázky,
  zákazník dostane soukromý odkaz `/report/[token]`, po souhlasu se prověrka zveřejní anonymně.
- **Fáze 3:** připomínky STK / oleje / přezutí (Mailjet), žádost o recenzi po zakázce.
