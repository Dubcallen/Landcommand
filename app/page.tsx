"use client";

import React from "react";
import Hero from "./components/hero";
import ListingCard from "./components/listing-card";
import { getAllListings, type Listing } from "../lib/listings";

const STATES = ["Arizona","Colorado","Florida","Georgia","Idaho","Montana","New Mexico","North Carolina","Tennessee","Texas","Utah","Wyoming"];

export default function HomePage() {
  const listings: Listing[] = getAllListings();
  const featured = listings.slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 space-y-12">
      {/* Hero */}
      <Hero imageSrc="/hero.jpg" />

      {/* Short Films (placeholder thumbnails) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-linen">Short Films</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="aspect-video w-full overflow-hidden rounded-2xl border border-brand-linen/15 bg-[#2A2A2A] grid place-items-center text-brand-linen/60">
              Video Placeholder
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-linen">Featured Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard
              key={l.id}
              slug={l.slug}
              title={l.title}
              acreage={l.acreage}
              state={l.state}
              county={l.county}
              price={l.price}
              status={l.status}
              hero={l.heroPhoto ?? null}
            />
          ))}
        </div>
      </section>

      {/* Private Listings CTA */}
      <section id="private" className="rounded-2xl border border-brand-linen/15 bg-[#2A2A2A] p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-brand-linen">Private Listings</h2>
        <p className="mt-2 max-w-2xl text-brand-linen/80">
          Gain insider access to off-market opportunities before they hit the public market.
        </p>
        <form className="mt-4 flex max-w-xl gap-3">
          <input
            placeholder="Your email"
            className="flex-1 rounded-xl border border-brand-linen/30 bg-brand-charcoal px-3 py-2 text-brand-linen placeholder-brand-linen/50 outline-none"
          />
          <button className="inline-flex items-center rounded-xl border border-brand-linen/70 bg-white/0 px-4 py-2 font-medium text-brand-linen hover:bg-white/10">
            Request Access
          </button>
        </form>
        <p className="mt-2 text-xs text-brand-linen/60">We respect privacy. Unsubscribe anytime.</p>
      </section>

      {/* LANDiO-style: Search by State */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-linen">Search by State</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {STATES.map((s) => (
            <a key={s} href={`/states/${s.toLowerCase()}`} className="rounded-xl border border-brand-linen/15 bg-[#2A2A2A] px-3 py-2 text-sm text-brand-linen hover:shadow-md">
              {s}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
