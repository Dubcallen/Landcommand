"use client";

import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    href: "/sell",
    title: "List With Us",
    subtitle: "Unrivaled Marketing",
    img: "/list.jpg", // stored in public/list-with-us.jpg
    cta: "Start Listing",
  },
  {
    href: "/short-films",
    title: "Short Films",
    subtitle: "Cinematic Reels",
    img: "/films.jpg", // stored in public/short-films.jpg
    cta: "View Portfolio",
  },
  {
    href: "/resources",
    title: "Resources",
    subtitle: "Expert Tips & Insights",
    img: "/resources.jpg", // stored in public/resources.jpg
    cta: "Access Land Expertise",
  },
];

export default function FeatureTiles() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          >
            {/* Image */}
            <div className="relative h-[440px] w-full">
              <Image
                src={t.img}
                alt={t.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-125 group-hover:brightness-110"
                priority={false}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/30" />
            </div>

            {/* Text block */}
            <div className="pointer-events-none absolute inset-0 flex items-end">
              <div className="w-full p-6">
                {t.subtitle && (
                  <div className="mb-1 text-xs uppercase tracking-[0.22em] text-white/70">
                    {t.subtitle}
                  </div>
                )}
                <h3 className="font-serif text-2xl leading-tight text-white">
                  {t.title}
                </h3>
                <div className="mt-2 h-[1px] w-14 bg-[rgba(203,178,106,0.9)]" />
                <div className="mt-4 text-sm text-white/85">
                  <span className="inline-flex items-center gap-2">
                    {t.cta}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
