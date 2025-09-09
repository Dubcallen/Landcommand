"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Desktop:
 * - Symmetric layout: LEFT group | spacer | RIGHT group
 * - Hover dropdowns
 * Mobile:
 * - Hamburger (right)
 * - Full-screen slide-in menu with accordions
 * Extras:
 * - Subtle inertia/drag on scroll (like Covey Rise)
 * - No logo rendered in the nav (hero owns branding)
 */

type DD = { href: string; label: string };

const ABOUT_DD: DD[] = [
  { href: "/about", label: "Our Story" },
  { href: "/about/stories", label: "Featured Stories" },
];

const PROPERTIES_DD: DD[] = [
  { href: "/listings", label: "Active Listings" },
  { href: "/listings/recent", label: "Recent Sales" },
];

const SERVICES_DD: DD[] = [
  { href: "/services/listing-fees", label: "Flat Listing Fees" },
  { href: "/services/reels", label: "Reels (Short Films)" },
  { href: "/services/stories", label: "Stories (Editorial Features)" },
  { href: "/services/brokerage", label: "Brokerage (10%)" },
  { href: "/services/flipping", label: "Flipping Land" },
  { href: "/services/seller-financing", label: "Seller Financing" },
];

// small physics loop for the “drag” effect
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

export default function Nav() {
  // inertia
  const [progress, setProgress] = useState(0);
  const [dragY, setDragY] = useState(0);
  const target = useRef(0);
  const cur = useRef(0);
  const vel = useRef(0);
  const raf = useRef<number | null>(null);

  // mobile open/close
  const [open, setOpen] = useState(false);

  // tune these for “feel”
  const STIFF = 0.02;
  const DAMP = 0.10;
  const MAX = 180;
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

  // style driven by scroll
  const blur = 12 * progress;
  const tint = 0.40 * progress;
  const border = 0.10 * progress;
  const shadow = 0.28 * progress;

  // lock scroll when mobile is open
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (open) {
      root.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* bar */}
      <div
        className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 transition-[transform,background-color,backdrop-filter] duration-300"
        style={{
          transform: `translateY(${dragY}px)`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(0,0,0,${tint})`,
          borderBottom: `1px solid rgba(255,255,255,${border})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadow})`,
        }}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-4">
          {/* LEFT (desktop) */}
          <div className="hidden md:flex items-center justify-end gap-10">
            <DesktopDropdown label="ABOUT LAND COMMAND" items={ABOUT_DD} />
            <DesktopDropdown label="PROPERTIES" items={PROPERTIES_DD} />
            <DesktopDropdown label="SERVICES" items={SERVICES_DD} />
          </div>

          {/* CENTER spacer so left/right hug center */}
          <div className="hidden md:block w-6" />

          {/* RIGHT (desktop) */}
          <nav className="hidden md:flex items-center justify-start gap-10">
            <NavLink href="/search">SEARCH FOR LAND</NavLink>
            <NavLink href="/short-films">SHORT FILMS</NavLink>
          </nav>

          {/* MOBILE: placeholder so hamburger pins right */}
          <div className="md:hidden" />

          {/* MOBILE: hamburger */}
          <div className="md:hidden flex justify-end pr-1">
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/35 text-white hover:bg-black/50"
            >
              <span className="block h-0.5 w-5 bg-white mb-1.5" />
              <span className="block h-0.5 w-5 bg-white mb-1.5" />
              <span className="block h-0.5 w-5 bg-white" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY (slide-in) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#121212] text-white border-l border-white/10 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <div className="text-sm uppercase tracking-[0.18em] text-white/80">Menu</div>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20"
            >
              <div className="relative h-5 w-5">
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
              </div>
            </button>
          </div>

          <div className="p-4">
            <MobileSection label="ABOUT LAND COMMAND" items={ABOUT_DD} onClose={() => setOpen(false)} />
            <MobileSection label="PROPERTIES" items={PROPERTIES_DD} onClose={() => setOpen(false)} />
            <MobileSection label="SERVICES" items={SERVICES_DD} onClose={() => setOpen(false)} />
            <div className="mt-2 space-y-1">
              <MobileLink href="/search" onClick={() => setOpen(false)}>
                SEARCH FOR LAND
              </MobileLink>
              <MobileLink href="/short-films" onClick={() => setOpen(false)}>
                SHORT FILMS
              </MobileLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- desktop helpers ---------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/90 hover:text-white text-[13px] uppercase tracking-[0.16em]"
    >
      {children}
    </Link>
  );
}

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="group relative">
      <span className="cursor-default text-white/90 hover:text-white text-[13px] uppercase tracking-[0.16em]">
        {label}
      </span>
      <div
        className="
          invisible absolute left-1/2 mt-3 w-64 -translate-x-1/2 rounded-xl
          border border-white/10 bg-black/70 p-2 text-sm text-white/90
          opacity-0 shadow-xl backdrop-blur transition
          group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
        "
      >
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="block rounded-lg px-4 py-2 hover:bg-white/10 hover:text-white"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- mobile helpers ---------- */

function MobileSection({
  label,
  items,
  onClose,
}: {
  label: string;
  items: { href: string; label: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[13px] uppercase tracking-[0.16em] hover:bg-white/5"
      >
        <span>{label}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
          ▾
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-3 pb-2 pt-1">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={onClose}
                className="block rounded-md px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-3 text-[13px] uppercase tracking-[0.16em] hover:bg-white/5"
    >
      {children}
    </Link>
  );
}

