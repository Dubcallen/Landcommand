// OLD (breaks):
// import { listings } from "@/lib/listings";

// NEW (works):
import { listings } from "../../../lib/listings";
import { notFound } from "next/navigation";

export default function ListingPage({ params }: { params: { id: string } }) {
  const l = listings.find((x) => x.id === params.id);
  if (!l) return notFound();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="aspect-[16/9] bg-neutral-100">
          <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-5">
          <h1 className="text-2xl font-bold">{l.title}</h1>
          <div className="text-neutral-600">
            {l.acreage} ac • {l.county}, {l.state} • APN {l.apn}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {l.features.map((f) => (
              <span key={f} className="inline-block border rounded-full px-2 py-0.5 text-xs">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
      <aside className="rounded-2xl border bg-white shadow-sm p-6 space-y-4">
        <div className="text-3xl font-extrabold">
          ${Intl.NumberFormat().format(l.price)}
        </div>
        <a href="/#packages" className="w-full inline-flex justify-center rounded-xl px-4 py-2 bg-black text-white">
          Market a Similar Property
        </a>
        <p className="text-xs text-neutral-500">
          Info deemed reliable but not guaranteed. Verify with applicable county & agencies.
        </p>
      </aside>
    </section>
  );
}
