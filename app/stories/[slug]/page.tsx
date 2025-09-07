type Params = { params: { slug: string } };

export default function StoryDetail({ params }: Params) {
  const { slug } = params;

  return (
    <main className="min-h-screen bg-[#1B1B1B] text-[#EFECE0]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/story-cover.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1B1B1B]" />
        </div>
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h1 className="text-4xl font-serif font-semibold">Story: {slug.replaceAll("-", " ")}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            A premium editorial celebrating legacy land and stewardship.
          </p>
        </div>
      </section>

      <article className="prose prose-invert mx-auto max-w-3xl px-6 py-12 prose-headings:font-serif prose-p:leading-relaxed">
        <p>
          This is the long-form story body. Replace with CMS content. Embed photo essays and reels for a cinematic experience.
        </p>
        <h2>The Land</h2>
        <p>Describe topography, water, soils, wildlife, and history.</p>
        <h2>Stewardship</h2>
        <p>Document improvements, restoration efforts, and conservation.</p>
        <h2>Legacy</h2>
        <p>Frame the property’s arc—past, present, and future.</p>
      </article>
    </main>
  );
}
