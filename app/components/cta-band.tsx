"use client";

import Link from "next/link";

const GOLD = "#CBB26A";

export default function CtaBand() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 my-24">
      <div
        className="h-[1px] w-full mb-8"
        style={{ backgroundColor: GOLD, opacity: 0.7 }}
      />
      <div className="rounded-2xl border border-white/10 bg-[rgba(18,18,18,0.65)] p-6 sm:p-8 backdrop-blur">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h3 className="font-serif text-[22px] md:text-[24px] text-[rgba(237,234,224,0.98)]">
            Ready to position your land the way it deserves?
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/properties/available"
              className="rounded-xl border border-white/15 px-4 py-2 text-[14px] uppercase tracking-[0.22em] text-white/90 hover:bg-white/10"
            >
              Exclusive Properties
            </Link>
            <Link
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.5)] bg-[rgba(203,178,106,0.92)] px-4 py-2 text-[14px] font-medium text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)] uppercase tracking-[0.18em]"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
