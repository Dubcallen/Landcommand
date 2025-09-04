import React from "react";
import { notFound } from "next/navigation";
import { getListingBySlug, type Listing } from "../../../lib/listings";

type PageProps = { params: { slug: string } };

export default function ListingDetailPage({ params }: PageProps) {
  const l: Listing | undefined = getListingBySlug(params.slug);
  if (!l) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{l.title}</h1>
        <p className="text-neutral-600">
          {l.acreage.toLocaleString()} acres • {l.state}
          {l.county ? `, ${l.county}` : ""} {l.market ? `• ${l.market}` : ""}
        </p>
      </header>

      <section className="grid gap-4">
        {l.heroPhoto && (
          // Using plain <img> so this compiles even without next/image config
          <img
            src={l.heroPhoto}
            alt={l.title}
            className="w-full rounded-2xl border"
          />
        )}

        {l.photos?.length ? (
          <div className="grid grid-cols-2 gap-4">
            {l.photos.slice(0, 4).map((p, i) => (
              <img key={i} src={p} alt="" className="w-full rounded-xl border" />
            ))}
          </div>
        ) : null}
      </section>

      <section className="grid gap-2">
        {l.description && <p className="text-neutral-700">{l.description}</p>}
        <ul className="grid grid-cols-2 gap-x-8 text-sm">
          <li>
            <span className="font-medium">Status:</span> {l.status}
          </li>
          <li>
            <span className="font-medium">APN:</span> {l.apn ?? "—"}
          </li>
          <li>
            <span className="font-medium">Zoning:</span> {l.zoning ?? "—"}
          </li>
          <li>
            <span className="font-medium">Road Access:</span>{" "}
            {l.roadAccess ?? "—"}
          </li>
        </ul>
      </section>
    </main>
  );
}
