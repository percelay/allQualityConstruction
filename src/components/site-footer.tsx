import type { OfficeHour } from "@/lib/content";

interface NavItem {
  href: string;
  label: string;
}

interface SiteFooterProps {
  address: string;
  brandName: string;
  contactHeading: string;
  fax: string;
  navItems: NavItem[];
  officeHours: OfficeHour[];
  officeHoursHeading: string;
  phone: string;
}

export function SiteFooter({
  address,
  brandName,
  contactHeading,
  fax,
  navItems,
  officeHours,
  officeHoursHeading,
  phone,
}: SiteFooterProps) {
  return (
    <footer
      className="border-t border-border/70 bg-primary text-background"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px_260px] lg:px-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-background/60">
            {brandName}
          </p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            {contactHeading}
          </h2>
          <div className="mt-8 space-y-4 text-base leading-7 text-background/82">
            <p>{address}</p>
            <p>
              <a
                className="transition-opacity duration-300 hover:opacity-70"
                href={`tel:${phone.replace(/[^\d]/g, "")}`}
              >
                {`phone - ${phone}`}
              </a>
            </p>
            <p>{`fax - ${fax}`}</p>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-background/60">
            {officeHoursHeading}
          </p>
          <div className="mt-6 space-y-4">
            {officeHours.map((officeHour) => (
              <div key={officeHour.label}>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-background/55">
                  {officeHour.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-background/85">
                  {officeHour.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-background/60">
            {brandName}
          </p>
          <nav className="mt-6 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                className="text-sm font-semibold text-background/82 transition-opacity duration-300 hover:opacity-65"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

