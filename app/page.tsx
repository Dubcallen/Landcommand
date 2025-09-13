export const metadata = {
  title: "Land Command — America’s Premiere Land Specialists",
  description:
    "Exclusive land, farm, investment, and estate opportunities. List your property, commission short films and stories, and explore financing.",
};

export default function HomePage() {
  return (
    <main className="bg-[#1B1B1B] text-[#EFECE0]">
      {/* HERO */}
      <section className="relative isolate min-h-screen w-full overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Center stack with generous vertical rhythm */}
        <div className="relative z-10 flex flex-col items-center pt-36 md:pt-40 text-center">
          <h1 className="font-serif text-5xl md:text-6xl tracking-[0.04em]">
            LAND COMMAND
          </h1>

          <p className="mt-4 text-lg md:text-xl font-serif text-white/90 uppercase tracking-wide">
            America&apos;s Premiere Land Specialists
          </p>

          <div className="mt-7 inline-flex items-center rounded-full border border-white/20 bg-black/30 px-5 py-2 text-sm uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            LAND &nbsp; | &nbsp; FARM &nbsp; | &nbsp; INVESTMENT &nbsp; | &nbsp; ESTATE
          </div>

          {/* Buy / Sell */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/properties/available"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-sans text-white hover:bg-white/10"
            >
              Buy
            </a>
            <a
              href="/sell"
              className="rounded-xl border border-[rgba(203,178,106,0.75)] bg-[rgba(203,178,106,0.9)] px-6 py-3 text-sm font-sans text-[#1B1B1B] hover:bg-[rgba(203,178,106,1)]"
            >
              Sell
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
      </section>

      {/* Featured Properties (bottom) */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Featured Properties</h2>
          <a href="/properties/available" className="text-sm text-white/80 hover:text-white">
            View All →
          </a>
        </div>

        {/* 3 cards — use your real images in /public. If missing, cards still show. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/tile-1.jpg", title: "Riverbend Ridge", meta: "Lewis County, TN • 92± Acres" },
            { src: "/tile-2.jpg", title: "Cedar Hollow Farm", meta: "Maury County, TN • 48± Acres" },
            { src: "/tile-3.jpg", title: "Timberline Estate", meta: "Williamson County, TN • 26± Acres" },
          ].map((card, i) => (
            <a
              key={i}
              href="/properties/available"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-colors hover:bg-black/55"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
                {/* Only the image scales on hover */}
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                  Exclusive
                </div>
                <h3 className="mt-1 text-xl font-serif font-semibold">{card.title}</h3>
                <p className="mt-1 text-white/75">{card.meta}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
