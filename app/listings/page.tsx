import React from "react";
import { listings } from "@/lib/listings"; // or "../lib/listings" if you don’t use the @ alias

function slugify(s: string) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ListingsPage() {
  const data = listings as any[]; // tolerant until your Listing type includes `slug`

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Listings</h1>
        <p className="text-neutral-600">
          Seeded data from <code className="font-mono">lib/listings.ts</code>.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((l, i) => {
          const safeSlug = slugify(l?.title ?? `listing-${i}`);
          return (
            <li key={i} className="border rounded-xl p-4">
              <div className="text-sm text-neutral-500">
                {l?.market ?? ""}
                {l?.county ? ` • ${l.county} County` : ""}
              </div>
              <h2 className="text-xl font-semibold">{l?.title ?? "Untitled Listing"}</h2>
              <div className="text-sm">
                {(l?.acreage ?? "—")} acres • {l?.status ?? "Available"}
              </div>
              {typeof l?.price === "number" ? (
                <div className="font-medium mt-1">${l.price.toLocaleString()}</div>
              ) : (
                <div className="font-medium mt-1">Call for price</div>
              )}
              <a href={`/listings/${safeSlug}`} className="inline-block mt-3 text-sm underline">
                View details
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
