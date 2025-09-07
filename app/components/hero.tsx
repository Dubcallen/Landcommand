"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

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

      {/* Logo + Business Name + Tagline */}
      <div className="relative z-10 flex flex-col items-center pt-20 text-center">
        <Image
          src="/sight_only.png"
          alt="Land Command"
          width={140}
          height={140}
          className="mb-3"
        />
        <h1
          className={`${playfair.className} text-5xl md:text-6xl tracking-wide text-[#EFECE0] uppercase`}
        >
          Land Command
        </h1>
        <p className="mt-3 text-lg md:text-xl font-medium text-white/90 uppercase tracking-wide">
          America&apos;s Premiere Land Specialists
        </p>
      </div>

      {/* Category pill */}
      <div className="relative z-10 mx-auto mt-10 max-w-3xl px-6 text-center">
        <div className="inline-flex rounded-full border border-white/20 bg-black/40 px-6 py-2 text-sm tracking-[0.25em] text-white/90 backdrop-blur">
          LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; EQUESTRIAN &nbsp; | &nbsp;
          ESTATE
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/properties"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Exclusive Land
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
