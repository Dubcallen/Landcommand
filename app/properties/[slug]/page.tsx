type Params = { params: { slug: string } };

export default function PropertyDetail({ params }: Params) {
  const { slug } = params;

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      {/* Hero banner */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/listing-hero.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="inline-flex rounded-full border border-white/20 bg-black/30 px-5 py-1.5 backdrop-blur">
            <span className="text-[12px] uppercase tracking-[0.24em] text-white/90">Available</span>
          </div>
          <h1 className="mt-4 text-4xl font-serif font-semibold">{slug.replaceAll("-", " ")}</h1>
          <p className="mt-2 text-white/80">1,000 acres • Somewhere, TN</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
        {/* Gallery */}
        <div className="md:col-span-2 space-y-4">
          <div className="aspect-[16/9] rounded-2xl border border-white/10 bg-neutral-800 grid place-items-center text-neutral-500">
            Hero Image / Reel
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg border border-white/10 bg-neutral-800" />
            ))}
          </div>

          <div className="prose prose-invert mt-4 max-w-none">
            <h2>About this property</h2>
            <p>
              Replace with a detailed narrative. Emphasize water features, soils, habitat, improvements, and access.
            </p>
            <h3>Highlights</h3>
            <ul>
              <li>Year-round water</li>
              <li>Improved pasture & fencing</li>
              <li>Timbered hills & wildlife corridors</li>
            </ul>
          </div>
        </div>

        {/* Side rail (CTAs / financing / docs) */}
        <aside className="md:col-span-1 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur">
            <div className="text-sm text-white/70">Offered at</div>
            <div className="text-3xl font-serif font-semibold">$2,450,000</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/30 px-2 py-0.5 text-xs">Financing Available</span>
              <span className="rounded-full border border-white/30 px-2 py-0.5 text-xs">Exclusive</span>
            </div>
            <a
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-md border px-5 py-2.5 font-medium"
              style={{ borderColor: "rgba(203,178,106,0.75)", backgroundColor: "rgba(203,178,106,0.9)", color: "#1B1B1B" }}
            >
              Schedule a Call
            </a>
            <a
              href="/financing"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border px-5 py-2.5 text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.08)]"
              style={{ borderColor: "rgba(239,236,224,0.6)" }}
            >
              Finance this Property
            </a>
            <a
              href="/contact"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-white/20 px-5 py-2.5 text-white/90 hover:bg-white/10"
            >
              Request Docs
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur">
            <h3 className="text-lg font-semibold">Location</h3>
            <div className="mt-3 aspect-[4/3] rounded-lg border border-white/10 bg-neutral-800 grid place-items-center text-neutral-500">
              Map Placeholder
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
