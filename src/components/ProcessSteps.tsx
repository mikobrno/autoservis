/**
 * Jak u mě oprava probíhá – obyčejný číslovaný seznam, žádné karty s ikonkami.
 * Vychází z toho, co Dennis slibuje na starém webu (vysvětlím každý krok,
 * cena bez skrytých poplatků, domluva se zákazníkem).
 */
const steps = [
  'Zavoláte nebo napíšete, co auto dělá. Fotka nebo krátké video mi hodně pomůže.',
  'Auto prohlédnu, připojím diagnostiku a zjistím, co mu je.',
  'Řeknu vám, co je potřeba udělat a kolik to bude stát. Co jsem našel, vám ukážu nebo pošlu na fotce.',
  'Opravím jen to, na čem se domluvíme. Když při práci najdu něco dalšího, nejdřív se ozvu.',
];

export default function ProcessSteps({ onDark = false }: { onDark?: boolean }) {
  return (
    <ol className="grid gap-x-10 gap-y-5 md:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
              onDark ? 'bg-amber text-ink' : 'bg-ink text-white'
            }`}
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <p className={`pt-1 text-base leading-relaxed sm:text-lg ${onDark ? 'text-fog' : 'text-ink'}`}>{step}</p>
        </li>
      ))}
    </ol>
  );
}
