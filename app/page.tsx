import Image from "next/image";
import FeatureTiles from "./components/feature-tiles";
import CtaBand from "./components/cta-band";

export const metadata = {
  title: "Land Command — America’s Premiere Land Specialists",
  description:
    "Exclusive land, farm, equestrian, and estate opportunities. List your property, commission short films and stories, and explore financing.",
};

export default function HomePage() {
  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      {/* HERO (video + name + tagline + CTA row + category pill) */}
      <section className="relative isolate min-h-screen w-full overflow-hidden">
        {/* Background video */}
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Center branding */}
        <div className="relative z-10 flex flex-col items-center pt-28 text-center">
          {/* Removed the big logo here */}
          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
            LAND COMMAND
          </h1>
          <p className="mt-3 text-lg md:text-xl font-sans text-white/90 uppercase tracking-wide">
            America&apos;s Premiere Land Specialists
          </p>

        {/* Category line */}
          <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; EQUESTRIAN &nbsp; | &nbsp; ESTATE
          </div>

          {/* CTAs (renamed + linked) */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/properties/available"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-sans text-white hover:bg-white/10"
            >
              Buy
            </a>
            <a
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 text-sm font-sans text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              Sell
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
      </section>

      {/* Featured Properties (unchanged) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Featured Properties</h2>
          <a
            href="/properties/available"
            className="text-sm text-white/80 hover:text-white"
          >
            View All →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <a
              key={i}
              href="/properties/available"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:bg-black/55 transition"
            >
              <div className="aspect-[4/3] bg-neutral-800/60" />
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Exclusive
                </div>
                <h3 className="mt-1 text-xl font-serif font-semibold">
                  Premium Acreage #{i}
                </h3>
                <p className="mt-1 text-white/75">County, State • 20–200± Acres</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Covey Rise–style Feature Tiles (hover brighten + 25% scale) */}
      <FeatureTiles />

      {/* Pre-footer CTA band */}
      <CtaBand />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-4">
            <a
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              List Your Property
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10"
            >
              Speak with a Specialist
            </a>
          </div>
          <p className="mt-4 text-sm text-white/60">
            © {new Date().getFullYear()} Land Command. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
