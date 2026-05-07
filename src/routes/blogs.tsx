import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BLOGS } from "@/components/BlogPreview";
import { FadeUp } from "@/lib/reveal";
import { FloatingSocial } from "@/components/FloatingSocial";

const CATEGORIES = ["All", "Culture", "Events", "Travel", "Behind the Scenes"];

const ALL_BLOGS = [
  ...BLOGS,
  {
    slug: "designing-the-30th-tt-asian-cup",
    title: "Designing the 30th TT Asian Cup Experience",
    excerpt: "A look inside TMB's biggest sports event — spanning logistics, hospitality, and national pride.",
    category: "EVENTS",
    date: "January 20, 2025",
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba8224c7?w=600&h=340&fit=crop",
  },
  {
    slug: "indian-folk-art-revival",
    title: "Reviving India's Forgotten Folk Arts",
    excerpt: "How TMB weaves traditional art forms into modern corporate experiences.",
    category: "CULTURE",
    date: "December 8, 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop",
  },
  {
    slug: "mice-travel-beyond-boardrooms",
    title: "MICE Travel: Beyond the Boardroom",
    excerpt: "Transforming corporate travel into immersive cultural journeys across India.",
    category: "TRAVEL",
    date: "November 15, 2024",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=340&fit=crop",
  },
];

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
  head: () => ({
    meta: [
      { title: "Stories from the Soul of India — The Majestic Bharat" },
      { name: "description", content: "Journal & Journeys — notes from a culture in motion. Stories about events, culture, and travel by The Majestic Bharat." },
      { property: "og:title", content: "Stories from the Soul of India — The Majestic Bharat" },
      { property: "og:description", content: "Journal & Journeys — notes from a culture in motion." },
    ],
  }),
});

function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? ALL_BLOGS
    : ALL_BLOGS.filter((b) => b.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <CustomCursor />
      <FloatingSocial />
      <Navigation />
      <main>
        <section className="relative overflow-hidden pb-24 pt-36 md:pt-44" style={{ background: "var(--color-ink)" }}>
          <div className="relative mx-auto max-w-[1300px] px-6 md:px-10">
            <FadeUp className="mb-14 text-center">
              <p className="eyebrow mb-4">Journal & Journeys</p>
              <h1 className="font-serif-display" style={{
                color: "var(--color-ivory)",
                fontSize: "clamp(38px, 6vw, 72px)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}>
                Stories from the Soul of India
              </h1>
              <div className="gold-underline mx-auto mt-5" />
            </FadeUp>

            {/* Filter tabs */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] transition-all"
                  style={{
                    background: activeCategory === cat ? "var(--color-gold)" : "transparent",
                    color: activeCategory === cat ? "var(--color-ink)" : "var(--color-gold)",
                    border: "1px solid var(--color-gold)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog grid */}
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((blog) => (
                <article
                  key={blog.slug}
                  className="group overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#1A1A2E", border: "1px solid rgba(200,150,12,0.2)" }}
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
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,46,0.7), transparent 50%)" }} />
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
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
