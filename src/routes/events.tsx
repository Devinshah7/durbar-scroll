import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Pillars } from "@/components/Pillars";
import { Stats } from "@/components/Stats";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Gallery } from "@/components/Gallery";
import { VideoReel } from "@/components/VideoReel";
import { AnimalCaravan } from "@/components/AnimalCaravan";
import { AboutExpanded } from "@/components/AboutExpanded";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { BlogPreview } from "@/components/BlogPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingSocial } from "@/components/FloatingSocial";
import { ComingSoonModal } from "@/components/ComingSoonModal";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "Events — The Majestic Bharat" },
      {
        name: "description",
        content:
          "India's premium experiential partner. 350+ events across 11 countries. MICE, sports, weddings, and celebrity concerts since 2015.",
      },
      { property: "og:title", content: "Events — The Majestic Bharat" },
      {
        property: "og:description",
        content: "A blend of culture through events & tourism. India's most trusted experiential partner.",
      },
    ],
  }),
});

function EventsPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonPillar, setComingSoonPillar] = useState("Tourism");

  const alreadyPlayed = typeof window !== "undefined" && sessionStorage.getItem("eventsIntroPlayed") === "true";

  useEffect(() => {
    if (alreadyPlayed) {
      // Skip animation, hide overlay immediately
      if (overlayRef.current) overlayRef.current.style.display = "none";
      return;
    }
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
          sessionStorage.setItem("eventsIntroPlayed", "true");
        }}
      );
    }
  }, []);

  const openComingSoon = (pillar: string) => {
    setComingSoonPillar(pillar);
    setComingSoonOpen(true);
  };

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[10000]"
        style={{
          background: "radial-gradient(circle at center, rgba(208,100,24,0.8) 0%, rgba(220,160,40,0.5) 40%, var(--section-dark) 80%)",
        }}
      />
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />
      <FloatingSocial />
      <Navigation logoReveal={!alreadyPlayed} onComingSoon={openComingSoon} />
      <main>
        <Hero />
        <Philosophy />
        <AboutExpanded />
        <Pillars />
        <Stats />
        <WhyChooseUs />
        <Gallery />
        <VideoReel />
        <AnimalCaravan />
        <Team />
        <Process />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
      <ComingSoonModal
        open={comingSoonOpen}
        pillarName={comingSoonPillar}
        onClose={() => setComingSoonOpen(false)}
      />
    </>
  );
}
