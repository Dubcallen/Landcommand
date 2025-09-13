export default function HomePage() {
  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      {/* HERO (video + name + tagline + CTA row + category pill) */}
      <section className="relative isolate min-h-screen w-full overflow-hidden">
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
          {/* Removed big logo, spacing preserved */}
          <div className="mb-4" />
          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
            LAND COMMAND
          </h1>
          <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
            America&apos;s Premiere Land Specialists
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/properties/available"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-sans text-white hover:bg-white/10"
            >
              Exclusive Properties
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 text-sm font-sans text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              Speak with a Specialist
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
      </section>
    </main>
  );
}
