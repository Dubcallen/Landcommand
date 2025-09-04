"use client";

import React, { useMemo, useState } from "react";

// Make sure we import from *app/components* (not the root components folder)
import AiSearch from "./components/AiSearch";
import HeroVideo from "./components/HeroVideo";

import { getAllListings } from "../lib/listings";
import type { Listing } from "../lib/types";

/** Local Filters type so this page is standalone */
type Filters = {
  state?: string; // e.g., "AZ"
  county?: string; // e.g., "Maricopa"
  market?: string;
  status?: "Available" | "Under Contract" | "Sold";
  minAcreage?: number;
  maxAcreage?: number;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
};

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({});

  // Replace this with a proper async fetch if getAllListings is async
  const listings: Listing[] = useMemo(() => {
    try {
      return getAllListings(); // if async, adjust to Server Component
    } catch {
      return [];
    }
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      <section className="rounded-2xl overflow-hidden">
        <HeroVideo />
      </section>

      <section className="space-y-4">
        <AiSearch />
        {/* TODO: wire filters into your search component and apply to listings */}
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <article key={l.id} className="rounded-2xl border p-4">
            <h3 className="text-lg font-semibold">{l.title}</h3>
            <p className="text-sm text-neutral-600 mt-1">
              {l.acreage.toLocaleString()} acres • {l.state}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

