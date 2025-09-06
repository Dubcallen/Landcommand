"use client";

type HeroProps = {
  imageSrc?: string;       // e.g. /hero.jpg
  videoSrc?: string;       // e.g. /videos/hero.mp4
  kicker?: string;         // small uppercase text
  headline?: string;       // big headline
  subhead?: string;        // supporting copy
};

export default function Hero({
  imageSrc = "/hero.jpg",
  videoSrc,
  kicker = "Boutique Land Brokerage",
  headline = "Curated Land, Farm & Ranch Opportunities",
  subhead = "Exceptional acreage for discerning buyers and sellers—thoughtfully presented and privately sourced.",
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-brand-linen/10 bg-brand-charcoal">
      {/* Background media */}
      <div className="absolute inset-0 -z-10">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            src={videoSrc}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20">
        <p className="text-[11px] uppercase tracking-[0.24em] text-brand-linen/80">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-brand-linen md:text-5xl">
          {headline}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-linen/85">{subhead}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/listings" className="inline-flex items-center rounded-xl border border-brand-linen/70 bg-white/0 px-4 py-2 font-medium text-brand-linen hover:bg-white/10">
            Browse Listings
          </a>
          <a href="#private" className="inline-flex items-center rounded-xl border border-brand-linen/70 bg-white/0 px-4 py-2 font-medium text-brand-linen hover:bg-white/10">
            Private Listings
          </a>
        </div>
      </div>
    </section>
  );
}
