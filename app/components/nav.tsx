"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Desktop:
 * - Symmetric layout: left group | (empty center) | right group
 * - Hover dropdowns
 *
 * Mobile:
 * - Compact top bar with hamburger on the right
 * - Full-screen overlay menu with slide/blur
 * - Accordion sections for dropdown groups
 *
 * No logo is rendered in the nav (hero owns branding).
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

export default function Nav() {
  // hamburger state
  const [open, setOpen] = useState(false);
  // mobile accordions
  const [aboutOpen, setAboutOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // prevent background scroll when menu open
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* NAV BAR */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className="
            mt-4 rounded-2xl border border-white/10 bg-black/30
            backdrop-blur transition-colors
          "
        >
          {/* Top row */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3">
            {/* LEFT (desktop) */}
            <div className="hidden lg:flex items-center justify-end gap-10 text-white/90">
              <DesktopDropdown label="ABOUT LAND COMMAND" items={ABOUT_DD} />
              <DesktopDropdown label="PROPERTIES" items={PROPERTIES_DD} />
              <DesktopDropdown label="SERVICES" items={SERVICES_DD} />
            </div>

            {/* CENTER spacer (keeps symmetry) */}
            <div className="hidden lg:block w-6" />

            {/* RIGHT (desktop) */}
            <nav className="hidden lg:flex items-center justify-start gap-10 text-white/90">
              <Link className="hover:text-white text-[13px] uppercase tracking-[0.16em]" href="/search">
                SEARCH FOR LAND
              </Link>
              <Link className="hover:text-white text-[13px] uppercase tracking-[0.16em]" href="/short-films">
                SHORT FILMS
              </Link>
            </nav>

            {/* MOBILE: left placeholder keeps icon pinned right */}
            <div className="lg:hidden" />

            {/* MOBILE hamburger */}
            <div className="lg:hidden flex justify-end">
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20"
              >
                <span className="block h-0.5 w-5 bg-white mb-1.5" />
                <span className="block h-0.5 w-5 bg-white mb-1.5" />
                <span className="block h-0.5 w-5 bg-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div
        className={`
          lg:hidden fixed inset-0 z-50 transition
          ${open ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* dark backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur
          transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        {/* panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-[88%] max-w-sm
            bg-[#121212] text-white shadow-2xl border-l border-white/10
            transition-transform duration-300
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
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
              <span className="sr-only">Close</span>
              <div className="relative h-5 w-5">
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
              </div>
            </button>
          </div>

          <div className="p-4">
            {/* About accordion */}
            <MobileAccordion
              label="ABOUT LAND COMMAND"
              open={aboutOpen}
              onToggle={() => setAboutOpen((v) => !v)}
              items={ABOUT_DD}
              onLink={() => setOpen(false)}
            />

            {/* Properties accordion */}
            <MobileAccordion
              label="PROPERTIES"
              open={propertiesOpen}
              onToggle={() => setPropertiesOpen((v) => !v)}
              items={PROPERTIES_DD}
              onLink={() => setOpen(false)}
            />

            {/* Services accordion */}
            <MobileAccordion
              label="SERVICES"
              open={servicesOpen}
              onToggle={() => setServicesOpen((v) => !v)}
              items={SERVICES_DD}
              onLink={() => setOpen(false)}
            />

            {/* Simple links */}
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

/* ------------------------ Helpers ------------------------ */

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="group relative">
      <span className="cursor-default text-[13px] uppercase tracking-[0.16em] group-hover:text-white">
        {label}
      </span>
      <div
        className="
          invisible absolute left-1/2 mt-3 w-60 -translate-x-1/2 rounded-xl
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

function MobileAccordion({
  label,
  open,
  onToggle,
  items,
  onLink,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  items: { href: string; label: string }[];
  onLink: () => void;
}) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[13px] uppercase tracking-[0.16em] hover:bg-white/5"
      >
        <span>{label}</span>
        <span
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
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
                onClick={onLink}
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
