"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * LandCommand Nav (clean baseline)
 * - Centered large logo
 * - LEFT: About (dropdown), Properties (dropdown)
 * - RIGHT: Search for Land, Short Films, Contact + hamburger (drawer)
 * - Inertia on scroll: delayed blur/tint + slight vertical drag
 * - No duplicates, no wrapping
 *
 * Requires /public/sight_only.png
 */

type MenuItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

const LEFT_MENU: MenuItem[] = [
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

const RIGHT_MENU: MenuItem[] = [
  { href: "/search", label: "Search for Land" },
  { href: "/short-films", label: "Short Films" },
  { href: "/contact", label: "Contact" },
];

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function Nav() {
  // Inertia / Drag (spring)
  const [progress, setProgress] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const targetRef = useRef(0);
  const curRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const STIFFNESS = 0.02;
  const DAMPING = 0.1;
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

  const blurPx = 12 * progress;
  const tintA = 0.4 * progress;
  const borderA = 0.12 * progress;
  const shadowA = 0.32 * progress;
  const logoScale = 1 - 0.06 * progress;

  // Dropdown state
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

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className="mx-auto w-full max-w-6xl px-6 transition-[padding,transform] duration-300"
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
        {/* 3 columns: left menu | centered logo | right menu + burger */}
        <div className="relative grid grid-cols-3 items-center py-6">
          {/* LEFT */}
          <nav className="hidden md:flex items-center justify-end gap-10">
            {LEFT_MENU.map((item) => {
              const isOpen = openKey === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openWithDelay(item.label)}
                  onMouseLeave={() => closeWithDelay(item.label)}
                >
                  <Link
                    href={item.href}
                    className="relative text-[12px] uppercase tracking-[0.16em] whitespace-nowrap text-white/90 hover:text-white
                               after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div
                      className={`absolute left-1/2 z-50 mt-3 -translate-x-1/2 rounded-xl border border-white/10 bg-black/70 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                                  transition-all duration-200 ${isOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}
                    >
                      <ul className="p-2 whitespace-nowrap">
                        {item.dropdown.map((d) => (
                          <li key={d.href}>
                            <Link
                              href={d.href}
                              className="block rounded-lg px-3 py-2 text-[12px] text-white/90 hover:bg-white/10 hover:text-white"
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

          {/* RIGHT */}
          <div className="flex items-center justify-start gap-10">
            <nav className="hidden md:flex items-center gap-10">
              {RIGHT_MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-[12px] uppercase tracking-[0.16em] whitespace-nowrap text-white/90 hover:text-white
                             after:absolute after:right-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger */}
            <button
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              onClick={() => setDrawerOpen(true)}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black/30 backdrop-blur text-white/90 hover:bg-white/10"
            >
              <span className="sr-only">Open menu</span>
              <span className="block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT-SIDE DRAWER */}
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
        {/* Panel */}
        <aside
          id="site-drawer"
          className={`absolute right-0 top-0 h-full w-[90vw] max-w-[420px] transform transition-transform duration-200 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
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
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/60">Navigate</p>
                <ul className="space-y-1">
                  <li><Link href="/about" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">About</Link></li>
                  <li><Link href="/properties" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Properties</Link></li>
                  <li><Link href="/search" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Search for Land</Link></li>
                  <li><Link href="/short-films" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Short Films</Link></li>
                  <li><Link href="/contact" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Contact</Link></li>
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/60">Status</p>
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
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/70 px-6 py-3 font-medium text-white hover:bg-white/10"
                >
                  Speak with a Specialist
                </Link>
              </div>
            </div>

            <div className="mt-auto text-center text-xs text-white/60">
              © {new Date().getFullYear()} LandCommand.ai
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
