export const metadata = {
  title: "Services | Land Command",
};

const items = [
  {
    slug: "listing-fees",
    title: "Flat Listing Fees",
    blurb: "Professional, fixed-fee listing service for land sellers.",
    price: "From $800",
  },
  {
    slug: "reels",
    title: "Reels (Short Films)",
    blurb: "Cinematic property reels for premium marketing.",
    price: "$5,000 package",
  },
  {
    slug: "stories",
    title: "Stories (Editorial Features)",
    blurb: "Long-form, magazine-quality storytelling for legacy properties.",
    price: "$20,000 package",
  },
  {
    slug: "brokerage",
    title: "Brokerage (10%)",
    blurb: "Full-service representation for land transactions.",
    price: "10% commission",
  },
  {
    slug: "flipping",
    title: "Flipping Land",
    blurb: "Selective acquisitions to improve and resell parcels.",
    price: "Target: $15,000 / flip",
  },
  {
    slug: "seller-financing",
    title: "Seller Financing",
    blurb: "Attractive terms to widen the buyer pool.",
    price: "$500/mo example",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
          <h1 className="font-display text-4xl md:text-5xl font-semibold">Services</h1>
          <p className="mt-3 max-w-3xl text-white/80">
            Six revenue streams that power Land Command—built to serve sellers, delight buyers,
            and grow long-term value.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <a
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:bg-black/55 transition"
            >
              <div className="aspect-[4/3] bg-neutral-800/60 grid place-items-center text-neutral-400">
                {/* Placeholder; swap for service-specific image */}
                <span>{s.title}</span>
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">{s.price}</div>
                <h3 className="mt-1 text-xl font-serif font-semibold">{s.title}</h3>
                <p className="mt-1 text-white/75">{s.blurb}</p>
                <span className="mt-3 inline-block text-sm text-white/90 group-hover:text-white">
                  Learn more →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
