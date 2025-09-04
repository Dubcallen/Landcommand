// app/page.tsx

export default function HomePage() {
  return (
    <main className="px-6 py-12 max-w-5xl mx-auto">
      <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-wide">
        Welcome to Land Command
      </h1>

      <p className="mt-4 text-neutral-300">
        Natural-language land search, topo context, and fast investor tools.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-heading text-xl font-semibold">AI Search</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Ask in plain English — we convert to filters automatically.
          </p>
          <a href="/buy" className="mt-4 inline-block rounded-lg bg-white text-black px-4 py-2 text-sm font-medium">
            Try it →
          </a>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-heading text-xl font-semibold">Browse Listings</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Explore acreage, access, utilities, and proximity at a glance.
          </p>
          <a href="/listings" className="mt-4 inline-block rounded-lg border border-white/70 px-4 py-2 text-sm hover:bg-white/10">
            View listings
          </a>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-heading text-xl font-semibold">Work With Us</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Marketing for land sellers and builder partnerships.
          </p>
          <a href="/contact" className="mt-4 inline-block rounded-lg border border-white/70 px-4 py-2 text-sm hover:bg-white/10">
            Contact
          </a>
        </div>
      </section>
    </main>
  );
}
