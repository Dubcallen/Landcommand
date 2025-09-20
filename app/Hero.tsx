// app/Hero.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  // 6s auto-rotation with crossfade (no blackout)
  const heroVideos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4", "/hero4.mp4"];
  const ROTATE_MS = 6000;
  const FADE_MS = 600;

  // playlist index
  const [currentIdx, setCurrentIdx] = useState(0);

  // two stacked layers for crossfade
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [srcA, setSrcA] = useState(heroVideos[0]);
  const [srcB, setSrcB] = useState(heroVideos[1 % heroVideos.length]);
  const [opacityA, setOpacityA] = useState(1);
  const [opacityB, setOpacityB] = useState(0);

  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const pendingFadeRef = useRef(false);
  const incomingLayerRef = useRef<0 | 1>(1);
  const nextIdxRef = useRef((currentIdx + 1) % heroVideos.length);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startRotate = () => {
    if (pendingFadeRef.current) return;
    const incoming = (activeLayer === 0 ? 1 : 0) as 0 | 1;
    const nextIdx = (currentIdx + 1) % heroVideos.length;

    pendingFadeRef.current = true;
    incomingLayerRef.current = incoming;
    nextIdxRef.current = nextIdx;

    if (incoming === 0) setSrcA(heroVideos[nextIdx]);
    else setSrcB(heroVideos[nextIdx]);

    const incomingRef = incoming === 0 ? videoARef.current : videoBRef.current;
    if (incomingRef) {
      incomingRef.load();
      const p = incomingRef.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  const handleCanPlay = (layer: 0 | 1) => {
    if (!pendingFadeRef.current || incomingLayerRef.current !== layer) return;

    if (layer === 0) {
      setOpacityA(1);
      setOpacityB(0);
    } else {
      setOpacityA(0);
      setOpacityB(1);
    }

    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      const outgoingRef = layer === 0 ? videoBRef.current : videoARef.current;
      outgoingRef?.pause?.();

      setActiveLayer(layer);
      setCurrentIdx(nextIdxRef.current);
      pendingFadeRef.current = false;
    }, FADE_MS);
  };

  useEffect(() => {
    intervalRef.current = setInterval(startRotate, ROTATE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, activeLayer]);

  const handleEnded = (layer: 0 | 1) => {
    if (layer === activeLayer) startRotate();
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
        loop={false}
        onCanPlay={() => handleCanPlay(0)}
        onEnded={() => handleEnded(0)}
        poster="/hero_poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: opacityA, transition: `opacity ${FADE_MS}ms ease` }}
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
        loop={false}
        onCanPlay={() => handleCanPlay(1)}
        onEnded={() => handleEnded(1)}
        poster="/hero_poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: opacityB, transition: `opacity ${FADE_MS}ms ease` }}
        aria-hidden="true"
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center stack (unchanged) */}
      <div className="relative z-10 flex flex-col items-center pt-28 text-center">
        {/* spacer to preserve rhythm */}
        <div className="h-[120px] md:h-[140px]" aria-hidden />

        <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
          LAND COMMAND
        </h1>

        {/* Tagline exactly as on your site */}
        <p className="mt-3 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
          CINEMATIC STORYTELLING. AI PRECISION. FASTER SALES.
        </p>

        {/* Categories */}
        <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
          LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
