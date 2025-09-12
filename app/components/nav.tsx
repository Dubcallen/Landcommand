"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ---------- Menu data (unchanged) ---------- */

type Item = { href: string; label: string };

const ABOUT: Item[] = [
  { href: "/about/firm", label: "Our Firm" },
  { href: "/about/process", label: "Our Process" },
  { href: "/about/press", label: "Press" },
  { href: "/about/stories", label: "Stories" },
];

const PROPERTIES: Item[] = [
  { href: "/properties/available", label: "Available" },
  { href: "/properties/under-contract", label: "Under Contract" },
  { href: "/properties/sold", label: "Sold" },
  { href: "/sell", label: "List Your Property" },
];

/* ---------- Theme tokens (easy to tweak) ---------- */

const GOLD = "#CBB26A";         // hover accent like Covey Rise
const TEXT = "rgba(237, 234, 224, 0.92)"; // warm ivory text
const GLASS = "rgba(18,18,18,0.36)";      // bar bg
const GLASS_HEAVY = "rgba(18,18,18,0.92)"; // dropdown bg

/* ---------- Header ---------- */

export default function Nav() {
  const [open, setOpen] = useState(false);

  // lock body scroll for mobile drawer
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
      {/* Glassy bar */}
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div
          className="mt-3 rounded-2xl border backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          style={{
            background: GLASS,
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          {/* Pull left/right closer to logo so the center feels balanced */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3">
            {/* LEFT (desktop) */}
            <div className="hidden md:flex items-center justify-end gap-9">
              <DesktopDropdown label="ABOUT LAND COMMAND" items={ABOUT} />
              <DesktopDropdown label="PROPERTIES" items={PROPERTIES} />
            </div>

            {/* CENTER logo */}
            <Link
              href="/"
              aria-label="Land Command — Home"
              className="mx-1 flex items-center justify-center"
            >
              <Image
                src="/sight_only.png"
                alt="Land Command"
                width={46}
                height={46}
                priority
                className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              />
            </Link>

            {/* RIGHT (desktop) */}
            <nav className="hidden md:flex items-center justify-start gap-9">
              <NavLink href="/search">SEARCH FOR LAND</NavLink>
              <NavLink href="/short-films">SHORT FILMS</NavLink>
            </nav>

            {/* MOBILE hamburger */}
            <div className="md:hidden col-span-3 flex justify-end">
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 text-white hover:bg-black/55"
              >
                <span className="block h-0.5 w-5 bg-white mb-1.5" />
                <span className="block h-0.5 w-5 bg-white mb-1.5" />
                <span className="block h-0.5 w-5 bg-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE full-screen drawer (unchanged) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#121212] text-white border-l border-white/10 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <div className="text-sm uppercase tracking-[0.20em] text-white/80">
              Menu
            </div>
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
            <MobileGroup
              title="ABOUT LAND COMMAND"
              items={ABOUT}
              onClose={() => setOpen(false)}
            />
            <MobileGroup
              title="PROPERTIES"
              items={PROPERTIES}
              onClose={() => setOpen(false)}
            />
            <div className="mt-2 space-y-1">
              <MobileLink href="/search" onClick={() => setOpen(false)}>
                SEARCH FOR LAND
              </MobileLink>
              <MobileLink href="/short-films" onClick={() => setOpen(false)}>
                SHORT FILMS
              </MobileLink>
            </div>

            {/* Quick CTAs */}
            <div className="mt-6 grid gap-3">
              <a
                href="/sell"
                className="rounded-xl border border-[rgba(203,178,106,0.5)] bg-[rgba(203,178,106,0.9)] px-4 py-3 text-center font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
              >
                List Your Property
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-white/25 px-4 py-3 text-center text-white hover:bg-white/10"
              >
                Speak with a Specialist
              </a>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

/* ---------- Desktop UI helpers (restyled) ---------- */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative text-[12px] uppercase tracking-[0.22em] leading-none"
      style={{ color: TEXT }}
    >
      <span className="transition-colors duration-150 hover:text-white">
        {children}
      </span>
      {/* subtle gold underline on hover */}
      <span
        className="absolute left-1/2 -bottom-2 h-[1px] w-0 -translate-x-1/2 bg-current transition-all duration-200"
        style={{ backgroundColor: GOLD }}
      />
      <style jsx>{`
        a:hover span + span {
          width: 70%;
        }
      `}</style>
    </Link>
  );
}

/**
 * Dropdown with no flicker:
 *  - State-driven (mouseenter/mouseleave with a tiny delay)
 *  - Panel hugs the trigger (no cursor gap)
 *  - Thin small-caps with gold hover accent
 */
function DesktopDropdown({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const enter = () => {
    if (timer) clearTimeout(timer);
    setOpen(true);
  };
  const leave = () => {
    const t = setTimeout(() => setOpen(false), 120);
    setTimer(t);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <div className="relative cursor-default text-[12px] uppercase tracking-[0.22em] leading-none">
        <span
          className="transition-colors duration-150"
          style={{ color: TEXT }}
        >
          {label}
        </span>
        <span
          className="ml-1 align-middle text-[10px] opacity-80"
          style={{ color: TEXT }}
          aria-hidden
        >
          ▾
        </span>

        {/* underline on hover */}
        <span
          className={`absolute left-1/2 -bottom-2 h-[1px] -translate-x-1/2 bg-[${GOLD}] transition-all duration-200 ${
            open ? "w-4/5" : "w-0"
          }`}
        />
      </div>

      {/* Panel (no gap) */}
      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ minWidth: "16rem" }}
      >
        <div
          className={`rounded-xl border px-2 py-2 text-sm shadow-xl backdrop-blur transition-all duration-150 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
          style={{
            background: GLASS_HEAVY,
            borderColor: "rgba(255,255,255,0.10)",
          }}
        >
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block rounded-lg px-4 py-2 text-[13px] tracking-wide text-white/90 hover:text-white hover:bg-white/10"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile UI helpers (unchanged) ---------- */

function MobileGroup({
  title,
  items,
  onClose,
}: {
  title: string;
  items: Item[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[13px] uppercase tracking-[0.20em] hover:bg-white/5"
      >
        <span>{title}</span>
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
      className="block rounded-lg px-3 py-3 text-[13px] uppercase tracking-[0.20em] hover:bg-white/5"
    >
      {children}
    </Link>
  );
}
