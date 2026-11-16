import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outlineDark' | 'outlineLight' | 'whatsapp' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Jantarová „kontrolka“ – hlavní akce. Text vždy tmavý (kontrast 11 : 1).
  primary: 'bg-amber text-ink hover:bg-amber-dark',
  // Obrysové tlačítko na tmavém pozadí
  outlineDark: 'border border-white/30 text-white hover:border-white hover:bg-white/10',
  // Obrysové tlačítko na světlém pozadí
  outlineLight: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white',
  // WhatsApp zelená s tmavým textem (kontrast 9 : 1)
  whatsapp: 'bg-[#25d366] text-ink hover:bg-[#1fb857]',
  ghost: 'text-current underline-offset-4 hover:underline',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[0.95rem]',
  lg: 'px-7 py-4 text-base',
};

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Externí odkaz (WhatsApp, Google…) – otevře se v novém okně. */
  external?: boolean;
  'aria-label'?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  ...rest
}: ButtonLinkProps) {
  const cls = buttonClass(variant, size, className);
  const isNative = external || href.startsWith('tel:') || href.startsWith('mailto:');

  if (isNative) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
