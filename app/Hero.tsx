// app/Hero.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  // Videos & timing
  const heroVideos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4", "/hero4.mp4"];
  const ROTATE_MS = 6000;
  const FADE_MS = 600;

  // Which video index is "current" in the playlist
  const [currentIdx, setCurrentIdx] = useState(0);

  // We render TWO video layers and crossfade between them.
  // activeLayer = which layer is currently visible (0 or 1)
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);

  // Sources for each layer
  const [srcA, setSrcA] = useState(heroVideos[0]);
  const [srcB, setSrcB] = useState(heroVideos[1 % heroVideos.length]);

  // Opacity for each layer (we'll transition these)
  const [opacityA, setOpacityA] = useState(1);
  const [opacityB, setOpacityB] = useState(0);

  // Refs
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const pendingFadeRef = useRef(false);
  const incomingLayerRef = useRef<0 | 1>(1);
  const nextIdxRef = useRef((currentIdx + 1) % heroVideos.length);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prepare & start crossfade to the next clip
  const startRotate = () => {
    if (pendingFadeRef.current) return; // avoid overlap
    const incoming = (activeLayer === 0 ? 1 : 0) as 0 | 1;
    const nextIdx = (currentIdx + 1) % heroVideos.length;

    pendingFadeRef.current = true;
    incomingLayerRef.current = incoming;
    nextIdxRef.current = nextIdx;

    // Set the incoming layer's src
    if (incoming === 0) setSrcA(heroVideos[nextIdx]);
    else setSrcB(heroVideos[nextIdx]);

    // We'll begin the fade when the incoming video can play
    const incomingRef = incoming === 0 ? videoARef.current : videoBRef.current;
    if (incomingRef) {
      // kickload & try play
      incomingRef.load();
      const p = incomingRef.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  // When either video is ready, if it's the incoming one and a fade is pending, do the crossfade.
  const handleCanPlay = (layer: 0 | 1) => {
    if (!pendingFadeRef.current || incomingLayerRef.current !== layer) return;

    // Crossfade: incoming -> 1, outgoing -> 0
    if (layer === 0) {
      setOpacityA(1);
      setOpacityB(0);
    } else {
      setOpacityA(0);
      setOpacityB(1);
    }

    // After fade completes, finalize state
    if (fadeTimeoutRef
