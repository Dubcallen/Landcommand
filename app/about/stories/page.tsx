export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/stories-hero.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <div className="inline-flex rounded-full border border-white/20 bg-black/30 px-5 py-1.5 backdrop-blur">
            <span className="text-[12px] uppercase tracking-[0.24em] text-white/90">Stories</span>
          </div>
          <h1 className="mt-6 text-4xl font-serif font-semibold">Legacy Land, Beautifully Told</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Editorial features crafted to honor place, stewardship, and legacy.
          </p>
          <a
            href="/sell"
            className="mt-6 inline-flex items-center rounded-md border px-6 py-3 font-medium text-[rgba(239,236,224,1)] hover:bg-[rgba(239,236,224,0.08)]"
            style={{ borderColor: "rgba(239,236,224,0.6)" }}
          >
            Commission a Story ($20,000)
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <a
              key={i}
              href={`/stories/story-${i}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <div className="aspect-[4/3] bg-neutral-800 transition group-hover:opacity-90 grid place-items-center text-neutral-500">
                Cover Image
              </div>
              <div className="p-5">
                <h3 className="text-xl font-serif font-semibold">Story Title #{i}</h3>
                <p className="mt-1 text-white/70">A long-form editorial feature.</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
