import PageHero from '@/components/PageHero';
import CookieSettingsLink from '@/components/CookieSettingsLink';
import Section from '@/components/ui/Section';
import { business, fullAddress, mailHref, telHref } from '@/lib/contact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ochrana osobních údajů',
  description:
    'Jak zpracovávám osobní údaje z objednávkového formuláře a měření návštěvnosti: jaké údaje, proč, jak dlouho, komu je předávám a jaká máte práva.',
  path: '/ochrana-osobnich-udaju',
});

/**
 * TODO(podklady): doplnit IČO a e-mail (contact.ts) a nechat Dennise potvrdit
 * dobu uchování údajů (navrženo: 3 roky od posledního kontaktu kvůli reklamacím).
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        kicker="GDPR"
        title="Ochrana osobních údajů"
        lead="Krátce a srozumitelně: jaké údaje od vás potřebuji, k čemu a co s nimi dělám."
        breadcrumbs={[{ label: 'Ochrana osobních údajů', href: '/ochrana-osobnich-udaju' }]}
      />
      <Section tone="paper" narrow>
        <div className="prose-dk text-ink">
          <h2 className="font-display uppercase">Kdo údaje zpracovává</h2>
          <p>
            Správcem osobních údajů je {business.owner}
            {business.ico ? `, IČO ${business.ico}` : ''}, {fullAddress} ({business.tradeName}). Kontakt:{' '}
            <a href={telHref(business.phone)}>{business.phone}</a>
            {business.email && (
              <>
                , <a href={mailHref(business.email)}>{business.email}</a>
              </>
            )}
            .
          </p>

          <h2 className="font-display uppercase">Objednávkový formulář</h2>
          <p>
            Když vyplníte formulář, zpracovávám údaje, které do něj napíšete: jméno, telefon, údaje o autě (typ, SPZ, VIN,
            fotku technického průkazu, odkaz na inzerát, kde auto stojí), požadovaný termín a zprávu. Potřebuji je, abych vám mohl potvrdit
            termín a připravit se na opravu nebo prověrku.
          </p>
          <ul>
            <li>
              <strong>Právní základ:</strong> jednání o smlouvě a její plnění (čl. 6 odst. 1 písm. b) GDPR).
            </li>
            <li>
              <strong>Jak dlouho:</strong> po dobu vyřízení objednávky a poté nejvýše 3 roky od posledního kontaktu – kvůli
              případným reklamacím a dotazům k provedené práci. Údaje z účetních dokladů uchovávám po dobu, kterou ukládá
              zákon.
            </li>
            <li>
              <strong>Kdo k nim má přístup:</strong> já a poskytovatel hostingu webu a formulářů Netlify, Inc. (zpracovatel,
              přenos do USA na základě standardních smluvních doložek).
            </li>
          </ul>

          <h2 className="font-display uppercase">WhatsApp a telefon</h2>
          <p>
            Pokud mi napíšete přes WhatsApp, zpracovává zprávy i společnost Meta (WhatsApp) podle svých podmínek. Fotky a
            videa, které mi pošlete, používám jen k posouzení závady. Na webu je zveřejním jen s vaším souhlasem a bez SPZ.
          </p>

          <h2 className="font-display uppercase">Měření návštěvnosti a cookies</h2>
          <p>
            Web používá Google Analytics jen tehdy, když s tím v liště souhlasíte (čl. 6 odst. 1 písm. a) GDPR). Bez
            souhlasu se měřicí skript vůbec nenačte. Souhlas můžete kdykoli odvolat:{' '}
            <CookieSettingsLink className="font-semibold underline underline-offset-2" />.
          </p>
          <p>
            Mapa Google se načte až po kliknutí na „Zobrazit mapu“ – teprve tehdy se připojíte ke Googlu. Pro fungování
            webu je v prohlížeči uložena jen vaše volba ohledně měření.
          </p>

          <h2 className="font-display uppercase">Vaše práva</h2>
          <p>
            Máte právo na přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost a právo vznést
            námitku. Stačí se mi ozvat. Pokud si myslíte, že s údaji nakládám v rozporu s předpisy, můžete podat stížnost u
            Úřadu pro ochranu osobních údajů (www.uoou.cz).
          </p>
        </div>
      </Section>
    </>
  );
}
