import { FadeUp } from "@/lib/reveal";
import { Link } from "@tanstack/react-router";

const BLOGS = [
  {
    slug: "soul-of-atithi-devo-bhava",
    title: "The Soul of Atithi Devo Bhava",
    excerpt: "Why hospitality is India's true superpower — and how TMB brings it to every event.",
    category: "CULTURE",
    date: "April 18, 2025",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=340&fit=crop",
  },
  {
    slug: "behind-the-curtain-20000-guest-spectacle",
    title: "Behind the Curtain: Curating a 20,000-Guest Spectacle",
    excerpt: "Lessons from the Reliance JUST DANCE event — logistics, artistry, and adrenaline.",
    category: "EVENTS",
    date: "March 5, 2025",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=340&fit=crop",
  },
  {
    slug: "from-mumbai-to-madrid",
    title: "From Mumbai to Madrid",
    excerpt: "How TMB exports India's warmth across 11 countries — one experience at a time.",
    category: "TRAVEL",
    date: "February 12, 2025",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=340&fit=crop",
  },
];

export { BLOGS };

export function BlogPreview() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, var(--section-maroon) 0%, var(--section-warm-dark) 30%, var(--section-warm-dark) 100%)" }}>
      <div className="relative mx-auto max-w-[1300px] px-6 md:px-10">
        <FadeUp className="mb-14 text-center">
          <p className="eyebrow mb-4">Stories from the Soul of India</p>
          <h2 className="section-heading font-serif-display" style={{ color: "var(--color-ivory)" }}>
            Journal & Journeys
          </h2>
          <div className="gold-underline mx-auto mt-4" />
          <p className="mx-auto mt-5 max-w-lg font-display italic text-[18px]" style={{ color: "var(--color-gold)" }}>
            Notes from a culture in motion.
          </p>
        </FadeUp>

        <div className="grid gap-7 md:grid-cols-3">
          {BLOGS.map((blog) => (
            <FadeUp key={blog.slug}>
              <article
                className="group overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: "var(--section-warm-dark)", border: "1px solid rgba(200,150,12,0.2)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,150,12,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,150,12,0.2)"; }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--section-warm-dark), transparent 50%)" }} />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: "var(--color-gold)" }}>
                    {blog.category}
                  </span>
                  <h3 className="mt-2 font-serif-display text-[20px] leading-tight line-clamp-2" style={{ color: "var(--color-ivory)" }}>
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] line-clamp-2" style={{ color: "rgba(253,246,227,0.6)" }}>
                    {blog.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[12px]" style={{ color: "rgba(253,246,227,0.4)" }}>{blog.date}</span>
                    <span className="text-[13px] font-semibold" style={{ color: "var(--color-gold)" }}>Read More →</span>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-12 text-center">
          <Link to="/blogs" className="btn-outline-gold rounded-full !py-3 !px-8 !text-[12px]">
            Explore the Journal →
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
