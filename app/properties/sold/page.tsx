export default function Sold() {
  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-serif font-semibold">Sold Properties</h1>
        <p className="mt-2 text-white/80">A selection of successfully closed land transactions.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="aspect-[4/3] bg-neutral-800 grid place-items-center text-neutral-500">Image</div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Property Sold #{i}</h3>
                  <span className="rounded-full border border-white/30 px-2 py-1 text-xs">Sold</span>
                </div>
                <p className="mt-2 text-sm">Closed successfully.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
