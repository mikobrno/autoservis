import type { ReactNode } from 'react';

type SectionHeaderProps = {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Tmavé pozadí → světlé texty. */
  onDark?: boolean;
  align?: 'left' | 'center';
  id?: string;
  /** Úroveň nadpisu – výchozí h2 (H1 má každá stránka jen jeden). */
  as?: 'h1' | 'h2';
};

/** Nadpis sekce. data-reveal = nadpis a úvodní odstavec „přijedou“ zleva (RevealObserver + globals.css). */
export default function SectionHeader({
  kicker,
  title,
  lead,
  onDark = false,
  align = 'left',
  id,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {kicker && (
        <p data-reveal="heading" className={`kicker ${center ? 'justify-center' : ''} ${onDark ? 'text-amber' : 'text-slate'}`}>
          {kicker}
        </p>
      )}
      <Heading
        id={id}
        data-reveal="heading"
        className={`${kicker ? "mt-3" : ""} font-display text-[2rem] font-bold leading-[1.05] sm:text-4xl md:text-5xl ${onDark ? "text-white" : "text-ink"}`}
      >
        {title}
      </Heading>
      {lead && (
        <p data-reveal="lead" className={`mt-4 text-base leading-relaxed sm:text-lg ${onDark ? 'text-fog' : 'text-slate'}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
