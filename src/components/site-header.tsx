import Image from "next/image";

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8">
        <a
          className="flex min-w-0 items-center gap-3 transition-opacity duration-300 hover:opacity-80 sm:gap-4"
          href="#top"
        >
          <Image
            alt="All Quality logo"
            className="h-16 w-auto shrink-0 sm:h-20 lg:h-24"
            height={92}
            priority
            src="/all-quality-logo.svg"
            width={146}
          />
          <span className="hidden min-w-0 sm:block">
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.32em] text-muted">
              {location}
            </span>
            <span className="block truncate pt-1 font-serif text-xl font-semibold text-primary">
              {brandName}
            </span>
          </span>
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
