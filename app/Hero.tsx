// app/Hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  // Playlist & timing
  const videos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4", "/hero4.mp4"];
  const ROTATE_MS = 6000; // rotate every 6s
  const FADE_MS = 500;    // crossfade duration

  // Two stacked layers for crossfade
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [srcA, setSrcA] = useState<string>(videos[0]);
  const [srcB, setSrcB] = useState<string>(videos[1 % videos.length]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Ensure videos try to play whenever sources or layer change (mobile autoplay quirks)
  useEffect(() => {
    const tryPlay = (el: HTMLVideoElement | null) => {
      if (!el) return;
      const p = el.play();
      if (p && typeof (p as any).catch === "function") (p as any).catch(() => {});
    };
    tryPlay(videoARef.current);
    tryPlay(videoBRef.current);
  }, [srcA, srcB, activeLayer]);

  // Crossfade helper: set incoming src, then toggle active layer
  const crossfadeTo = (nextIdx: number) => {
    const incoming = activeLayer === 0 ? 1 : 0;

    if (incoming === 0) {
      setSrcA(videos[nextIdx]);
      // Let React apply new src before toggling opacity class
      requestAnimationFrame(() => setActiveLayer(0));
    } else {
      setSrcB(videos[nextIdx]);
      requestAnimationFrame(() => setActiveLayer(1));
    }

    setCurre
