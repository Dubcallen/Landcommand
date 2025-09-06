"use client";

export default function Hero() {
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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Fade into charcoal at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-charcoal" />
      </div>

      {/* Floating overlay content */}
      <div className="relative flex min-h-[80vh] items-center justify-center text-center">
        <div className="space-y-6">
          {/* Pill heading */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-6 py-2 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <p className="text-[12px] uppercase tracking-[0.24em] text-white/90">
              Land <span className="px-3 text-white/50">|</span> Farm{" "}
              <span className="px-3 text-white/50">|</span> Equestrian{" "}
              <span className="px-3 text-white/50">|</span> Estate
            </p>
          </div>

          {/* Tagline */}
          <h1 className="mx-auto max-w-3xl font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
            Middle Tennessee&apos;s Premier Property Specialists, Bringing
            Exceptional Land Opportunities to Discerning Investors and Legacy
            Builders
          </h1>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/properties"
              className="inline-flex items-center rounded-xl border border-white/70 bg-white/0 px-6 py-3 font-medium text-white hover:bg-white/10"
            >
              Exclusive Properties
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-xl border border-white/70 bg-white/0 px-6 py-3 font-medium text-white hover:bg-white/10"
            >
              Speak with a Specialist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
