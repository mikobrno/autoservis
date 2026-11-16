/**
 * Časté dotazy. Odpovědi jen podle toho, co Dennis sám uvádí (starý web,
 * Google profil). Nic, co nepotvrdil (pneuhotel, náhradní auto, záruční
 * podmínky, konkrétní doby), sem nepatří – viz CLAUDE.md.
 */
export type FaqCategory = 'obecne' | 'servis' | 'pneuservis' | 'proverka';

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  category: FaqCategory;
  /** Zobrazit i na homepage. */
  homepage?: boolean;
};

export const faq: FaqItem[] = [
  {
    id: 'cena-predem',
    q: 'Dozvím se cenu dřív, než začnete?',
    a: 'Ano. Nejdřív auto prohlédnu, pak vám řeknu, co je potřeba, a kolik to bude stát. Bez vašeho souhlasu nic navíc nedělám. Když během opravy najdu další závadu, zavolám nebo pošlu fotku a domluvíme se.',
    category: 'obecne',
    homepage: true,
  },
  {
    id: 'jak-objednat',
    q: 'Jak se nejrychleji objednám?',
    a: 'Zavolejte mi, napište na WhatsApp, nebo vyplňte krátký formulář na stránce Objednat. Když mi na WhatsApp rovnou pošlete fotku nebo video závady, umím často odhadnout, co to bude, ještě než přijedete.',
    category: 'obecne',
    homepage: true,
  },
  {
    id: 'znacky',
    q: 'Jaké značky opravujete?',
    a: 'Osobní auta běžných značek – u mě v dílně se potkává Škoda, VW, Audi, BMW i Jaguar. Když na něco nemám vybavení, řeknu vám to rovnou a doporučím, kam jet.',
    category: 'obecne',
  },
  {
    id: 'dily',
    q: 'Jaké díly používáte?',
    a: 'Kvalitní díly ověřených značek. Sám jsem kdysi odcházel ze servisů s pocitem, že mi namontovali nekvalitní díly – proto tohle beru vážně. Když jsou na výběr díly v různé cenové hladině, řeknu vám rozdíl a vyberete si.',
    category: 'servis',
  },
  {
    id: 'fotky',
    q: 'Uvidím, co bylo na autě špatně?',
    a: 'Ano. Co najdu, vám nafotím nebo natočím a vysvětlím. Staré díly vám rád ukážu. Chci, abyste přesně věděli, za co platíte.',
    category: 'servis',
    homepage: true,
  },
  {
    id: 'stk',
    q: 'Děláte i samotnou STK?',
    a: 'Technickou kontrolu dělá stanice technické kontroly. Já auto připravím tak, aby na ní prošlo napoprvé – projdu všechno, co kontroluje technik, a závady po domluvě opravím.',
    category: 'servis',
  },
  {
    id: 'prezuti-objednani',
    q: 'Musím se na přezutí objednat?',
    a: 'Doporučuji to – hlavně na podzim a na jaře, kdy chce přezouvat každý. S objednávkou nečekáte a máte jistotu termínu.',
    category: 'pneuservis',
  },
  {
    id: 'prodejce-nechce',
    q: 'Co když prodejce nechce auto pustit do servisu?',
    a: 'Proto jezdím i za autem – k bazaru nebo k soukromému prodejci ve Frýdku-Místku a okolí. Bez zvedáku nevidím spodek tak dobře jako v dílně, ale doklady, lak, diagnostiku, studený start i zkušební jízdu prověřím na místě. A pokud prodejce prověrku odmítá úplně, je to samo o sobě informace.',
    category: 'proverka',
    homepage: true,
  },
  {
    id: 'stocene-km',
    q: 'Poznáte stočené kilometry?',
    a: 'Kilometry porovnávám s historií vozu a se záznamy v řídicích jednotkách a dívám se, jestli opotřebení interiéru odpovídá nájezdu. Pokud ale o autě nikde neexistuje žádný záznam, nepozná to se stoprocentní jistotou nikdo – a já vám vždycky řeknu, jak moc si jistý jsem.',
    category: 'proverka',
  },
  {
    id: 'musim-byt',
    q: 'Musím být u prověrky osobně?',
    a: 'Nemusíte. Výsledek vám řeknu po telefonu a pošlu report s fotkami všech nálezů. Když ale můžete, přijeďte – na zkušební jízdě a u auta na zvedáku vám nejlíp ukážu, co jsem našel.',
    category: 'proverka',
  },
  {
    id: 'vysledek',
    q: 'Co od prověrky dostanu?',
    a: 'Verdikt (doporučuji / jen se slevou / nedoporučuji), seznam všech kontrolovaných bodů se stavem v pořádku, pozor nebo vada, fotky nálezů a odhad nákladů na opravy, které auto čekají. S tím se dá s prodejcem dobře vyjednávat o ceně.',
    category: 'proverka',
  },
  {
    id: 'od-koho',
    q: 'Prověříte auto z bazaru i od soukromníka?',
    a: 'Ano, je mi jedno, od koho kupujete. S prodejcem nemám nic společného a nemám důvod vám auto „prodat“ – pracuji pro vás.',
    category: 'proverka',
  },
];

export const faqByCategory = (category: FaqCategory) => faq.filter((item) => item.category === category);
export const homepageFaq = faq.filter((item) => item.homepage);
