import Image from "next/image";

import type { OfficeHour } from "@/lib/content";

interface HeroSectionProps {
  about: string;
  brandName: string;
  heroHeadline: string;
  heroImage: string | null;
  location: string;
  officeHours: OfficeHour[];
  officeHoursHeading: string;
  primaryCta: string;
  secondaryCta: string;
  subheadline: string;
}

export function HeroSection({
  about,
  brandName,
  heroHeadline,
  heroImage,
  location,
  officeHours,
  officeHoursHeading,
  primaryCta,
  secondaryCta,
  subheadline,
}: HeroSectionProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-border/70"
      id="top"
    >
      {heroImage ? (
        <div className="absolute inset-0 -z-20">
          <Image
            alt=""
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src={heroImage}
          />
        </div>
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_85%,transparent)_0%,color-mix(in_oklab,var(--color-primary)_56%,transparent)_35%,color-mix(in_oklab,var(--color-background)_92%,transparent)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_28%),radial-gradient(circle_at_bottom_left,color-mix(in_oklab,var(--color-surface)_70%,transparent),transparent_38%)]" />

      <div className="mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.34em] text-white/80 backdrop-blur">
            {location}
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-white/65">
            {brandName}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] font-semibold text-white text-balance sm:text-6xl lg:text-7xl">
            {heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface"
              href="#contact"
            >
              {primaryCta}
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              href="#project-gallery"
            >
              {secondaryCta}
            </a>
          </div>
        </div>

        <div className="flex items-end lg:justify-end">
          <div className="grid w-full max-w-xl gap-4 rounded-[2rem] border border-white/12 bg-white/10 p-4 shadow-[0_28px_80px_-38px_rgba(10,22,31,0.85)] backdrop-blur-md sm:p-6">
            <div className="rounded-[1.5rem] border border-white/14 bg-primary/25 p-5 text-white">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/65">
                About
              </p>
              <p className="mt-3 text-base leading-7 text-white/86 sm:text-lg">{about}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/14 bg-background/88 p-5 text-text">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-muted">
                {officeHoursHeading}
              </p>
              <div className="mt-4 grid gap-3">
                {officeHours.map((officeHour) => (
                  <div
                    className="flex flex-col gap-1 rounded-2xl border border-border/70 bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    key={officeHour.label}
                  >
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-muted">
                      {officeHour.label}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {officeHour.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

