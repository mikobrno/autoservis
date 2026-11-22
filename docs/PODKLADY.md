# PODKLADY – co chybí od Dennise (a co udělat mimo web)

Stav k 16. 11. 2026. Vše je v kódu označené `// TODO(podklady)`.

## Musí být před spuštěním

- [x] **Telefon:** +420 774 883 911 (potvrdil Dennis 16. 11. 2026, i pro WhatsApp). Starý web má ještě 737 020 324 –
      zmizí přepojením domény. Ověřit, že na Instagramu je stejné číslo.
- [x] **WhatsApp** na hlavním čísle 774 883 911 – ano.
- [ ] **IČO** a **e-mail** pro objednávky (+ e-mail pro notifikace z Netlify Forms). → `contact.ts`
- [x] **Plátce DPH:** ne („Nejsme plátci DPH" – Dennisův ceník na Google profilu).
- [x] **Ceník pneuservisu** – přepsán z Dennisova ceníku na Google profilu (`tyrePriceTables` v `src/lib/pricing.ts`).
      Ověřeno proti originálu ceníku v plném rozlišení (16. 11. 2026) – ceny i poznámky sedí.
- [ ] **Ceník servisu a prověrky** – alespoň „od" ceny: diagnostika, výměna oleje, DSG olej, destičky, kotouče+destičky,
      tlumiče, řemen+kladky, příprava na STK, prověrka (výjezd / dílna), hodinová sazba. → `src/lib/pricing.ts`
- [ ] **Prověrka:** potvrdit checklist (`src/lib/inspection.ts`) — hlavně tloušťkoměr laku, prověření historie
      (Cebia / jiná služba — kdo ji platí?), dosah výjezdu („Frýdek-Místek a okolí" — kolik km?), cena dojezdu.
- [ ] **Doba uchování údajů** v zásadách (navrženo 3 roky). → `ochrana-osobnich-udaju`
- [ ] **Přístup k doméně autoservisdk.cz** (registrátor, DNS) a k současnému WordPress hostingu → přepojení na Netlify.
- [ ] **Google profil:** přepsat otevírací dobu na Po–Pá 8–17, So 9–12 (Dennis změnil 22. 11. 2026, web už ji má).

## Hodilo by se

- [ ] **Portrét Dennise** v dílně (na /o-mne a do hero).
- [ ] **Originály fotek** z Google profilu (Jaguar, BMW E60, Fiat, podvozek) ve vyšším rozlišení.
- [ ] Další zakázky (fotka + co zákazník řešil + co jsem našel + co jsem udělal). → `src/lib/jobs.ts`
- [ ] **Reservio** (nebo jiný kalendář) — založit účet, služby: přezutí, olej, příprava na STK, prověrka v dílně.
      Odkaz → `bookingUrl` v `contact.ts`.
- [ ] Logo ve vektoru, pokud existuje (na rámečcích SPZ je „DK AUTOSERVIS · servis · údržba · diagnostika").
- [ ] Pneuhotel / úschova kol — nabízí? Pak doplnit na /pneuservis.
- [ ] GA4 měření — chceme? → `NEXT_PUBLIC_GA_ID` v Netlify (bez něj se cookie lišta vůbec neukáže).

## Mimo web (Milan + Dennis)

- [ ] **Google Business Profile:** sjednotit telefon, doplnit fotky, kategorie „Autoservis" + „Pneuservis",
      odkaz na nový web, popis s prověrkou ojetin. Po každé zakázce poprosit o recenzi
      (odkaz „Napsat recenzi" je na webu i v `googleWriteReviewUrl`).
- [ ] **firmy.cz** — Dennis tam vůbec není (zdarma, Seznam = velká část místního hledání).
- [ ] Instagram — do bia odkaz na nový web.
- [ ] Po spuštění: Google Search Console + odeslat sitemap, ověřit 301 ze starých adres (`/sluzby/` → `/servis`).
