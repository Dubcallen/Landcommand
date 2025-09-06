"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

const LEFT_MENU: MenuItem[] = [
  {
    href: "/about",
    label: "About",
    dropdown: [
      { href: "/about/firm", label: "The Firm" },
      { href: "/about/process", label: "Process" },
      { href: "/about/press", label: "Press" },
    ],
  },
  {
    href: "/properties",
    label: "Properties",
    dropdown: [
      { href: "/properties/available", label: "Available Listings" },
      { href: "/properties/under-contract", label: "Under Contract" },
      { href: "/properties/sold", label: "Sold" },
    ],
  },
];

const RIGHT_MENU: MenuItem[] = [
  { href: "/search", label: "Search for Land" },
  { href: "/short-films", label: "Short Films" },
  { href: "/contact", label: "Contact" },
];

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [dragPx, setDragPx] = useState(0);

  const targetRef = useRef(0);
  const curRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const STIFFNESS = 0.02;
  const DAMPING = 0.1;
  const MAXY = 200;
  const DRAG_SCALE = 0.45;

  useEffect(() => {
    const onScroll = () => {
      targetRef.current = window.scrollY;
      if (rafRef.current == null) animate();
    };
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const target = targetRef.current;
      const x = curRef.current;
      const v = velRef.current;
      const force = STIFFNESS * (target - x) - DAMPING * v;
      const nextV = v + force;
      const nextX = x + nextV;
      curRef.current = nextX;
      velRef.current = nextV;
      const p = clamp(nextX / MAXY, 0, 1);
      setProgress(p);
      setDragPx((nextX - target) * DRAG_SCALE);
      if (Math.abs(nextX - target) < 0.1 && Math.abs(nextV) < 0.1) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const blurPx = 12 * progress;
  const tintA = 0.4 * progress;
  const borderA = 0.12 * progress;
  const shadowA = 0.32 * progress;
  const logoScale = 1 - 0.06 * progress;

  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});
  const openWithDelay = (key: string) => {
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => setOpenKey(key), 80);
  };
  const closeWithDelay = (key: string) => {
    clearTimeout(timers.current[key]);
    timers.current[key] = setTimeout(() => {
      if (openKey === key) setOpenKey(null);
    }, 120);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className="mx-auto w-full max-w-5xl px-4"
        style={{
          pointerEvents: "auto",
          transform: `translateY(${dragPx}px)`,
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
          backgroundColor: `rgba(0,0,0,${tintA})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadowA})`,
          borderBottom: `1px solid rgba(255,255,255,${borderA})`,
        }}
      >
        <div className="relative grid grid-cols-3 items-center py-6">
          {/* LEFT */}
          <nav className="hidden md:flex items-center justify-end gap-8">
            {LEFT_MENU.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openWithDelay(item.label)}
                onMouseLeave={() => closeWithDelay(item.label)}
              >
                <Link
                  href={item.href}
                  className="text-[13px] uppercase tracking-[0.18em] whitespace-nowrap text-white/90 hover:text-white"
                >
                  {item.label}
                </Link>
                {item.dropdown && openKey === item.label && (
                  <div className="absolute left-1/2 z-50 mt-3 -translate-x-1/2 rounded-xl border border-white/10 bg-black/70 backdrop-blur">
                    <ul className="p-2 whitespace-nowrap">
                      {item.dropdown.map((d) => (
                        <li key={d.href}>
                          <Link
                            href={d.href}
                            className="block rounded-lg px-3 py-2 text-[12px] text-white/90 hover:bg-white/10 hover:text-white"
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CENTER LOGO */}
          <div className="flex justify-center">
            <Link href="/">
              <img
                src="/sight_only.png"
                alt="LandCommand.ai"
                style={{ transform: `scale(${logoScale})` }}
                className="h-16 w-auto md:h-20 lg:h-24 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-start gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {RIGHT_MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] uppercase tracking-[0.18em] whitespace-nowrap text-white/90 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <button
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-black/30 text-white/90 hover:bg-white/10"
            >
              <span className="block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
