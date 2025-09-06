"use client";

type HeroProps = {
  /** Optional: background image in /public, e.g. /branding/hero.jpg */
  imageSrc?: string;
  /** Optional: background video in /public, e.g. /videos/hero.mp4 */
  videoSrc?: string;
};

export default function Hero({ imageSrc = "/branding/hero.jpg", videoSrc }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border bg-brand-charcoal">
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
        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-linen/80">
          Boutique Land Brokerage
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-display font-semibold leading-tight text-brand-linen md:text-5xl">
          Curated Land, Farm & Ranch Opportunities
        </h1>
        <p className="mt-4 max-w-2xl text-brand-linen/85">
          Exceptional acreage for discerning buyers and sellers—thoughtfully presented and privately sourced.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="/listings" className="btn btn--primary">Browse Listings</a>
          <a href="#private" className="btn btn--outline">Private Listings</a>
        </div>
      </div>
    </section>
  );
}
