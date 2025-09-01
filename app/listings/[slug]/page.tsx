import React from "react";
import { listings } from "@/lib/listings";
import { notFound } from "next/navigation";

export default function ListingDetail({ params }: { params: { slug: string } }) {
  const listing = listings.find((l) => l.slug === params.slug);
  if (!listing) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <a href="/listings" className="text-sm underline">← Back to listings</a>
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <div className="text-neutral-600">
        {listing.market}{listing.county ? ` • ${listing.county} County` : ""} • {listing.acreage} acres • {listing.status}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p>{listing.description}</p>
          {listing.highlights?.length ? (
            <ul className="list-disc pl-6">
              {listing.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          ) : null}
        </div>
        <aside className="border rounded-xl p-4 space-y-2">
          <div className="text-sm text-neutral-500">Price</div>
          <div className="text-xl font-semibold">
            {typeof listing.price === "number" ? `$${listing.price.toLocaleString()}` : "Call"}
          </div>
          {listing.broker?.name && (
            <div className="pt-4 text-sm">
              <div className="font-medium">Broker</div>
              <div>{listing.broker.name}</div>
              {listing.broker.email && <a className="underline" href={`mailto:${listing.broker.email}`}>{listing.broker.email}</a>}
              {listing.broker.phone && <div>{listing.broker.phone}</div>}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
