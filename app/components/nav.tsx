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
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        {/* Logo (light version is best for dark hero backgrounds) */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sight_only.png"
            alt="LandCommand.ai"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.24em] text-white hover:text-brand-linen"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
