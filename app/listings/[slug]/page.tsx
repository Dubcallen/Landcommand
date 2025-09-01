import React from "react";
import { notFound } from "next/navigation";
import { listings } from "@/lib/listings"; // or "../lib/listings" if you’re not using @ alias

function slugify(s: string) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ListingDetail({ params }: { params: { slug: string } }) {
  const data = listings as any[]; // keep loose until your Listing type includes 'slug'
  const listing =
    data.find((l) => l?.slug === params.slug) ??
    data.find((l) => slugify(l?.title) === params.slug);

  if (!listing) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <a href="/listings" className="text-sm underline">
        ← Back to listings
      </a>

      <h1 className="text-3xl font-bold">
        {listing.title ?? "Untitled Listing"}
      </h1>

      <div className="text-neutral-600">
        {listing.market ?? ""}
        {listing.county ? ` • ${listing.county} County` : ""}
        {listing.acreage ? ` • ${listing.acreage} acres` : ""}
        {listing.status ? ` • ${listing.status}` : ""}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p>{listing.description ?? "No description provided."}</p>
          {Array.isArray(listing.highlights) && listing.highlights.length > 0 ? (
            <ul className="list-disc pl-6">
              {listing.highlights.map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside className="border rounded-xl p-4 space-y-2">
          <div className="text-sm text-neutral-500">Price</div>
          <div className="text-xl font-semibold">
            {typeof listing.price === "number"
              ? `$${listing.price.toLocaleString()}`
              : "Call"}
          </div>

          {listing.broker?.name && (
            <div className="pt-4 text-sm">
              <div className="font-medium">Broker</div>
              <div>{listing.broker.name}</div>
              {listing.broker.email && (
                <a className="underline" href={`mailto:${listing.broker.email}`}>
                  {listing.broker.email}
                </a>
              )}
              {listing.broker.phone && <div>{listing.broker.phone}</div>}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
