// app/page.tsx
"use client";

import Hero from "@/app/components/hero";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#1B1B1B] text-[#EFECE0]">
      {/* Hero section with video + overlay */}
      <Hero />

      {/* Placeholder for next sections */}
      <section className="w-full max-w-6xl px-6 py-20">
        <h2 className="mb-6 text-2xl font-bold">Short Films</h2>
        <p className="text-[#EFECE0]/80">
          This is where your short films grid or content will go.
        </p>
      </section>
    </main>
  );
}
