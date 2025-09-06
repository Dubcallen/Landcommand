"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Premium header with visible inertia:
 * - Centered large logo; 2 links left (with dropdowns), 2 links right
 * - Top-right hamburger → fullscreen overlay
 * - SPRING physics for delayed blur/tint + subtle vertical "drag"
 *   (header lags behind scroll a few pixels, then eases into place)
 *
 * Assets required:
 *   /public/sight_only.png  (light/white logo)
 */

type MenuItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

const LEFT_LINKS: MenuItem[] = [
  {
    href: "/properties",
    label: "Properties",
    dropdown: [
      { href: "/properties/available", label: "Available Listings" },
      { href: "/properties/under-contract", label: "Under Contract" },
      { href: "/properties/sold", label: "Sold" },
    ],
  },
  {
    href: "/about",
    label: "About",
    dropdown: [
      { href: "/about/firm", label: "The Firm" },
      { href: "/about/process", label: "Process" },
      { href: "/about/press", label: "Press" },
    ],
  },
];

const RIGHT_LINKS: MenuItem[] = [
  { href: "/short-films", label: "Short Films" },
  { href: "/contact", label: "Contact" },
];

// clamp utility
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function Nav() {
  // ------- SPRING STATE (for visible inertia) -------
  // target = real scrollY; cur = smoothed scroll; vel = spring velocity
  const [progress, setProgress] = useState(0);      // normalized 0..1 for styles
  const [dragPx, setDragPx] = useState(0);          // small Y offset for the "drag"

  const targetRef = useRef(0);
  const curRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // tune these to taste (lower stiffness / damping = more floaty)
  const STIFFNESS = 0.035; // spring k
  const DAMPING   = 0.16;  // damping c
  const MAXY      = 120;   // px range to map → progress (0..1)
  const DRAG_SCALE = 0.25; // how many px of visual lag from (cur - target)

  useEffect(() => {
    const onScroll = () => {
      targetRef.current = window.scrollY;
      if (rafRef.current == null) animate();
    };

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      // spring integration
      const target = targetRef.current;
      const x = curRef.current;
      const v = velRef.current;

      // F = k(target - x) - c*v
      const force = STIFFNESS * (target - x) - DAMPING * v;
      const nextV = v + force;
      const nextX = x + nextV;

      curRef.current = nextX;
      velRef.current = nextV;

      // normalized style progress (0..1 by MAXY)
      const p = clamp(nextX / MAXY, 0, 1);
      setProgress(p);

      // visual drag (a few pixels of vertical lag)
      const drag = (nextX - target) * DRAG_SCALE; // negative when catching up
      setDragPx(drag);

      // stop loop when we're extremely close
      if (Math.abs(nextX - target) < 0.1 && Math.abs(nextV) < 0.1) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ------- MENU / DROPDOWNS -------
  const [menuOpen, setMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});

  // ESC closes overlay
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openWithDelay = (key: string) => {
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => setOpenKey(key), 80);
  };
  const closeWithDelay = (key: string) => {
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => {
      if (openKey === key) setOpenKey(null);
    }, 120);
  };

  // ------- STYLE MAPPING FROM progress -------
  const blurPx   = 10 * progress;         // 0 → 10px blur
  const tintA    = 0.35 * progress;       // 0 → 0.35 bg alpha
  const borderA  = 0.10 * progress;       // 0 → 0.10 border alpha
  const shadowA  = 0.25 * progress;       // 0 → 0.25 shadow alpha
  const logoScale = 1 - 0.05 * progress;  // 1 → 0.95

  // compact container so links sit close to the centered logo
  const containerClass = "mx-auto w-full max-w-5xl px-4";

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className={`${containerClass} transition-[padding,transform] duration-300`}
        style={{
          pointerEvents: "auto",
          transform: `translateY(${dragPx}px)`,                  // <-- the visible "drag"
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          backgroundColor: `rgba(0,0,0,${tintA})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadowA})`,
          borderBottom: `1px solid rgba(255,255,255,${borderA})`,
        }}
      >
        {/* Grid: left (dropdowns) | centered logo | right + burger */}
        <div className="relative grid grid-cols-3 items-center py-6">
          {/* LEFT MENU (dropdowns) */}
          <nav className="hidden md:flex items-center justify-end gap-6 pr-2">
            {LEFT_LINKS.map((item) => {
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

          {/* CENTER LOGO (scales slightly with progress) */}
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

          {/* RIGHT LINKS + HAMBURGER */}
          <div className="flex items-center justify-start gap-4 pl-2">
            <nav className="hidden md:flex items-center gap-6">
              {RIGHT_LINKS.map((l) => (
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

            {/* 3-bar hamburger (always visible) */}
            <button
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
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

      {/* FULLSCREEN OVERLAY MENU */}
      <div
        id="site-menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[60] transition-opacity duration-200 ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* Backdrop */}
        <div onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur" />

        {/* Panel */}
        <div className="relative mx-auto mt-16 w-full max-w-3xl rounded-2xl border border-white/10 bg-black/70 p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black/30 text-white/90 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>

          <div className="space-y-6">
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sight_only.png" alt="LandCommand.ai" className="h-12 w-auto" />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Explore</p>
                <ul className="space-y-1">
                  <li><Link href="/properties" className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">Properties</Link></li>
                  <li><Link href="/about" className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">About</Link></li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">More</p>
                <ul className="space-y-1">
                  <li><Link href="/short-films" className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">Short Films</Link></li>
                  <li><Link href="/contact" className="block rounded-lg px-3 py-2 text-white/90 hover:bg-white/10">Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-3">
              <Link href="/properties/available" className="block rounded-lg px-3 py-2 text-white/80 hover:bg-white/10">Available Listings</Link>
              <Link href="/properties/under-contract" className="block rounded-lg px-3 py-2 text-white/80 hover:bg-white/10">Under Contract</Link>
              <Link href="/properties/sold" className="block rounded-lg px-3 py-2 text-white/80 hover:bg-white/10">Sold</Link>
            </div>

            <div className="pt-2">
              <Link href="/contact" className="inline-flex items-center rounded-xl border border-white/70 px-6 py-3 font-medium text-white hover:bg-white/10">
                Speak with a Specialist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
