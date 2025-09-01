"use client";

import React from "react";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">LandCommand.ai</h1>
        <p className="text-neutral-600">
          AI-powered land marketing and builder partnerships.
        </p>
      </section>

      <section className="rounded-xl border p-6 space-y-2">
        <h2 className="text-2xl font-semibold">Get started</h2>
        <ul className="list-disc pl-6 space-y-1 text-neutral-700">
          <li><a className="underline" href="/listings">Browse Listings</a></li>
          <li>Try the parser on <a className="underline" href="/buy">/buy</a></li>
          <li>Add your data in <code className="font-mono">lib/listings.ts</code></li>
        </ul>
      </section>
    </main>
  );
}
