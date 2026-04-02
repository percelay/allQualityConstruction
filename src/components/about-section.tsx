import type { Service } from "@/lib/content";

interface AboutSectionProps {
  about: string;
  heading: string;
  highlights: Service[];
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function AboutSection({ about, heading, highlights }: AboutSectionProps) {
  const aboutSentences = splitSentences(about);

  return (
    <section className="scroll-mt-28 border-b border-border/70 py-16 sm:py-20" id="about">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-primary">
            {heading}
          </p>
          <div className="space-y-5">
            {aboutSentences.map((sentence) => (
              <p className="max-w-2xl text-lg leading-8 text-text sm:text-xl" key={sentence}>
                {sentence}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-border/70 bg-primary p-7 text-background shadow-[0_24px_60px_-32px_rgba(31,49,63,0.7)]">
            <p className="font-serif text-3xl leading-tight font-semibold text-balance">
              {aboutSentences[aboutSentences.length - 1] ?? about}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {highlights.map((highlight) => (
              <article
                className="rounded-[1.75rem] border border-border/70 bg-surface p-6 transition-transform duration-300 hover:-translate-y-1"
                key={highlight.id}
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-muted">
                  {highlight.title}
                </p>
                <p className="mt-4 text-base leading-7 text-text">{highlight.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

