import ButtonLink from '@/components/ui/Button';
import HexCluster from '@/components/ui/HexCluster';
import { mainNav } from '@/lib/navigation';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-white md:py-32">
      <HexCluster className="pointer-events-none absolute -left-24 top-0 w-[520px] opacity-15" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="kicker justify-center text-amber">Chyba 404</p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase">Tahle stránka neexistuje</h1>
        <p className="mt-6 text-lg leading-relaxed text-fog">
          Možná se změnila adresa – web je nový. Zkuste některou z těchhle stránek:
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Úvod</ButtonLink>
          {mainNav.slice(0, 4).map((item) => (
            <ButtonLink key={item.href} href={item.href} variant="outlineDark">
              {item.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
