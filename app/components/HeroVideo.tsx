"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const PHRASES = [
  "Unparalleled experience.",
  "Unconventional spirit.",
  "Unrelenting loyalty.",
];

type Props = {
  height?: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
  showCta?: boolean;
  rotationMs?: number;
};

export default function HeroVideo({
  height = "72vh",
  title = "Land Command",
  subtitle = "Find the perfect land with natural-language search, not filters.",
  overlay = true,
  showCta = true,
  rotationMs = 2400,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [idx, setIdx] = useState(0);

  // rotate phrases
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), rotationMs);
    return () => clearInterval(id);
  }, [rotationMs]);

  // autoplay + visibility aware
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tryPlay = () => v.play().catch(() => {});
    const onCanPlay = () => { if (!prefersReduced) tryPlay(); };
    v.addEventListener("canplay", onCanPlay, { once: true });

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!v) return;
        if (e.isIntersecting) { if (!prefersReduced) tryPlay(); } else { v.pause(); }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => { v.removeEventListener("canplay", onCanPlay); io.disconnect(); };
  }, []);

  // Data Saver fallback
  const saveData = useMemo(() => {
    return Boolean((navigator as any)?.connection?.saveData);
  }, []);

  return (
    <section className="relative w-full">
      {!saveData ? (
        <video
          ref={videoRef}
          className="block w-full object-cover"
          style={{ height }}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          poster="/videos/hero-poster.jpg"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/videos/hero-poster.jpg"
          alt=""
          className="block w-full object-cover"
          style={{ height }}
        />
      )}

      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/65" />
      )}

      {/* Center content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="px-6 text-center max-w-4xl">
          {/* Rotating phrase */}
          <div className="h-8 md:h-9 overflow-hidden mb-2 text-neutral-200">
            <div key={idx} className="inline-block animate-[fadeIn_300ms_ease] text-sm md:text-base">
              {PHRASES[idx]}
            </div>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-neutral-200 md:text-lg">{subtitle}</p>
          )}

          {showCta && (
            <div className="mt-6 flex gap-3 justify-center">
              <a
                href="/buy"
                className="rounded-xl bg-white text-black px-5 py-2 font-medium hover:opacity-90 active:opacity-80"
              >
                Ask Land AI
              </a>
              <a
                href="/listings"
                className="rounded-xl border border-white/70 px-5 py-2 hover:bg-white/10"
              >
                Browse Listings
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mute toggle */}
      <div className="absolute right-4 bottom-4 z-20">
        <button
          onClick={() => {
            const v = videoRef.current;
            if (v) v.muted = !v.muted;
            setMuted((m) => !m);
          }}
          className="rounded-full bg-black/70 border border-white/30 px-3 py-1 text-sm text-white hover:bg-black/85"
        >
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>

      {/* Thin glow divider */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-40" />
    </section>
  );
}
