"use client";

import Link from "next/link";

const LINKS = [
  { href: "/listings", label: "Listings" },
  { href: "/buy", label: "Buy" },
  { href: "/regions", label: "Regions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-linen/10 bg-brand-charcoal/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sight_only.png"   // 👈 directly from /public
            alt="LandCommand.ai"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.24em] text-brand-linen/80 hover:text-brand-linen"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
