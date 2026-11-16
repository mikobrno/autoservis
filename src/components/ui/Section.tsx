import type { ReactNode } from 'react';

export type SectionTone = 'paper' | 'white' | 'dark' | 'ink';

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper text-foreground',
  white: 'bg-card text-foreground',
  dark: 'bg-graphite text-white',
  ink: 'bg-ink text-white',
};

type SectionProps = {
  children: ReactNode;
  tone?: SectionTone;
  id?: string;
  className?: string;
  /** Užší obsah pro textové stránky. */
  narrow?: boolean;
  'aria-labelledby'?: string;
};

/** Sekce stránky: plná šířka pozadí, obsah v kontejneru s 16px okrajem na mobilu. */
export default function Section({ children, tone = 'paper', id, className = '', narrow = false, ...rest }: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} py-12 md:py-20 ${className}`} {...rest}>
      <div className={`mx-auto px-4 sm:px-6 ${narrow ? 'max-w-3xl' : 'max-w-6xl'}`}>{children}</div>
    </section>
  );
}

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
);
