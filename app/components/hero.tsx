// app/components/hero.tsx
"use client";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background video (full-bleed) */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src="/hero.mp4"
        />
        {/* darken for legibility */}
        <div className="absolute inset-0 bg-black/40" />
        {/* fade into charcoal at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
      </div>

      {/* Overlay content (centered) */}
      <div className="relative flex min-h-[82vh] items-center justify-center text-center px-6">
        <div className="space-y-6">
          {/* Pill */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-6 py-2 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <p className="text-[12px] uppercase tracking-[0.24em] text-white/90">
              Land <span className="px-3 text-white/50">|</span> Farm{" "}
              <span className="px-3 text-white/50">|</span> Equestrian{" "}
              <span className="px-3 text-white/50">|</span> Estate
            </p>
          </div>

          {/* Tagline */}
          <h1 className="mx-auto max-w-4xl font-serif text-[28px] md:text-[34px] leading-snug font-semibold text-white">
            America's Premier Property Specialists
          </h1>

          {/* CTAs (gold primary, ivory outline) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/properties"
              className="inline-flex items-center rounded-md border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
              style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset" }}
            >
              Exclusive Properties
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-md border border-[rgba(239,236,224,0.6)] bg-transparent px-6 py-3 font-medium text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.08)]"
            >
              Speak with a Specialist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
