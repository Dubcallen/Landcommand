"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * One-file homepage that mirrors Covey Rise with your branding.
 * - Centered logo header with dropdowns + hamburger right drawer
 * - Inertia/drag on scroll (blur/tint lag)
 * - Hero video overlay with floating pill + gold/ivory CTAs
 *
 * Assets required in /public:
 *   - /hero.mp4
 *   - /sight_only.png  (your logo; a light/white version looks best over video)
 */

/* ---------- Brand palette (hex) ---------- */
const HEX = {
  charcoal: "#1B1B1B",
  ivory: "#EFECE0",
  gold: "#CBB26A", // warm desaturated gold
  forest: "#2F4F4F",
};

/* ---------- Utility ---------- */
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/* ---------- NAV COMPONENT ---------- */

type MenuItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

// Titles mirror the Covey Rise layout
const LEFT: MenuItem[] = [
  {
    href: "/about",
    label: "About",
    dropdown: [
      { href: "/about/firm", label: "The Firm" },
      { href: "/about/process", label: "Process" },
      { href: "/about/press", label: "Press" },
    ],
  },
  {
    href: "/properties",
    label: "Properties",
    dropdown: [
      { href: "/properties/available", label: "Available Listings" },
      { href: "/properties/under-contract", label: "Under Contract" },
      { href: "/properties/sold", label: "Sold" },
    ],
  },
];

const RIGHT: MenuItem[] = [
  { href: "/search", label: "Search for Land" },
  { href: "/short-films", label: "Short Films" },
];

