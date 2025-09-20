// app/page.tsx
"use client";

export const metadata = {
  title: "Land Command — America’s Premier Land Specialists",
  description:
    "Exclusive land, ranch, investment, and estate opportunities. List your property, commission short films and stories, and explore financing.",
};

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const year = new Date().getFullYear();

  // ===== HERO: 6s auto-rotation (only change) =====
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
  // ===== END HERO ROTATOR =====

  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      {/* HERO */}
      <section className="relative isolate min-h-screen w-full overflow-hidden">
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

        {/* Center stack with same spacing */}
        <div className="relative z-10 flex flex-col items-center pt-28 text-center">
          <div className="h-[120px] md:h-[140px]" aria-hidden />

          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
            LAND COMMAND
          </h1>

          <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
            CINEMATIC STORYTELLING. AI PRECISION. FASTER SALES.
          </p>

          {/* Categories (unchanged) */}
          <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            LAND &nbsp; | &nbsp; RANCH &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
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

      {/* Tiles Section (unchanged) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Explore Land Command</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/list.jpg",
              title: "List With Us",
              meta: "Flat Fee • National Exposure",
              link: "/sell",
            },
            {
              src: "/films.jpg",
              title: "Short Films",
              meta: "Cinematic Reels • 4K Aerial",
              link: "/short-films",
            },
            {
              src: "/resources.jpg",
              title: "Resources",
              meta: "Expertise • Insights • Guidance",
              link: "/resources",
            },
          ].map((card, i) => (
            <Link
              key={i}
              href={card.link}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-colors hover:bg-black/55"
              aria-label={card.title}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={i === 0}
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Exclusive
                </div>
                <h3 className="mt-1 text-xl font-serif font-semibold">{card.title}</h3>
                <p className="mt-1 text-white/75">{card.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.6)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              List Your Property
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/25 px-6 py-3 text-white hover:bg-white/10"
            >
              Speak with a Specialist
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">
            © {year} Land Command. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
