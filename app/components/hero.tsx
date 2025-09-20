// app/components/Hero.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  // 6-second auto-rotation across 4 videos
  const heroVideos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4", "/hero4.mp4"];
  const ROTATE_MS = 6000;

  const [idx, setIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = () => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setIsFading(true);
    fadeTimer.current = setTimeout(() => {
      setIdx((i) => (i + 1) % heroVideos.length);
      setIsFading(false);
    }, 280);
  };

  useEffect(() => {
    rotateTimer.current = setInterval(goNext, ROTATE_MS);
    return () => {
      if (rotateTimer.current) clearInterval(rotateTimer.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [idx]);

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Video layer */}
      <video
        ref={videoRef}
        key={idx}
        src={heroVideos[idx]}
        autoPlay
        muted
        playsInline
        loop={false}
        poster="/hero_poster.jpg"
        onEnded={goNext}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Center stack (unchanged) */}
      <div className="relative z-10 flex flex-col items-center pt-28 text-center">
        {/* spacer preserving the original rhythm */}
        <div className="h-[120px] md:h-[140px]" aria-hidden />

        <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
          LAND COMMAND
        </h1>

        {/* Tagline locked to your current site text */}
        <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
          CINEMATIC STORYTELLING. AI PRECISION. FASTER SALES.
        </p>

        {/* Categories (unchanged) */}
        <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
        </div>

        {/* CTAs (unchanged) */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/properties/available"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-sans text-white hover:bg-white/10"
            aria-label="Browse available properties"
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className="rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 text-sm font-sans text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            aria-label="List your property with Land Command"
          >
            Sell
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
    </section>
  );
}
