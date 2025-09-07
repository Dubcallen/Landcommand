const LIST = Array.from({ length: 9 }).map((_, i) => ({
  slug: `property-${i + 1}`,
  title: `Property ${i + 1}`,
  price: 2450000,
  acres: 1000 + i * 20,
  location: "Somewhere, TN",
  financing: i % 3 === 0,
}));

export default function Available() {
  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-serif font-semibold">Available Properties</h1>
        <p className="mt-2 text-white/80">Explore premium land, farm, equestrian, and estate listings.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LIST.map((p) => (
            <a key={p.slug} href={`/properties/${p.slug}`} className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="aspect-[4/3] bg-neutral-800 grid place-items-center text-neutral-500">Image</div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span className="rounded-full border border-white/30 px-2 py-1 text-xs">Available</span>
                </div>
                <p className="mt-1 text-sm">{p.acres.toLocaleString()} acres • {p.location}</p>
                <p className="mt-2 font-medium">${p.price.toLocaleString()}</p>
                {p.financing && (
                  <div className="mt-2 inline-flex rounded-full border border-[rgba(203,178,106,0.6)] px-2 py-0.5 text-xs text-[rgba(203,178,106,0.9)]">
                    Financing Available
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
