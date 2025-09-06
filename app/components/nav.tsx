"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mirrored header:
 * - Logo centered (large)
 * - Two links on the left, two on the right
 * - Overlaid on hero with subtle blur/tint that strengthens on scroll
 */

const LEFT_LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/buy", label: "Buy" },
];

const RIGHT_LINKS = [
  { href: "/regions", label: "Regions" },
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
    <header className="absolute inset-x-0 top-0 z-50">
      <div
        className={[
          "mx-auto w-full max-w-7xl px-4",
          "transition-all duration-300",
          scrolled
            ? "backdrop-blur bg-black/35 border-b border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            : "bg-transparent",
        ].join(" ")}
      >
        {/* 3-column grid: left links / centered logo / right links */}
        <div className="grid grid-cols-3 items-center py-6">
          {/* Left links */}
          <nav className="hidden md:flex items-center gap-8">
            {LEFT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/" className="inline-flex">
              <img
                src="/sight_only.png"  /* place file in /public/sight_only.png */
                alt="LandCommand.ai"
                className="h-14 w-auto md:h-16 lg:h-20 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Right links */}
          <nav className="hidden md:flex items-center justify-end gap-8">
            {RIGHT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white relative after:absolute after:right-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: logo only (links hidden) */}
          <div className="col-span-3 flex items-center justify-center md:hidden">
            {/* handled above; no extra content needed */}
          </div>
        </div>
      </div>
    </header>
  );
}
