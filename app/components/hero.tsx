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
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src="/hero.mp4"
        />
        {/* Darken for readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom fade to charcoal to blend into page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-charcoal" />
      </div>

      {/* Foreground content */}
      <div className="section pt-32 pb-16 md:pt-40 md:pb-24">
        <p className="text-[11px] uppercase tracking-nav text-brand-linen/80">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-linen md:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-linen/85">{subhead}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/listings" className="btn btn--light">Browse Listings</a>
          <a href="#private" className="btn btn--light">Private Listings</a>
        </div>
      </div>
    </section>
  );
}
