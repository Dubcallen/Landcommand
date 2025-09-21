// app/Hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  // ⬇️ bump this when you swap hero.mp4 to force fresh fetch (optional)
  const VER = "?v=hero-2025-09-20-3";

  // Playlist & timing
  const videos = ["/hero.mp4" + VER, "/hero2.mp4", "/hero3.mp4", "/hero4.mp4"];
  const ROTATE_MS = 6000; // rotate every 6s
  const FADE_MS = 600;    // crossfade duration in ms

  // Two stacked layers for crossfade
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [srcA, setSrcA] = useState<string>(videos[0]);
  const [srcB, setSrcB] = useState<string>(videos[1 % videos.length]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Ensure autoplay on all browsers (muted/inline must be set before play)
  const primeVideo = (el: HTMLVideoElement | null) => {
    if (!el) return;
    try {
      el.muted = true;
      // @ts-ignore - older Safari
      (el as any).playsInline = true;
      el.setAttribute("playsinline", "");
      const p = el.play();
      if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
    } catch {}
  };

  useEffect(() => {
    primeVideo(videoARef.current);
    primeVideo(videoBRef.current);
  }, [srcA, srcB, activeLayer]);

  // Crossfade helper
  const crossfadeTo = (nextIdx: number) => {
    const incoming = activeLayer === 0 ? 1 : 0;

    if (incoming === 0) {
      setSrcA(videos[nextIdx]);
      // ensure src applies before toggling opacity
      requestAnimationFrame(() => setActiveLayer(0));
    } else {
      setSrcB(videos[nextIdx]);
      requestAnimationFrame(() => setActiveLayer(1));
    }

    // Pause the non-visible layer after fade completes
    setTimeout(() => {
      const outgoingRef = incoming === 0 ? videoBRef.current : videoARef.current;
      outgoingRef?.pause?.();
    }, FADE_MS + 20);

    setCurrentIdx(nextIdx);
  };

  // Interval rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const nextIdx = (currentIdx + 1) % videos.length;
      crossfadeTo(nextIdx);
    }, ROTATE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, activeLayer]);

  // Also rotate if the currently visible video ends early
  const handleEnded = (layer: 0 | 1) => {
    if (layer === activeLayer) {
      const nextIdx = (currentIdx + 1) % videos.length;
      crossfadeTo(nextIdx);
    }
  };

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      {/* Layer A */}
      <video
        ref={videoARef}
        key={`A-${srcA}`}
        src={srcA}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop={false}
        onEnded={() => handleEnded(0)}
        poster="/hero_poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: activeLayer === 0 ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        aria-hidden="true"
      />

      {/* Layer B */}
      <video
        ref={videoBRef}
        key={`B-${srcB}`}
        src={srcB}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop={false}
        onEnded={() => handleEnded(1)}
        poster="/hero_poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: activeLayer === 1 ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        aria-hidden="true"
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center stack */}
      <div className="relative z-10 flex flex-col items-center pt-28 text-center">
        {/* spacer to preserve rhythm */}
        <div className="h-[120px] md:h-[140px]" aria-hidden />

        <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
          LAND COMMAND
        </h1>

        {/* Tagline — updated */}
        <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
          CINEMATIC STORYTELLING. AI PRECISION. TAKE COMMAND.
        </p>

        {/* Categories — stays RANCH */}
        <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          LAND &nbsp; | &nbsp; RANCH &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
        </div>

        {/* CTAs */}
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
