"use client";

import { useState } from "react";

export default function AiSearch() {
  const [q, setQ] = useState("");

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md p-5 shadow-lg">
        <label className="block text-sm text-neutral-300 mb-2">
          Ask Land AI
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire to your AI endpoint
            alert(`Searching for: ${q}`);
          }}
          className="flex gap-3"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="example: 5–10 acres near Prescott with water & road access"
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="rounded-xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 active:opacity-80"
          >
            Search
          </button>
        </form>
        <p className="mt-2 text-xs text-neutral-400">
          Natural language → smart filters. Try “ranch land 1 hour from Flagstaff”.
        </p>
      </div>
    </div>
  );
}
