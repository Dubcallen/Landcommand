"use client";

type HeroProps = {
  kicker?: string;
  headline?: string;
  subhead?: string;
};

export default function Hero({
  kicker = "Boutique Land Brokerage",
  headline = "Curated Land, Farm & Ranch Opportunities",
  subhead = "Exceptional acreage for discerning buyers and sellers—thoughtfully presented and privately sourced.",
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background video from /public */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src="/hero.mp4"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom gradient to charcoal so the hero blends into the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-charcoal" />
      </div>

      {/* Push content down so the overlaid header never collides */}
      <div className="mx-auto max-w-7xl px-4 pt-40 pb-16 md:pt-48 md:pb-24">
        <p className="text-[11px] uppercase tracking-[0.24em] text-white/80">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 max-w-2xl text-white/85">{subhead}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/properties"
            className="inline-flex items-center rounded-xl border border-white/70 bg-white/0 px-4 py-2 font-medium text-white hover:bg-white/10"
          >
            Browse Listings
          </a>
          <a
            href="/contact"
            className="inline-flex items-center rounded-xl border border-white/70 bg-white/0 px-4 py-2 font-medium text-white hover:bg-white/10"
          >
            Private Listings
          </a>
        </div>
      </div>
    </section>
  );
}
