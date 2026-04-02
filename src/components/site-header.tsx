interface NavItem {
  href: string;
  label: string;
}

interface SiteHeaderProps {
  brandName: string;
  location: string;
  navItems: NavItem[];
  primaryCta: string;
}

export function SiteHeader({
  brandName,
  location,
  navItems,
  primaryCta,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <a className="min-w-0 transition-opacity duration-300 hover:opacity-80" href="#top">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-muted">
            {location}
          </p>
          <p className="truncate pt-1 font-serif text-xl font-semibold text-primary">
            {brandName}
          </p>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              className="font-mono text-xs uppercase tracking-[0.26em] text-muted transition-colors duration-300 hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-soft"
          href="#contact"
        >
          {primaryCta}
        </a>
      </div>
    </header>
  );
}

