import React from "react";
import Link from "next/link";
import { getAllListings, type Listing } from "../../lib/listings";

export default function ListingsIndexPage() {
  const listings: Listing[] = getAllListings();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Listings</h1>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <Link
            key={l.id}
            href={`/listings/${l.slug}`}
            className="block rounded-2xl border p-4 hover:shadow-sm transition"
          >
            <h3 className="text-lg font-semibold">{l.title}</h3>
            <p className="text-sm text-neutral-600 mt-1">
              {l.acreage.toLocaleString()} acres • {l.state}
            </p>
            {l.market && (
              <p className="text-sm text-neutral-500">{l.market}</p>
            )}
          </Link>
        ))}
      </section>
    </main>
  );
}
