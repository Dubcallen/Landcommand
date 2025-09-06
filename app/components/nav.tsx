"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Nav (no external deps)
 * - Centered large logo
 * - Left + right hover dropdown menus
 * - Pronounced delayed scroll lag + vertical drag (requestAnimationFrame + lerp)
 * - Top-right hamburger opening a right side drawer (pure React + CSS)
 */

// --- Small helpers for scroll lag ---
function useScrollLag() {
  const [lag, setLag] = React.useState(0);
  const currentRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      targetRef.current = Math.min(window.scrollY, 600); // clamp for mapping
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      // lerp current toward target
      const c = currentRef.current;
      const t = targetRef.current;
      const next = c + (t - c) * 0.12; // adjust factor for more/less drag
      currentRef.current = next;
      // map 0..600 -> 0..40
      const translate = (next / 600) * 40; // px
      setLag(translate);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // backdrop opacity map: 0..600 -> 0.1..0.35
  const opacity = React.useMemo(() => {
    const y = Math.min(currentRef.current, 600);
    return 0.1 + (y / 600) * (0.35 - 0.1);
  }, [lag]);

  return { lag, opacity };
}

export default function Nav() {
  const { lag, opacity } = useScrollLag();
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      style={{ transform: `translateY(${-lag}px)`, background: "rgba(12,12,12,0.35)" as const, backdropFilter: "saturate(140%) blur(8px)" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
    >
      {/* translucent underlay intensifies with scroll */}
      <div style={{ opacity }} className="pointer-events-none absolute inset-0 bg-black" />

      <div className="relative mx-auto grid h-[76px] max-w-[1120px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-5 lg:px-6">
        {/* Left menu (desktop) */}
        <div className="hidden items-center justify-end pr-6 md:flex">
          <NavMenu
            items={[
              {
                label: "Properties",
                href: "/properties",
                children: [
                  { label: "Active Listings", href: "/properties/active" },
                  { label: "Private Listings", href: "/properties/private" },
                  { label: "Notable Sales", href: "/properties/notable" },
                ],
              },
              {
                label: "About",
                href: "/about",
                children: [
                  { label: "Meet The Team", href: "/about/team" },
                  { label: "List with Us", href: "/about/list-with-us" },
                  { label: "Buying Land", href: "/about/buying-land" },
                ],
              },
            ]}
          />
        </div>

        {/* Center logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="relative inline-flex items-center">
            <Image
              src="/logo.svg"
              alt="LandCommand"
              width={160}
              height={54}
              priority
              className="h-12 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            />
          </Link>
        </div>

        {/* Right menu + hamburger */}
        <div className="flex items-center justify-start gap-2 pl-6">
          <div className="hidden md:flex">
            <NavMenu
              items={[
                { label: "Short Films", href: "/short-films" },
                { label: "Search for Land", href: "/search" },
                { label: "Contact", href: "/contact" },
                {
                  label: "Resources",
                  href: "/resources",
                  children: [
                    { label: "Expert Insights", href: "/resources/insights" },
                  ],
                },
              ]}
            />
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 transition hover:bg-white/15"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {/* Side Drawer (no shadcn) */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        <MobileNav onNavigate={() => setOpen(false)} />
      </Drawer>
    </nav>
  );
}

// --- Desktop Menu with hover dropdowns (no external icons) ---
function NavMenu({
  items,
}: {
  items: { label: string; href: string; children?: { label: string; href: string }[] }[];
}) {
  return (
    <nav className="flex items-center gap-8">
      {items.map((item) => (
        <div key={item.label} className="group relative">
          <Link
            href={item.href}
            className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.32em] text-white/90 transition-colors hover:text-white hover:underline underline-offset-[6px] decoration-white/80"
          >
            <span>{item.label}</span>
            {item.children?.length ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:rotate-180" aria-hidden>
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </Link>

          {item.children?.length ? (
            <div className="pointer-events-none absolute left-1/2 top-8 z-50 w-56 -translate-x-1/2 opacity-0 shadow-2xl ring-1 ring-white/10 drop-shadow-xl transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-md">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 transition hover:bg-white/5 hover:text-white"
                  >
                    {child.label}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-60" aria-hidden>
                      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}

// --- Hamburger (3 bars -> X) ---
function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 top-0 block h-0.5 w-6 origin-center rounded bg-white transition-transform duration-300 ${
          open ? "translate-y-[10px] rotate-45" : "translate-y-0 rotate-0"
        }`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 origin-center rounded bg-white transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 bottom-0 block h-0.5 w-6 origin-center rounded bg-white transition-transform duration-300 ${
          open ? "-translate-y-[10px] -rotate-45" : "translate-y-0 rotate-0"
        }`}
      />
    </div>
  );
}

// --- No-deps Drawer ---
function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[61] h-dvh w-[320px] sm:w-[380px] border-l border-white/10 bg-black/70 p-0 text-white backdrop-blur-md transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="LandCommand" width={120} height={36} className="h-9 w-auto" />
            <button onClick={onClose} aria-label="Close menu" className="ml-auto rounded-lg px-3 py-1 text-sm text-white/80 hover:bg-white/10">Close</button>
          </div>
        </div>
        <div className="max-h-[calc(100dvh-60px)] overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}

// --- Mobile Drawer Content ---
function MobileNav({ onNavigate }: { onNavigate?: () => void }) {
  const groups = [
    {
      title: "Properties",
      items: [
        { label: "Active Listings", href: "/properties/active" },
        { label: "Private Listings", href: "/properties/private" },
        { label: "Notable Sales", href: "/properties/notable" },
      ],
    },
    {
      title: "About",
      items: [
        { label: "Meet The Team", href: "/about/team" },
        { label: "List with Us", href: "/about/list-with-us" },
        { label: "Buying Land", href: "/about/buying-land" },
      ],
    },
    {
      title: "More",
      items: [
        { label: "Short Films", href: "/short-films" },
        { label: "Search for Land", href: "/search" },
        { label: "Contact", href: "/contact" },
        { label: "Expert Insights", href: "/resources/insights" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-1 py-2">
      {groups.map((g) => (
        <div key={g.title} className="px-2 py-1">
          <div className="px-3 py-2 text-xs uppercase tracking-wider text-white/60">{g.title}</div>
          <div className="flex flex-col">
            {g.items.map((i) => (
              <Link
                key={i.label}
                href={i.href}
                onClick={onNavigate}
                className="rounded-xl px-3 py-2 text-sm text-white/90 transition hover:bg-white/5 hover:text-white"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-2 border-t border-white/10 p-3">
        <Link
          href="/contact"
          onClick={onNavigate}
          className="block rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/15"
        >
          Speak with a Specialist
        </Link>
      </div>
    </div>
  );
}
