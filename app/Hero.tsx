// app/Hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  // Playlist & timing — ONLY hero2/3/4
  const V = "?v=lc-1"; // cache-buster (optional)
  const videos = ["/hero2.mp4" + V, "/hero3.mp4" + V, "/hero4.mp4" + V];
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

  const primeVideo = (el: HTMLVideoElement | null) => {
    if (!el) return;
    try {
      el.muted = true;
      // @ts-ignore
      el.playsInline = true;
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
      requestAnimationFrame(() => setActiveLayer(0));
    } else {
      setSrcB(videos[nextIdx]);
      requestAnimationFrame(() => setActiveLayer(1));
    }

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
        <div className="h-[120px] md:h-[140px]" aria-hidden />

        <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
          LAND COMMAND
        </h1>

        <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
          Cinematic Storytelling. AI Precision. Take Command.
        </p>

        {/* Categories — RANCH */}
        <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          LAND &nbsp; | &nbsp; RANCH &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
        </div>

        {/* CTAs*
