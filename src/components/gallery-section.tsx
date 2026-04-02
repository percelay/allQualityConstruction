import Image from "next/image";

import type { GalleryAsset } from "@/lib/content";

interface GallerySectionProps {
  heading: string;
  images: GalleryAsset[];
}

const spanStyles = [
  "sm:col-span-2 lg:col-span-7",
  "sm:col-span-2 lg:col-span-5",
  "sm:col-span-1 lg:col-span-4",
  "sm:col-span-1 lg:col-span-4",
  "sm:col-span-2 lg:col-span-4",
];

const aspectStyles = [
  "aspect-[4/3] sm:aspect-[16/10]",
  "aspect-[4/3] sm:aspect-[10/11]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
];

export function GallerySection({ heading, images }: GallerySectionProps) {
  return (
    <section
      className="scroll-mt-28 border-b border-border/70 py-16 sm:py-20"
      id="project-gallery"
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {images.map((image, index) => (
            <figure
              className={`${spanStyles[index % spanStyles.length]} ${aspectStyles[index % aspectStyles.length]} group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface`}
              key={image.src}
            >
              <Image
                alt={heading}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                src={image.src}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(15,23,31,0.12)_100%)]" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

