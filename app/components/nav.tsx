"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/**
 * LandCommand Nav (Full)
 * - Centered large logo
 * - Left + right menus with hover dropdowns
 * - Pronounced delayed scroll lag + vertical drag effect
 * - Top-right hamburger opening a side drawer (not full takeover)
 */

// Animated Hamburger Icon (3 lines morph into X)
function AnimatedHamburger({ open }: { open: boolean }) {
  return (
    <motion.svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      role="img"
      className="block"
    >
      <motion.line
        x1="4" y1="7" x2="20" y2="7"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        initial={false}
        animate={open ? { y1: 12, y2: 12, rotate: 45, x1: 6, x2: 18 } : { y1: 7, y2: 7, rotate: 0, x1: 4, x2: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{ originX: 12, originY: 12 }}
      />
      <motion.line
        x1="4" y1="12" x2="20" y2="12"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="4" y1="17" x2="20" y2="17"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round"
        initial={false}
        animate={open ? { y1: 12, y2: 12, rotate: -45, x1: 6, x2: 18 } : { y1: 17, y2: 17, rotate: 0, x1: 4, x2: 20 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{ originX: 12, originY: 12 }}
      />
    </motion.svg>
  );
}

export default function Nav() {
  // --- Scroll lag / vertical drag effect ---
  const { scrollY } = useScroll();
  const lagY = useSpring(scrollY, { stiffness: 60, damping: 18, mass: 0.8 });
  const translateY = useTransform(lagY, [0, 600], [0, -40]);
  const backdropOpacity = useTransform(lagY, [0, 200, 600], [0.1, 0.25, 0.35]);

  const [open, setOpen] = React.useState(false);

  return (
    <motion.nav
      style={{ y: translateY, background: "rgba(12,12,12,0.35)", backdropFilter: "saturate(140%) blur(8px)" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
    >
      {/* translucent underlay intensifies with scroll */}
      <motion.div style={{ opacity: backdropOpacity }} className="absolute inset-0 bg-black" />

      <div className="relative mx-auto grid h-[76px] max-w-[1120px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        {/* Left menu (desktop) */}
        <div className="hidden items-center justify-end md:flex pr-6">
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
              width={180}
              height={56}
              priority
              className="h-14 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
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

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="ml-1 h-10 w-10 rounded-xl p-0 bg-white/10 hover:bg-white/15 ring-1 ring-white/15"
              >
                <AnimatedHamburger open={open} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] sm:w-[380px] p-0 border-l border-white/10 bg-black/70 backdrop-blur-md"
            >
              <SheetHeader className="px-4 py-3 border-b border-white/10">
                <SheetTitle className="flex items-center gap-2">
                  <Image src="/logo.svg" alt="LandCommand" width={120} height={36} className="h-9 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <MobileNav onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

// --- Desktop Menu with hover dropdowns ---
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
            className="inline-flex items-center gap-1 text-[12px] font-semibold tracking-[0.32em] uppercase text-white/90 transition-colors hover:text-white hover:underline underline-offset-[6px] decoration-white/80"
          >
            <span>{item.label}</span>
            {item.children?.length ? (
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            ) : null}
          </Link>

          {item.children?.length ? (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="pointer-events-none absolute left-1/2 top-8 z-50 w-56 -translate-x-1/2 opacity-0 shadow-2xl ring-1 ring-white/10 drop-shadow-xl group-hover:pointer-events-auto group-hover:opacity-100"
            >
              <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-2">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-white/90 transition hover:bg-white/5 hover:text-white"
                  >
                    {child.label}
                    <ChevronRight className="h-4 w-4 opacity:60" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}

// --- Mobile Drawer Content ---
function MobileNav({ onNavigate }: { onNavigate?: () => void }) {
  const groups = [
    {
      title: "Land",
      items: [
        { label: "All Land", href: "/land" },
        { label: "Ranches", href: "/land/ranch" },
        { label: "Large Acreage", href: "/land/acreage" },
      ],
    },
    {
      title: "Farm",
      items: [
        { label: "Irrigated", href: "/farm/irrigated" },
        { label: "Dryland", href: "/farm/dryland" },
        { label: "Investment", href: "/farm/investment" },
      ],
    },
    {
      title: "Equestrian",
      items: [
        { label: "Training Facilities", href: "/equestrian/training" },
        { label: "Luxury Stables", href: "/equestrian/luxury" },
        { label: "Pastures", href: "/equestrian/pastures" },
      ],
    },
    {
      title: "Estate",
      items: [
        { label: "Signature Estates", href: "/estate/signature" },
        { label: "Vineyards", href: "/estate/vineyards" },
        { label: "Waterfront", href: "/estate/waterfront" },
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
