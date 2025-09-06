"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Header spec:
 * - Centered large logo
 * - Two links left (with dropdowns), two links right
 * - Compact container (max-w-5xl) so links sit close to logo
 * - Transparent over hero initially; blur/tint when scrolled
 * - Desktop only for menus (mobile menu can be added later)
 *
 * Assets:
 *   /public/sight_only.png  (prefer a light/white logo to pop on video)
 */

const LEFT_LINKS = [
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
      <div
        className={[
          "mx-auto w-full max-w-5xl px-4", // <-- compact width so links hug the logo
          "transition-all duration-300",
          scrolled
            ? "backdrop-blur bg-black/35 border-b border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            : "bg-transparent",
        ].join(" ")}
        style={{ pointerEvents: "auto" }}
      >
        {/* 3 columns: left links (right-justified) | centered logo | right links (left-justified) */}
        <div className="grid grid-cols-3 items-center py-6">
          {/* LEFT: two headings with dropdowns */}
          <nav className="hidden md:flex items-center justify-end gap-6">
            {LEFT_LINKS.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="relative text-[11px] uppercase tracking-[0.24em] text-white/90 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white/80 after:transition-all group-hover:after:w-full"
                >
                  {item.label}
                </Link>
                {/* Dropdown panel */}
                <div className="pointer-events-none absolute left-1/2 z-50 mt-3 hidden -translate-x-1/2 group-hover:block md:group-hover:pointer-events-auto">
                  <div className="min-w-[220px] overflow-hidden rounded-xl border border-white/10 bg-black/70 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
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
                </div>
              </div>
            ))}
          </nav>

          {/* CENTER: big logo */}
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Link href="/" className="inline-flex">
              <img
                src="/sight_only.png"
                alt="LandCommand.ai"
                className={[
                  // Tweak sizes here if you want it even larger or smaller
                  "h-16 w-auto md:h-20 lg:h-24",
                  "transition-transform duration-300",
                  scrolled ? "scale-[0.95]" : "scale-100",
                ].join(" ")}
              />
            </Link>
          </div>

          {/* RIGHT: two headings (no dropdowns) */}
          <nav className="hidden md:flex items-center justify-start gap-6">
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

          {/* Mobile: preserve center logo look, hide links */}
          <div className="col-span-3 flex items-center justify-center md:hidden" />
        </div>
      </div>
    </header>
  );
}
