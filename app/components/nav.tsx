"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mirrors Covey Rise header structure:
 * - Large centered logo
 * - Two links on left, two on right
 * - Transparent over hero initially
 * - On scroll: subtle backdrop blur + dark tint + thin bottom border
 *
 * Assets expected:
 *   /public/sight_only.png  (light/white logo recommended)
 */

const LEFT_LINKS = [
  { href: "/properties", label: "Properties" }, // could route to /active-listings
  { href: "/about", label: "About" },
];

const RIGHT_LINKS = [
  { href: "/short-films", label: "Short Films" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      {/* The bar that gains blur/tint/border after a tiny scroll */}
      <div
        className={[
          "mx-auto w-full max-w-7xl px-4 transition-all duration-300",
          scrolled
            ? "backdrop-blur bg-black/35 border-b border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            : "bg-transparent",
        ].join(" ")}
        style={{ pointerEvents: "auto" }}
      >
        {/* 3-column grid: L links | center logo | R links */}
        <div className="grid grid-cols-3 items-center py-6">
          {/* Left links */}
          <nav className="hidden md:flex items-center gap-8">
            {LEFT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Centered logo (larger) */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/" className="inline-flex">
              <img
                src="/sight_only.png"
                alt="LandCommand.ai"
                className={[
                  "h-16 w-auto md:h-20 lg:h-24",
                  "transition-transform duration-300",
                  scrolled ? "scale-[0.95]" : "scale-100",
                ].join(" ")}
              />
            </Link>
          </div>

          {/* Right links */}
          <nav className="hidden md:flex items-center justify-end gap-8">
            {RIGHT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white after:absolute after:right-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: we keep the exact “centered logo” look, links hidden */}
          <div className="col-span-3 flex items-center justify-center md:hidden" />
        </div>
      </div>
    </header>
  );
}
