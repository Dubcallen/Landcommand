"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Premium header with pronounced inertia + side drawer menu:
 * - Centered large logo; 2 links left (dropdowns), 2 links right
 * - Strong spring lag for blur/tint + vertical drag of the header bar
 * - Hamburger opens a right-side drawer (not full-screen)
 *
 * Assets:
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
  // ------- SPRING (make lag obvious) -------
  const [progress, setProgress] = useState(0); // 0..1
  const [dragPx, setDragPx] = useState(0);     // visual vertical lag

  const targetRef = useRef(0);
  const curRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Tuned for visible delay:
  // Lower stiffness & damping = more floaty; bigger MAXY = slower ramp
  const STIFFNESS = 0.02;  // was 0.035
  const DAMPING   = 0.10;  // was 0.16
  const MAXY      = 200;   // was 120 — increases the range to reach full tint
  const DRAG_SCALE = 0.45; // was 0.25 — more visible bar lag

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

      // F = k(target - x) - c*v
      const force = STIFFNESS * (target - x) - DAMPING * v;
      const nextV = v + force;
      const nextX = x + nextV;

      curRef.current = nextX;
      velRef.current = nextV;

      const p = clamp(nextX / MAXY, 0, 1);
      setProgress(p);

      // visible drag of the bar (few px)
      const drag = (nextX - target) * DRAG_SCALE;
      setDragPx(drag);

      // stop when settled
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

  // ------- MENU / DROPDOWNS -------
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});

  // ESC closes drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

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

  // ------- STYLE MAPPING -------
  const blurPx    = 12 * progress;        // 0 → 12px blur
  const tintA     = 0.40 * progress;      // 0 → 0.40 bg alpha
  const borderA   = 0.12 * progress;      // 0 → 0.12 border alpha
  const shadowA   = 0.32 * progress;      // 0 → 0.32 shadow alpha
  const logoScale = 1 - 0.06 * progress;  // 1 → 0.94

  // Narrow container so links stay close to the centered logo
  const containerClass = "mx-auto w-full max-w-4xl px-4"; // tighter than 5xl

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      {/* Top bar with visible lag */}
      <div
        className={`${containerClass} transition-[padding,transform] duration-300`}
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
        {/* Grid: left (dropdowns) | logo | right (links + burger) */}
        <div className="relative grid grid-cols-3 items-center py-6">
          {/* LEFT with dropdowns */}
          <nav className="hidden md:flex items-center justify-end gap-5 pr-1">
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

          {/* CENTER: large logo */}
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

          {/* RIGHT: links + hamburger */}
          <div className="flex items-center justify-start gap-4 pl-1">
            <nav className="hidden md:flex items-center gap-5">
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

            {/* Hamburger → opens right drawer */}
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

      {/* RIGHT-SIDE DRAWER (not full-screen) */}
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
            {/* Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sight_only.png" alt="LandCommand.ai" className="h-8 w-auto" />
              </div>
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

            {/* Groups similar to header */}
            <div className="mt-2 grid gap-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/60">Explore</p>
                <ul className="space-y-1">
                  <li><Link href="/properties" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Properties</Link></li>
                  <li><Link href="/about" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">About</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/60">More</p>
                <ul className="space-y-1">
                  <li><Link href="/short-films" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Short Films</Link></li>
                  <li><Link href="/contact" onClick={() => setDrawerOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Contact</Link></li>
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/60">Status</p>
                <ul className="grid grid-cols-1 gap-1 md:grid-cols-1">
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

            <div className="mt-auto text-center text-xs text-white/60">© {new Date().getFullYear()} LandCommand.ai</div>
          </div>
        </aside>
      </div>
    </header>
  );
}
