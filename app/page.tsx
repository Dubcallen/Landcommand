"use client";

import React from "react";
import Hero from "./components/hero"; // 👈 lowercase import
import { getAllListings, type Listing } from "../lib/listings";

export default function HomePage() {
  const listings: Listing[] = getAllListings();
  const featured = listings.slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      {/* Hero section */}
      <Hero imageSrc="/branding/hero.jpg" />

      {/* Featured listings */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-brand-linen">Featured Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <a
              key={l.id}
              href={`/listings/${l.slug}`}
              className="block overflow-hidden rounded-2xl border border-brand-linen/20 bg-[#2A2A2A] hover:shadow-md transition"
            >
              <div className="aspect-[4/3] w-full bg-neutral-800 grid place-items-center text-neutral-500">
                <span>{l.heroPhoto ? "Hero Image" : "Image Placeholder"}</span>
              </div>
              <div className="p-4 text-brand-linen">
                <h3 className="text-lg font-semibold">{l.title}</h3>
                <p className="mt-1 text-sm">
                  {l.acreage.toLocaleString()} acres • {l.state}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Private Listings lead capture */}
      <section
        id="private"
        className="rounded-2xl border border-brand-linen/20 bg-[#2A2A2A] p-6 md:p-10"
      >
        <h2 className="text-2xl font-semibold text-brand-linen">Private Listings</h2>
        <p className="mt-2 max-w-2xl text-brand-linen/80">
          Gain insider access to off-market opportunities before they hit the public market.
        </p>
        <form className="mt-4 flex max-w-xl gap-3">
          <input
            placeholder="Your email"
            className="flex-1 rounded-xl border border-brand-linen/40 bg-brand-charcoal px-3 py-2 text-brand-linen placeholder-brand-linen/50 outline-none"
          />
          <button className="btn btn--outline">Request Access</button>
        </form>
        <p className="mt-2 text-xs text-brand-linen/60">
          We respect privacy. Unsubscribe anytime.
        </p>
      </section>
    </main>
  );
}

