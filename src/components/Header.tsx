'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import Logo from '@/components/Logo';
import ButtonLink from '@/components/ui/Button';
import { business, telHref } from '@/lib/contact';
import { mainNav } from '@/lib/navigation';

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Při otevřeném menu nescrollovat stránku pod ním.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Logo animate />

        <nav aria-label="Hlavní navigace" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(pathname, item.href) ? 'text-amber' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(business.phone)}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white hover:text-amber md:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {business.phone.replace('+420 ', '')}
          </a>
          <ButtonLink href="/objednat" size="sm">
            Objednat
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink xl:hidden">
          <nav aria-label="Mobilní navigace" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <ul className="divide-y divide-line">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className={`block py-4 font-display text-2xl font-bold uppercase ${
                      isActive(pathname, item.href) ? 'text-amber' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/objednat" size="lg" className="w-full">
                Objednat termín
              </ButtonLink>
              <ButtonLink href={telHref(business.phone)} variant="outlineDark" size="lg" className="w-full">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {business.phone}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
