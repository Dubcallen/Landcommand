"use client";

import React, { useMemo, useState } from "react";

// From app/buy → app/components
import AiSearch from "../components/AiSearch";
import HeroVideo from "../components/HeroVideo";

// From app/buy → root/lib
import { getAllListings } from "../../lib/listings";
import type { Listing } from "../../lib/types";

type Filters = {
  state?: string;
  county?: string;
  market?: string;
  status?: "Available" | "Under Contract" | "Sold";
  minAcreage?: number;
  maxAcreage?: number;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
};

export default function BuyPage() {
  const [filters, setFilters] = useState<Filters>({});

  const listings: Listing[] = useMemo(() => {
    try {
      return getAllListings(); // if async, convert this page to a Server Component
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
        {/* TODO: wire filters into AiSearch and apply to listings */}
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
