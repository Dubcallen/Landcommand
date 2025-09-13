"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Images should live directly in /public:
 *   /list.jpg, /films.jpg, /resources.jpg
 * Paths below reference them as /list.jpg etc.
 */

const tiles = [
  {
    href: "/sell",
    title: "List With Us",
    subtitle: "Unrivaled Marketing",
    img: "/list.jpg",
    cta: "Start Listing",
  },
  {
    href: "/short-films",
    title: "Short Films",
    subtitle: "Cinematic Reels",
    img: "/films.jpg",
    cta: "View Portfolio",
  },
  {
    href: "/resources",
    title: "Resources",
    subtitle: "Expert Tips & Insights",
    img: "/resources.jpg",
    cta: "Access Land Expertise",
  },
];

export default function FeatureTiles() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {tiles.map((t) => (
          <Tile key={t.title} {...t} />
        ))}
      </div>
    </section>
  );
}

function Tile({
  href,
  title,
  subtitle,
  img,
  cta,
}: {
  href: string;
  title: string;
  subtitle?: string;
  img: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative isolate
        block
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-black/40
        shadow-[0_18px_60px_rgba(0,0,0,0.35)]
        will-change-transform
      "
      /* The container size is fixed by the inner .media wrapper; no scaling here. */
    >
      {/* MEDIA LAYER — fixed height, only the IMAGE scales/brightens */}
      <div className="relative h-[440px] w-full overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
          className="
            object-cover
            transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
            transform-gpu will-change-transform
            group-hover:scale-125
          "
          /* Only image transforms; container doesn't change layout. */
        />
        {/* Dark overlay (does NOT affect size) */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-black/45
            transition-opacity duration-300
            group-hover:opacity-70
          "
        />
        {/* Brightness wash on hover (visual only) */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-20
          "
          style={{ background: "linear-gradient(0deg, rgba(255,255,255,0.6), rgba(255,255,255,0.6))" }}
        />
      </div>

      {/* CONTENT LAYER — never moves or scales */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        <div className="w-full p-6">
          {subtitle && (
            <div className="mb-1 text-xs uppercase tracking-[0.22em] text-white/70">
              {subtitle}
            </div>
          )}
          <h3 className="font-serif text-2xl leading-tight text-white">{title}</h3>
          <div className="mt-2 h-[1px] w-14 bg-[rgba(203,178,106,0.9)]" />
          <div className="mt-4 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              {cta}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
