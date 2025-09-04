"use client";

import { useState } from "react";

export default function AiSearch() {
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Search:", q); // TODO: wire to real search
      }}
      className="flex gap-2 rounded-2xl border p-3"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search land by state, acreage, APN..."
        className="flex-1 rounded-xl border px-3 py-2 outline-none"
      />
      <button type="submit" className="rounded-xl border px-4 py-2 font-medium">
        Search
      </button>
    </form>
  );
}
