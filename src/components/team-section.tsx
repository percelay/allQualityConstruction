import Image from "next/image";

import type { TeamMember } from "@/lib/content";

interface TeamSectionProps {
  heading: string;
  image: string | null;
  member: TeamMember;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function TeamSection({ heading, image, member }: TeamSectionProps) {
  const bioSentences = splitSentences(member.bio);

  return (
    <section className="scroll-mt-28 py-16 sm:py-20" id="team">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1fr)] lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface shadow-[0_22px_50px_-34px_rgba(31,49,63,0.45)]">
          {image ? (
            <Image
              alt={member.name}
              className="h-full w-full object-cover"
              height={960}
              sizes="(min-width: 1024px) 36vw, 100vw"
              src={image}
              width={760}
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center bg-primary p-8 text-center text-background">
              <p className="font-serif text-3xl leading-tight font-semibold">{member.name}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-primary">
            {heading}
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight font-semibold text-primary sm:text-5xl">
            {member.name}
          </h2>
          <div className="mt-8 grid gap-4">
            {bioSentences.map((sentence) => (
              <p
                className="rounded-[1.5rem] border border-border/70 bg-surface px-6 py-5 text-base leading-7 text-text sm:text-lg"
                key={sentence}
              >
                {sentence}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

