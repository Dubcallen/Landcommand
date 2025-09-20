// app/page.tsx

export const metadata = {
  title: "Land Command — America’s Premier Land Specialists",
  description:
    "Exclusive land, farm, investment, and estate opportunities. List your property, commission short films and stories, and explore financing.",
};

import Image from "next/image";
import Link from "next/link";
import Hero from "../components/Hero"; // ✅ fixed import path

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      {/* HERO (client component handles 6s rotation) */}
      <Hero />

      {/* Tiles Section (unchanged) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Explore Land Command</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/list.jpg",
              title: "List With Us",
              meta: "Flat Fee • National Exposure",
              link: "/sell",
            },
            {
              src: "/films.jpg",
              title: "Short Films",
              meta: "Cinematic Reels • 4K Aerial",
              link: "/short-films",
            },
            {
              src: "/resources.jpg",
              title: "Resources",
              meta: "Expertise • Insights • Guidance",
              link: "/resources",
            },
          ].map((card, i) => (
            <Link
              key={i}
              href={card.link}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-colors hover:bg-black/55"
              aria-label={card.title}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={i === 0}
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Exclusive
                </div>
                <h3 className="mt-1 text-xl font-serif font-semibold">{card.title}</h3>
                <p className="mt-1 text-white/75">{card.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              List Your Property
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10"
            >
              Speak with a Specialist
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">
            © {year} Land Command. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
