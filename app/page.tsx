import React from "react";
import { listings } from "@/lib/listings"; // or "../lib/listings" if you don't use @ alias

function slugify(s: string) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ListingsPage() {
  const data = listings as any[]; // tolerate missing 'slug' in your type/data

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Listings</h1>
        <p className="text-neutral-600">
          Seeded data from <code className="font-mono">lib/listings.ts</code>.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-co


