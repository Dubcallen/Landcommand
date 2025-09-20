"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState<null | "about" | "properties">(null);
  const [drawer, setDrawer] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (
        aboutRef.current &&
        !aboutRef.current.contains(t) &&
        propsRef.current &&
        !propsRef.current.contains(t)
      ) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function openNow(which: "about" | "properties") {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(which);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }

  return (
    <header
      className="lc-header absolute top-0 z-50 w-full bg-transparent select-none"
      style={{ borderBottom: "0 none", boxShadow: "none" }}
      role="banner"
    >
      {/* ----------------- MOBILE BAR (md:hidden) ----------------- */}
      <div
        className="
          mx-auto block max-w-7xl px-4 md:hidden
          pt-[calc(env(safe-area-inset-top)+8px)] pb-3
          relative
        "
      >
        {/* 3-cell row: [spacer | centered logo | hamburger] */}
        <div className="flex items-center justify-between">
          {/* spacer (same width as hamburger) to keep logo perfectly centered */}
          <span className="inline-block w-10" aria-hidden="true" />

          {/* centered logo */}
          <Link
            href="/"
            aria-label="Land Command — Home"
            className="mx-auto block"
          >
            <Image
              src="/sight_only.png"
              alt="Land Command"
              width={72}
              height={72}
              priority
              className="transition-transform duration-300 will-change-transform hover:scale-125"
            />
          </Link>

          {/* right-aligned hamburger (width matches spacer) */}
          <button
            className="inline-flex w-10 items-center justify-end text-white/90 hover:text-white focus:outline-none"
            aria-label="Open menu"
            onClick={() => setDrawer((v) => !v)}
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

      {/* ----------------- DESKTOP BAR (hidden below md) ----------------- */}
      <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 md:grid">
        {/* LEFT (desktop) */}
        <nav className="flex items-center justify-start gap-10 font-serif text-sm uppercase tracking-[0.18em] text-white">
          {/* ABOUT */}
          <div
            ref={aboutRef}
            className="relative"
            onMouseEnter={() => openNow("about")}
            onMouseLeave={scheduleClose}
          >
            <button
              onClick={() => setOpen((v) => (v === "about" ? null : "about"))}
              className="hover:text-[#CBB26A] transition-colors"
              aria-haspopup="true"
              aria-expanded={open === "about"}
            >
              ABOUT LAND COMMAND ▾
            </button>

            {open === "about" && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-white/10 bg-[#1B1B1B]/95 backdrop-blur shadow-none z-50">
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
            onMouseEnter={() => openNow("properties")}
            onMouseLeave={scheduleClose}
          >
            <button
              onClick={() =>
                setOpen((v) => (v === "properties" ? null : "properties"))
              }
              className="hover:text-[#CBB26A] transition-colors"
              aria-haspopup="true"
              aria-expanded={open === "properties"}
            >
              PROPERTIES ▾
            </button>

            {open === "properties" && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-lg border border-white/10 bg-[#1B1B1B]/95 backdrop-blur shadow-none z-50">
                <MenuLink href="/properties/available">Available</MenuLink>
                <MenuLink href="/properties/under-contract">
                  Under Contract
                </MenuLink>
                <MenuLink href="/properties/sold">Sold</MenuLink>
                <MenuLink href="/sell">List Your Property</MenuLink>
              </div>
            )}
          </div>
        </nav>

        {/* CENTER LOGO (desktop) */}
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

        {/* RIGHT (desktop) */}
        <div className="flex items-center justify-end gap-8">
          <nav className="hidden md:flex items-center gap-10 font-serif text-sm uppercase tracking-[0.18em] text-white">
            <Link className="hover:text-[#CBB26A] transition-colors" href="/search">
              Search for Land
            </Link>
            <Link
              className="hover:text-[#CBB26A] transition-colors"
              href="/short-films"
            >
              Short Films
            </Link>
          </nav>

          {/* We keep a hamburger on desktop too (optional, harmless) */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white focus:outline-none"
            aria-label="Open menu"
            onClick={() => setDrawer((v) => !v)}
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

      {/* ----------------- DRAWER (shared) ----------------- */}
      <div
        className={`fixed inset-x-0 z-40 overflow-hidden bg-[#1B1B1B]/95 backdrop-blur transition-[max-height] duration-300 ease-out
        ${drawer ? "max-h-[520px]" : "max-h-0"}
        `}
        // Align drawer just under the bars (mobile ~64–76px, desktop ~84px)
        style={{
          top: "72px",
          borderTop: "0",
          boxShadow: "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-5 font-serif uppercase text-white text-sm">
          <p className="mb-2 text-white/60">ABOUT LAND COMMAND</p>
          <MobileLink href="/about/firm">Our Firm</MobileLink>
          <MobileLink href="/about/process">Our Process</MobileLink>
          <MobileLink href="/about/press">Press</MobileLink>
          <MobileLink href="/about/stories">Stories</MobileLink>

          <div className="mt-4 h-px bg-white/10" />

          <p className="mt-4 mb-2 text-white/60">PROPERTIES</p>
          <MobileLink href="/properties/available">Available</MobileLink>
          <MobileLink href="/properties/under-contract">
            Under Contract
          </MobileLink>
          <MobileLink href="/properties/sold">Sold</MobileLink>
          <MobileLink href="/sell">List Your Property</MobileLink>

          <div className="mt-4 h-px bg-white/10" />

          <MobileLink href="/search" className="mt-4">
            Search for Land
          </MobileLink>
          <MobileLink href="/short-films">Short Films</MobileLink>
        </div>
      </div>

      {/* Global border/shadow kill-switch */}
      <style jsx global>{`
        .lc-header,
        .lc-header * {
          border: 0 !important;
          box-shadow: none !important;
        }
      `}</style>
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