function Nav() {
  // --- pronounced inertia/drag spring ---
  const [progress, setProgress] = useState(0); // 0..1
  const [dragPx, setDragPx] = useState(0);

  const targetRef = useRef(0);
  const curRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Tune for visible lag
  const STIFFNESS = 0.02;
  const DAMPING = 0.10;
  const MAXY = 200;
  const DRAG_SCALE = 0.45;

  useEffect(() => {
    const onScroll = () => {
      targetRef.current = window.scrollY;
      if (rafRef.current == null) animate();
    };
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const target = targetRef.current;
      const x = curRef.current;
      const v = velRef.current;

      const force = STIFFNESS * (target - x) - DAMPING * v;
      const nextV = v + force;
      const nextX = x + nextV;

      curRef.current = nextX;
      velRef.current = nextV;

      const p = clamp(nextX / MAXY, 0, 1);
      setProgress(p);
      setDragPx((nextX - target) * DRAG_SCALE);

      if (Math.abs(nextX - target) < 0.1 && Math.abs(nextV) < 0.1) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Map to styles
  const blurPx = 12 * progress;
  const tintA = 0.4 * progress;
  const borderA = 0.12 * progress;
  const shadowA = 0.32 * progress;
  const logoScale = 1 - 0.06 * progress;

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Dropdown UX (slight delay feels luxe)
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});

  const openWithDelay = (k: string) => {
    clearTimeout(timers.current[k]);
    timers.current[k] = setTimeout(() => setOpenKey(k), 80);
  };
  const closeWithDelay = (k: string) => {
    clearTimeout(timers.current[k]);
    timers.current[k] = setTimeout(() => {
      if (openKey === k) setOpenKey(null);
    }, 120);
  };

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className="mx-auto w-full max-w-4xl px-4 transition-[padding,transform] duration-300"
        style={{
          pointerEvents: "auto",
          transform: `translateY(${dragPx}px)`,
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          backgroundColor: `rgba(0,0,0,${tintA})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadowA})`,
          borderBottom: `1px solid rgba(255,255,255,${borderA})`,
        }}
      >
        <div className="relative grid grid-cols-3 items-center py-6">
          {/* LEFT (About, Properties) with dropdowns */}
          <nav className="hidden md:flex items-center justify-end gap-6 pr-1">
            {LEFT.map((item) => {
              const key = item.label;
              const isOpen = openKey === key;
              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => openWithDelay(key)}
                  onMouseLeave={() => closeWithDelay(key)}
                >
                  <Link
                    href={item.href}
                    className="relative text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white
                               after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div
                      className={`absolute left-1/2 z-50 mt-3 -translate-x-1/2 rounded-xl border border-white/10 bg-black/70 backdrop-blur
                                  shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-200
                                  ${isOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}
                    >
                      <ul className="p-2 whitespace-nowrap">
                        {item.dropdown.map((d) => (
                          <li key={d.href}>
                            <Link
                              href={d.href}
                              className="block rounded-lg px-3 py-2 text-[12px] tracking-wide text-white/90 hover:bg-white/10 hover:text-white"
                            >
                              {d.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CENTER LOGO */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/" className="inline-flex">
              <img
                src="/sight_only.png"
                alt="LandCommand.ai"
                style={{ transform: `scale(${logoScale})` }}
                className="h-16 w-auto md:h-20 lg:h-24 will-change-transform transition-transform duration-300"
              />
            </Link>
          </div>

          {/* RIGHT (Search for Land, Short Films) + hamburger */}
          <div className="flex items-center justify-start gap-4 pl-1">
            <nav className="hidden md:flex items-center gap-6">
              {RIGHT.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white
                             after:absolute after:right-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* 3-bar hamburger → right drawer */}
            <button
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              onClick={() => setDrawerOpen(true)}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black/30 backdrop-blur text-white/90 hover:bg-white/10"
            >
              <span className="sr-only">Open menu</span>
              <span className="block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Right-side drawer */}
      <div
        className={`fixed inset-0 z-[60] ${drawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        />
        {/* Drawer panel */}
        <aside
          id="site-drawer"
          className={`absolute right-0 top-0 h-full w-[90vw] max-w-[420px] transform transition-transform duration-250
                      ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-full flex-col gap-4 border-l border-white/10 bg-black/70 p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sight_only.png" alt="LandCommand.ai" className="h-8 w-auto" />
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black/30 text-white/90 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-2 grid gap-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/60">Explore</p>
                <ul className="space-y-1">
                  <li><Link href="/about" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">About</Link></li>
                  <li><Link href="/properties" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Properties</Link></li>
                  <li><Link href="/search" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Search for Land</Link></li>
                  <li><Link href="/short-films" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Short Films</Link></li>
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/60">Status</p>
                <ul className="space-y-1">
                  <li><Link href="/properties/available" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">Available Listings</Link></li>
                  <li><Link href="/properties/under-contract" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">Under Contract</Link></li>
                  <li><Link href="/properties/sold" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">Sold</Link></li>
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[rgba(239,236,224,0.7)] px-6 py-3 font-medium text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.1)]"
                >
                  Speak with a Specialist
                </Link>
              </div>
            </div>

            <div className="mt-auto text-center text-xs text-white/60">© {new Date().getFullYear()} LandCommand.ai</div>
          </div>
        </aside>
      </div>
    </header>
  );
}

/* ---------- HERO COMPONENT ---------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          src="/hero.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Fade to charcoal at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[rgba(27,27,27,1)]" />
      </div>

      {/* Floating overlay content (centered) */}
      <div className="relative flex min-h-[80vh] items-center justify-center text-center">
        <div className="space-y-6">
          {/* Pill */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-6 py-2 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <p className="text-[12px] uppercase tracking-[0.24em] text-white/90">
              Land <span className="px-3 text-white/50">|</span> Farm{" "}
              <span className="px-3 text-white/50">|</span> Equestrian{" "}
              <span className="px-3 text-white/50">|</span> Estate
            </p>
          </div>

          {/* Tagline */}
          <h1 className="mx-auto max-w-4xl font-display text-[28px] md:text-[34px] leading-snug font-semibold text-white">
            Middle Tennessee&apos;s Premier Property Specialists, Bringing
            Exceptional Land Opportunities to Discerning Investors and Legacy
            Builders
          </h1>

          {/* CTAs */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/properties"
              className="inline-flex items-center rounded-md border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[rgba(27,27,27,1)] hover:bg-[rgba(203,178,106,1)]"
              style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset" }}
            >
              Exclusive Properties
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-md border border-[rgba(239,236,224,0.6)] bg-transparent px-6 py-3 font-medium text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.08)]"
            >
              Speak with a Specialist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SIMPLE SECTIONS (placeholders) ---------- */

function ShortFilms() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-4 text-xl font-semibold text-[rgba(239,236,224,1)]">Short Films</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-video w-full overflow-hidden rounded-2xl border border-[rgba(239,236,224,0.15)] bg-[#2A2A2A] grid place-items-center text-[rgba(239,236,224,0.6)]"
          >
            Video Placeholder
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedListings() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="mb-4 text-xl font-semibold text-[rgba(239,236,224,1)]">Featured Properties</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-[rgba(239,236,224,0.15)] bg-[#2A2A2A] text-[rgba(239,236,224,1)]"
          >
            <div className="aspect-[4/3] w-full bg-neutral-800 grid place-items-center text-neutral-500">
              Image Placeholder
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Property Title {i}</h3>
                <span className="rounded-full border border-[rgba(239,236,224,0.3)] px-2 py-1 text-xs">
                  Available
                </span>
              </div>
              <p className="mt-1 text-sm">1,000 acres • Somewhere, TN</p>
              <p className="mt-2 font-medium">$2,450,000</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PAGE ---------- */

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: HEX.charcoal, color: HEX.ivory }}>
      {/* Overlaid header */}
      <Nav />

      {/* Hero */}
      <Hero />

      {/* Below-hero sections (placeholders for now) */}
      <ShortFilms />
      <FeaturedListings />

      {/* Footer */}
      <footer className="mt-16 border-t border-[rgba(239,236,224,0.1)]">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-[rgba(239,236,224,0.7)]">
          © {new Date().getFullYear()} LandCommand.ai — All rights reserved.
        </div>
      </footer>
    </main>
  );
}
