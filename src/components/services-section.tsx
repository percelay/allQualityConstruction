import {
  Building2,
  Hammer,
  Map,
  Shield,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import type { Service } from "@/lib/content";

interface ServicesSectionProps {
  heading: string;
  services: Service[];
}

const serviceIcons = [
  Building2,
  ShieldCheck,
  Shield,
  Map,
  Hammer,
  Workflow,
];

export function ServicesSection({ heading, services }: ServicesSectionProps) {
  return (
    <section
      className="scroll-mt-28 border-b border-border/70 bg-surface/35 py-16 sm:py-20"
      id="services"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-3xl flex-col gap-5">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-primary">
            {heading}
          </p>
          <h2 className="font-serif text-4xl leading-tight font-semibold text-primary sm:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <article
                className="group rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-[0_22px_50px_-34px_rgba(31,49,63,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35"
                key={service.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-border/70 bg-surface p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-background">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted">
                    {`Service ${service.id}`}
                  </p>
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-tight font-semibold text-primary">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-text">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

