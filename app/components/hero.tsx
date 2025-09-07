"use client";

import Image from "next/image";

export default function Hero() {
  return (
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

      {/* Logo + Business Name */}
      <div className="relative z-10 flex flex-col items-center pt-36">
        <Image
          src="/sight_only.png"
          alt="Land Command"
          width={130}
          height={130}
          className="mb-3"
        />
        <h1 className="text-4xl md:text-5xl font-display tracking-wide text-[#EFECE0]">
          Land Command
        </h1>
        <p className="mt-2 text-base md:text-lg font-medium text-white/90 tracking-wide uppercase">
          America&apos;s Premiere Property Specialists
        </p>
      </div>

      {/* Hero text */}
      <div className="relative z-10 mx-auto mt-12 max-w-3xl px-6 text-center">
        <div className="mb-6 inline-flex rounded-full border border-white/20 bg-black/40 px-6 py-2 text-sm tracking-[0.25em] text-white/90 backdrop-blur">
          LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; EQUESTRIAN &nbsp; | &nbsp;
          ESTATE
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold leading-snug text-white">
          Bringing Exceptional Land Opportunities to Discerning Investors and
          Legacy Builders
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/properties"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Exclusive Properties
          </a>
          <a
            href="/contact"
            className="rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 text-sm font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
          >
            Speak with a Specialist
          </a>
        </div>
      </div>

      {/* Fade bottom overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
    </section>
  );
}
