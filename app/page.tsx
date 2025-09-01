"use client";

import React from "react";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">LandCommand.ai</h1>
        <p className="text-neutral-600">
          AI-powered land marketing and builder partnerships. This is a minimal home page to ensure the app builds cleanly.
        </p>
      </section>

      <section className="rounded-xl border p-6">
        <h2 className="text-2xl font-semibold mb-2">Get started</h2>
        <ul className="list-disc pl-6 space-y-1 text-neutral-700">
          <li>Go to <code className="font-mono">/buy</code> to try the filter/parser UI.</li>
          <li>Wire listings data later via <code className="font-mono">/lib/listings.ts</code> or a CMS.</li>
          <li>Customize the navbar/footer and add routes like <code className="font-mono">/listings</code>, <code className="font-mono">/about</code>, <code className="font-mono">/contact</code>.</li>
        </ul>
      </section>
    </main>
  );
}
