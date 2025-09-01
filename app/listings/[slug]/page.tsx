import React from "react";
import { notFound } from "next/navigation";
import { listings } from "@/lib/listings"; // or "../lib/listings" if no alias

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ListingDetail({ params }: { params: { slug: string } }) {
  // Find by explicit slug first; otherwise match by slugified title.
  const data = listings as any[]; // loosen typing to avoid TS errors if your Listing type lacks 'slug'
  const listing =
    data.find((l) => l.slug === params.slug) ??
    data.find((l) => slugify(String(l.title ?? "")) === params.slug);

  if (!listing) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <a href="/listings" className="text-sm underline">← Back to listings</a>
      <h1 className="text-3xl font-bold">{listing.title ?? "Untitled Listing"}</h1>
      <div className="text-neutral-600">
        {listing.market}
        {listing.county ? ` • ${listing.county} County` : ""}
        {listing.acreage ? ` • ${listing.acreage} acres` : ""}
        {listing.status ? ` • ${listing.status}` : ""}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <p>{listing.description ?? "No description provided."}</p>
          {Array.isArray(listing.highlights) &&
