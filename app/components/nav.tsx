"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Mirrors Covey Rise header:
 * - Large centered logo, two links left + two links right (close to logo)
 * - Transparent over hero; on scroll: blur/tint/border with a slight delayed ease (rAF lerp)
 * - Hover dropdowns on the two left headings
 * - Desktop-first (links hidden on mobile to preserve the exact look)
 *
 * Place assets:
 *   /public/sight_only.png   (prefer a light/white logo)
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

// Utility: linear interpolation
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Nav() {
  // Inertial scroll “progress” in [0..1]
  const [prog, setProg] = useState(0);
  const targetRef = useRef(0);
  const curRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Dropdown open state with tiny open/close delays for a luxe feel
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});

  // Measure scroll and update target
  useEffect(() => {
    const onScroll = () => {
      // 0 at top, → 1 by ~80px of scroll
      const t = Math.min(1, window.scrollY / 80);
      targetRef.current = t;
      if (rafRef.current == null) animate(); // kick the loop if not running
    };
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const cur = curRef.current;
      const target = targetRef.current;
      // Lerp with small factor for “laggy” premium feel
      const next = lerp(cur, target, 0.12);
      curRef.current = next;
      setProg(next);
      if (Math.abs(next - target) < 0.002) {
        // close enough; stop the rAF to save work
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // expose animate to scope
    // @ts-ignore
    window.__navAnimate = animate;

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Map progress → style values
  const blurPx = 0 + prog * 10;               // 0 → 10px blur
  const tint = 0 + prog * 0.35;               // 0 → 0.35 black alpha
  const borderA = 0 + prog * 0.10;            // 0 → 0.10 white alpha
  const shadowA = 0 + prog * 0.25;            // 0 → 0.25 shadow alpha
  const logoScale = 1 - prog * 0.05;          // 1 → 0.95

  // Compact container so links sit close to the logo (tweak max-w here)
  const containerClass =
    "mx-auto w-full max-w-5xl px-4 transition-[padding] duration-300";

  // Dropdown helpers (tiny delays feel premium)
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

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className={containerClass}
        style={{
          pointerEvents: "auto",
          // backdrop blur & tint with delay
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          backgroundColor: `rgba(0,0,0,${tint})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadowA})`,
          borderBottom: `1px solid rgba(255,255,255,${borderA})`,
        }}
      >
        {/* 3 columns: left (right-justified), center logo, right (left-justified) */}
        <div className="grid grid-cols-3 items-center py-6">
          {/* LEFT: two headings with dropdowns, pulled toward center */}
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

                  {/* Dropdown */}
                  {item.dropdown && (
                    <div
                      className={`absolute left-1/2 z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-black/70 backdrop-blur
                                  shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-200
                                  ${isOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}
                    >
                      <ul className="p-2">
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

          {/* CENTER: big logo with slight scale on scroll */}
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

          {/* RIGHT: two headings (no dropdowns), pulled toward center */}
          <nav className="hidden md:flex items-center justify-start gap-6 pl-2">
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

          {/* Mobile: center logo only */}
          <div className="col-span-3 flex items-center justify-center md:hidden" />
        </div>
      </div>
    </header>
  );
}
