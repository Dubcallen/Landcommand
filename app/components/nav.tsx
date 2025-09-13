"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState<"about" | "properties" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef<HTMLDivElement>(null);

  // close dropdowns when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (
        aboutRef.current &&
        !aboutRef.current.contains(t) &&
        propsRef.current &&
        !propsRef.current.contains(t)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent select-none">
      {/* 3-column grid keeps the logo perfectly centered regardless of left/right widths */}
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-5">
        {/* LEFT (desktop) */}
        <nav className="hidden md:flex items-center justify-start gap-10 font-serif text-sm uppercase tracking-[0.18em] text-white">
          {/* ABOUT */}
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => setOpenDropdown("about")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() =>
                setOpenDropdown((v) => (v === "about" ? null : "about"))
              }
              className="hover:text-[#CBB26A] transition-colors"
              aria-haspopup="true"
              aria-expanded={openDropdown === "about"}
            >
              ABOUT LAND COMMAND ▾
            </button>
            {openDropdown === "about" && (
              <div className="absolute left-0 mt-2 w-56 rounded-lg border border-white/10 bg-[#1B1B1B]/95 backdrop-blur shadow-xl">
                <MenuLink href="/about/firm">Our Firm</MenuLink>
                <MenuLink href="/about/process">Our Process</MenuLink>
                <MenuLink href="/about/press">Press</MenuLink>
                <MenuLink href="/about/stories">Stories</MenuLink>
              </div>
            )}
          </div>

          {/* PROPERTIES */}
          <div
            ref={propsRef}
            className="relative"
            onMouseEnter={() => setOpenDropdown("properties")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() =>
                setOpenDropdown((v) => (v === "properties" ? null : "properties"))
              }
              className="hover:text-[#CBB26A] transition-colors"
              aria-haspopup="true"
              aria-expanded={openDropdown === "properties"}
            >
              PROPERTIES ▾
            </button>
            {openDropdown === "properties" && (
              <div className="absolute left-0 mt-2 w-56 rounded-lg border border-white/10 bg-[#1B1B1B]/95 backdrop-blur shadow-xl">
                <MenuLink href="/properties/available">Available</MenuLink>
                <MenuLink href="/properties/under-contract">Under Contract</MenuLink>
                <MenuLink href="/properties/sold">Sold</MenuLink>
                <MenuLink href="/sell">List Your Property</MenuLink>
              </div>
            )}
          </div>
        </nav>

        {/* CENTER LOGO (always rendered) */}
        <div className="flex items-center justify-center">
          <Link href="/" aria-label="Land Command — Home" className="block">
            <Image
              src="/sight_only.png"
              alt="Land Command"
              width={90}
              height={90}
              priority
              className="transition-transform duration-300 will-change-transform hover:scale-125"
            />
          </Link>
        </div>

        {/* RIGHT (desktop) + HAMBURGER (mobile) */}
        <div className="flex items-center justify-end gap-6">
          <nav className="hidden md:flex items-center gap-10 font-serif text-sm uppercase tracking-[0.18em] text-white">
            <Link className="hover:text-[#CBB26A] transition-colors" href="/search">
              Search for Land
            </Link>
            <Link className="hover:text-[#CBB26A] transition-colors" href="/short-films">
              Short Films
            </Link>
          </nav>

          {/* Hamburger (visible < md) */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out
          bg-[#1B1B1B]/95 backdrop-blur border-t border-white/10
          ${mobileOpen ? "max-h-[420px]" : "max-h-0"}`}
      >
        <div className="px-6 py-4 font-serif uppercase text-white text-sm">
          <p className="mb-2 text-white/60">ABOUT LAND COMMAND</p>
          <MobileLink href="/about/firm">Our Firm</MobileLink>
          <MobileLink href="/about/process">Our Process</MobileLink>
          <MobileLink href="/about/press">Press</MobileLink>
          <MobileLink href="/about/stories">Stories</MobileLink>

          <div className="mt-4 h-px bg-white/10" />

          <p className="mt-4 mb-2 text-white/60">PROPERTIES</p>
          <MobileLink href="/properties/available">Available</MobileLink>
          <MobileLink href="/properties/under-contract">Under Contract</MobileLink>
          <MobileLink href="/properties/sold">Sold</MobileLink>
          <MobileLink href="/sell">List Your Property</MobileLink>

          <div className="mt-4 h-px bg-white/10" />

          <MobileLink href="/search" className="mt-4">
            Search for Land
          </MobileLink>
          <MobileLink href="/short-films">Short Films</MobileLink>
        </div>
      </div>
    </header>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`block py-2 text-white/90 hover:text-white transition ${className}`}
    >
      {children}
    </Link>
  );
}
