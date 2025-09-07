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
    label: "ABOUT LAND COMMAND",
    dropdown: [
      { href: "/about/firm", label: "Our Firm" },
      { href: "/about/process", label: "Our Process" },
      { href: "/about/press", label: "Press" },
      { href: "/about/stories", label: "Stories" },
    ],
  },
  {
    href: "/properties",
    label: "PROPERTIES",
    dropdown: [
      { href: "/properties/available", label: "Available" },
      { href: "/properties/under-contract", label: "Under Contract" },
      { href: "/properties/sold", label: "Sold" },
      { href: "/sell", label: "List Your Property" },
    ],
  },
];

const RIGHT_MENU: MenuItem[] = [
  { href: "/search", label: "SEARCH FOR LAND" },
  { href: "/short-films", label: "SHORT FILMS" },
];

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function Nav() {
  // delayed scroll / inertia like Covey Rise
  const [progress, setProgress] = useState(0);
  const [dragY, setDragY] = useState(0);
  const target = useRef(0);
  const cur = useRef(0);
  const vel = useRef(0);
  const raf = useRef<number | null>(null);

  const STIFF = 0.02;
  const DAMP = 0.1;
  const MAX = 200;
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

  const blur = 12 * progress;
  const tint = 0.4 * progress;
  const border = 0.12 * progress;
  const shadow = 0.32 * progress;

  const [openKey, setOpenKey] = useState<string | null>(null);
  const timers = useRef<Record<string, any>>({});
  const openDelayed = (k: string) => {
    clearTimeout(timers.current[k]);
    timers.current[k] = setTimeout(() => setOpenKey(k), 90);
  };
  const closeDelayed = (k: string) => {
    clearTimeout(timers.current[k]);
    timers.current[k] = setTimeout(() => {
      if (openKey === k) setOpenKey(null);
    }, 120);
  };

  const Caret = ({ open }: { open?: boolean }) => (
    <span
      className={`ml-2 inline-block transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      ▾
    </span>
  );

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div
        className="mx-auto w-full max-w-[1200px] px-8 transition-[transform,background-color,backdrop-filter] duration-300"
        style={{
          pointerEvents: "auto",
          transform: `translateY(${dragY}px)`,
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(0,0,0,${tint})`,
          boxShadow: `0 8px 24px rgba(0,0,0,${shadow})`,
          borderBottom: `1px solid rgba(255,255,255,${border})`,
        }}
      >
        {/* two columns with an empty center gap effect via justify-end/start */}
        <div className="grid grid-cols-2 items-center py-6">
          {/* LEFT group (aligned to right edge of column, near center) */}
          <nav className="flex items-center justify-end gap-12">
            {LEFT_MENU.map((m) => {
              const isOpen = openKey === m.label;
              const hasDrop = !!m.dropdown;
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => hasDrop && openDelayed(m.label)}
                  onMouseLeave={() => hasDrop && closeDelayed(m.label)}
                >
                  <Link
                    href={m.href}
                    className="relative text-[13px] uppercase tracking-[0.16em] text-white/90 hover:text-white"
                  >
                    {m.label}
                    {hasDrop && <Caret open={isOpen} />}
                  </Link>
                  {hasDrop && (
                    <div
                      className={`absolute left-1/2 mt-3 -translate-x-1/2 rounded-xl border border-white/10 bg-black/70 backdrop-blur shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-200 ${
                        isOpen
                          ? "pointer-events-auto opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 -translate-y-1"
                      }`}
                    >
                      <ul className="p-2 whitespace-nowrap">
                        {m.dropdown!.map((d) => (
                          <li key={d.href}>
                            <Link
                              href={d.href}
                              className="block rounded-lg px-4 py-2 text-[12px] text-white/90 hover:bg-white/10 hover:text-white"
                            >
                              {d.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* RIGHT group (aligned to left edge of column, near center) */}
          <nav className="flex items-center justify-start gap-12">
            {RIGHT_MENU.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="relative text-[13px] uppercase tracking-[0.16em] text-white/90 hover:text-white"
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
