import React from "react";
import { listings } from "@/lib/listings"; // or "../lib/listings" if you don't use @ alias

function slugify(s: string) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ListingsPage() {
  const data = listings as any[]; // keep loose until your Listing includes `slug`

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <header>
        <h1 cla
