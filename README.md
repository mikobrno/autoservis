# autoservisdk.cz

Nový web autoservisu a pneuservisu Dennise Koribaniče ve Frýdku-Místku (náhrada WordPressu na autoservisdk.cz).
Next.js 16 (App Router, statické stránky), Tailwind CSS 4, nasazení na Netlify, formuláře přes Netlify Forms.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkční build
npm run lint
```

## Kde co je

| Co | Kde |
|---|---|
| Název, telefon, adresa, hodiny, hodnocení Google, WhatsApp, Reservio | `src/lib/contact.ts` |
| Služby a jejich stránky `/servis/[slug]`, pneuservis | `src/lib/services.ts` |
| Ceník | `src/lib/pricing.ts` |
| Prověrka před koupí — balíčky, checklist, ukázkový report | `src/lib/inspection.ts` |
| Zakázky `/nase-prace/[slug]` | `src/lib/jobs.ts` |
| Časté dotazy | `src/lib/faq.ts` |
| SEO (metadata, JSON-LD `AutoRepair`) | `src/lib/seo.ts` |
| Formulář pro Netlify | `src/components/ServiceRequestForm.tsx` + `public/__forms.html` |

Pravidla pro úpravy: `CLAUDE.md`. Brief: `docs/BRIEF.md`. Chybějící podklady: `docs/PODKLADY.md`.

## Nasazení

Netlify: build `npm run build`, publish `.next` (viz `netlify.toml`), Node 22. Proměnná `NEXT_PUBLIC_GA_ID`
je volitelná. Po nasazení zapnout v Netlify notifikace formuláře `objednavka` na Dennisův e-mail a přepojit DNS
autoservisdk.cz. Staré adresy přesměrovává `next.config.ts`.
