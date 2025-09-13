"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-5">
        <nav className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur">
          {/* Left menu */}
          <div className="flex items-center gap-8 text-[13px] uppercase tracking-[0.18em] text-white/85">
            <Link href="/about" className="hover:text-white">About Land Command</Link>
            <Link href="/properties/available" className="hover:text-white">Properties</Link>
          </div>

          {/* Center logo (hover → doubles size) */}
          <div className="relative h-10 w-10">
            <Link
              href="/"
              className="group block h-full w-full"
              aria-label="Land Command — Home"
            >
              <Image
                src="/sight_only.png"
                alt="Land Command"
                fill
                sizes="40px"
                priority
                className="object-contain transition-transform duration-300 ease-out will-change-transform group-hover:scale-200"
              />
            </Link>
          </div>

          {/* Right menu */}
          <div className="flex items-center gap-8 text-[13px] uppercase tracking-[0.18em] text-white/85">
            <Link href="/search" className="hover:text-white">Search for Land</Link>
            <Link href="/short-films" className="hover:text-white">Short Films</Link>

            {/* Hamburger (kept minimal; matches your existing behavior) */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 hover:bg-white/15"
            >
              <span className="block h-[2px] w-4 bg-white" />
            </button>
          </div>
        </nav>
      </div>

      {/* Simple drawer (unchanged logic; add links as needed) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[320px] border-l border-white/10 bg-[#171717] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif text-xl text-white/90">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-md bg-white/10 px-2 py-1 text-sm hover:bg-white/15"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 text-white/90">
              <Link href="/about" onClick={() => setOpen(false)}>About Land Command</Link>
              <Link href="/properties/available" onClick={() => setOpen(false)}>Properties</Link>
              <Link href="/search" onClick={() => setOpen(false)}>Search for Land</Link>
              <Link href="/short-films" onClick={() => setOpen(false)}>Short Films</Link>
              <hr className="border-white/10 my-2" />
              <Link href="/sell" onClick={() => setOpen(false)} className="text-[rgba(203,178,106,1)]">Sell Your Land</Link>
              <Link href="/properties/available" onClick={() => setOpen(false)}>Buy Land</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

