"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/* ----------------------- Menu data ----------------------- */

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

/* -------------------- Header component ------------------- */

export default function Nav() {
  const [open, setOpen] = useState(false);

  // lock background scroll when mobile drawer is open
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
      {/* Glassy nav bar (subtle like Covey Rise) */}
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mt-3 rounded-2xl border border-white/10 bg-[rgba(18,18,18,0.48)] backdrop-blur-md supports-[backdrop-filter]:bg-[rgba(18,18,18,0.32)] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
            {/* LEFT (desktop) */}
            <div className="hidden md:flex items-center justify-end gap-8">
              <DesktopDropdown label="ABOUT LAND COMMAND" items={ABOUT} />
              <DesktopDropdown label="PROPERTIES" items={PROPERTIES} />
            </div>

            {/* CENTER logo (click to home) */}
            <Link
              href="/"
              aria-label="Land Command — Home"
              className="mx-2 flex items-center justify-center"
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
            <nav className="hidden md:flex items-center justify-start gap-8">
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

      {/* MOBILE full-screen drawer */}
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
            <div className="text-sm uppercase tracking-[0.18em] text-white/80">
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

/* ----------------------- Desktop UI ---------------------- */

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
      className="text-white/90 hover:text-white text-[13px] uppercase tracking-[0.18em] leading-none"
    >
      {children}
    </Link>
  );
}

/**
 * Desktop dropdown that does not flicker:
 * - Uses mouseenter/leave with a small close delay
 * - The wrapper covers both the trigger and the panel (no gap)
 */
function DesktopDropdown({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timer) clearTimeout(timer);
    setOpen(true);
  };
  const handleLeave = () => {
    const t = setTimeout(() => setOpen(false), 120); // tiny grace period
    setTimer(t);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="cursor-default text-white/90 hover:text-white text-[13px] uppercase tracking-[0.18em] leading-none">
        {label}
      </span>

      {/* Panel wrapper is anchored to top-full; no gap between trigger and panel */}
      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ minWidth: "16rem" }}
      >
        <div
          className={`rounded-xl border border-white/10 bg-[rgba(18,18,18,0.92)] backdrop-blur px-2 py-2 text-sm text-white/90 shadow-xl transition-all duration-150 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
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
    </div>
  );
}

/* ----------------------- Mobile UI ----------------------- */

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
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[13px] uppercase tracking-[0.18em] hover:bg-white/5"
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
      className="block rounded-lg px-3 py-3 text-[13px] uppercase tracking-[0.18em] hover:bg-white/5"
    >
      {children}
    </Link>
  );
}
