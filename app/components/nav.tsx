"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * LandCommand – Covey Rise style header (mirrored layout)
 * - Centered logo
 * - Left: ABOUT LAND COMMAND (dropdown) / PROPERTIES (dropdown)
 * - Right: SEARCH FOR LAND / SHORT FILMS / CONTACT / Hamburger drawer
 * - Subtle glass/blur/tint + delayed scroll inertia + hover dropdowns
 *
 * Requires: /public/sight_only.png  (logo)
 */

type MenuItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

const LEFT_MENU: MenuItem[] = [
  {
    href: "/about",
    label: "ABOUT LAND COMMAND",
    dropdown: [
      { href: "/about/firm", label: "Our Firm" },
      { href: "/about/process", label: "Our Process" },
      { href: "/about/press", label: "Press" },
      { href: "/about/stories", label: "Stories" },
    ],
  },
  {
    href: "/properties",
    label: "PROPERTIES",
    dropdown: [
      { href: "/properties/available", label: "Available" },
      { href: "/properties/under-contract", label: "Under Contract" },
      { href: "/properties/sold", label: "Sold" },
      { href: "/sell", label: "List Your Property" },
    ],
  },
];

const RIGHT_MENU: MenuItem[] = [
  { href: "/search", label: "SEARCH FOR LAND" },
  { href: "/short-films", label: "SHORT FILMS" },
  { href: "/contact", label: "CONTACT" },
];

// helpers
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function Nav() {
  // delayed scroll / inertia
  const [progress, setProgress] = useState(0);
  const [dragY, setDragY] = useState(0);
  const target = useRef(0);
  const cur = useRef(0);
  const vel = useRef(0);
  const raf = useRef<number | null>(null);

  const STIFF = 0.02;
  const DAMP = 0.1;
  const MAX = 200;
  const DRAG = 0.45;

  useEffect(() => {
    const onScroll = () => {
      target.current = window.scrollY;
      if (raf.current == null) animate();
    };
    const animate = () => {
      raf.current = requestAnimationFrame(animate);
      const x = cur.current;
      const v = vel.current;
      const t = target.current;
      const force = STIFF * (t - x) - DAMP * v;
      const nv = v + force;
      const nx = x + nv;
      cur.current = nx;
      vel.current = nv;
      setProgress(clamp(nx / MAX, 0, 1));
      setDragY((nx - t) * DRAG);
      if (Math.abs(nx - t) < 0.1 && Math.abs(nv) < 0.1) {
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const blur = 12 * progress;
  const tint = 0.4 * progress;
  const border = 0.12 * progress;
  const shadow = 0.32 * progress;
  const logoScale = 1 - 0.06 * progress;

  // dropdowns
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});
  const openDelayed = (k: string) => {
    clearTimeout(timers.current[k]);
    timers.current[k] = setTimeout(() => setOpenKey(k), 90);
  };
  const closeDelayed = (k: string) => {
    clearTimeout(timers.current[k]);
    timers.current[k] = setTimeout(() => {
      if (openKey === k) setOpenKey(null);
    }, 120);
  };

  // drawer
  const [drawer, setDrawer] = useState(false);

  // caret
  const Caret = ({ open }: { open?: boolean }) => (
    <span
      className={`ml-2 inline-block transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      ▾
    </span>
  );

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className="mx-auto w-full max-w-[1200px] px-8 transition-[transform,background-color,backdrop-filter] duration-300"
        style={{
          pointerEvents: "auto",
          transform: `translateY(${dragY}px)`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(0,0,0,${tint})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadow})`,
          borderBottom: `1px solid rgba(255,255,255,${border})`,
        }}
      >
        {/* three columns: left group | centered logo | right group */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-6">
          {/* LEFT GROUP */}
          <nav className="hidden md:flex items-center justify-start gap-12">
            {LEFT_MENU.map((m) => {
              const isOpen = openKey === m.label;
              const hasDrop = !!m.dropdown;
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => hasDrop && openDelayed(m.label)}
                  onMouseLeave={() => hasDrop && closeDelayed(m.label)}
                >
                  <Link
                    href={m.href}
                    className="relative text-[13px] uppercase tracking-[0.16em] whitespace-nowrap text-white/90 hover:text-white"
                  >
                    {m.label}
                    {hasDrop && <Caret open={isOpen} />}
                    <span className="absolute left-0 -bottom-1 block h-px w-0 bg-white/80 transition-all duration-200 group-hover:w-full" />
                  </Link>

                  {hasDrop && (
                    <div
                      className={`absolute left-1/2 z-50 mt-3 -translate-x-1/2 rounded-xl border border-white/10 bg-black/70 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                      transition-all duration-200 ${
                        isOpen
                          ? "pointer-events-auto opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 -translate-y-1"
                      }`}
                    >
                      <ul className="p-2 whitespace-nowrap">
                        {m.dropdown!.map((d) => (
                          <li key={d.href}>
                            <Link
                              href={d.href}
                              className="block rounded-lg px-4 py-2 text-[12px] text-white/90 hover:bg-white/10 hover:text-white"
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

          {/* CENTERED LOGO */}
          <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/" className="inline-flex">
              <img
                src="/sight_only.png"
                alt="Land Command"
                className="h-14 w-auto md:h-[72px] lg:h-[78px] transition-transform duration-300 will-change-transform"
                style={{ transform: `scale(${logoScale})` }}
              />
            </Link>
          </div>

          {/* RIGHT GROUP */}
          <div className="flex items-center justify-end gap-12">
            <nav className="hidden md:flex items-center gap-12">
              {RIGHT_MENU.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="relative text-[13px] uppercase tracking-[0.16em] whitespace-nowrap text-white/90 hover:text-white"
                >
                  {m.label}
                  <span className="absolute right-0 -bottom-1 block h-px w-0 bg-white/80 transition-all duration-200 hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Hamburger */}
            <button
              aria-label="Open menu"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 bg-black/30 backdrop-blur text-white/90 hover:bg-white/10"
            >
              <span className="sr-only">Open menu</span>
              <span className="block h-0.5 w-6 bg-white" />
              <span className="mt-1.5 block h-0.5 w-6 bg-white" />
              <span className="mt-1.5 block h-0.5 w-6 bg-white" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT DRAWER */}
      <div
        className={`fixed inset-0 z-[60] ${drawer ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!drawer}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${drawer ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawer(false)}
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[90vw] max-w-[420px] transform transition-transform duration-200 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col gap-5 border-l border-white/10 bg-black/70 p-5 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/sight_only.png" alt="Land Command" className="h-8 w-auto" />
              <button
                aria-label="Close menu"
                onClick={() => setDrawer(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black/30 text-white/90 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/60">Navigate</p>
                <ul className="space-y-1">
                  <li><Link href="/about" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">About Land Command</Link></li>
                  <li><Link href="/properties" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Properties</Link></li>
                  <li><Link href="/search" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Search for Land</Link></li>
                  <li><Link href="/short-films" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Short Films</Link></li>
                  <li><Link href="/contact" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Contact</Link></li>
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-white/60">Status</p>
                <ul className="space-y-1">
                  <li><Link href="/properties/available" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Available</Link></li>
                  <li><Link href="/properties/under-contract" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Under Contract</Link></li>
                  <li><Link href="/properties/sold" onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-white/10">Sold</Link></li>
                </ul>
              </div>

              <div className="pt-1">
                <Link
                  href="/sell"
                  onClick={() => setDrawer(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
                  style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset" }}
                >
                  List Your Property
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
