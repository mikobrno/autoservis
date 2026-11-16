import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * Drobečková navigace nad H1 podstránek (na tmavém pozadí). BreadcrumbList
 * JSON-LD generuje PageHero – tahle komponenta je jen vizuální.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Drobečková navigace" className="relative z-10 mb-6 text-sm text-fog">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-line">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'font-semibold text-white' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
