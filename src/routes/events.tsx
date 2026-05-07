import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Pillars } from "@/components/Pillars";
import { Stats } from "@/components/Stats";
import { Gallery } from "@/components/Gallery";
import { VideoReel } from "@/components/VideoReel";
import { ClientLogos } from "@/components/ClientLogos";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Values } from "@/components/Values";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "Events — The Majestic Bharat" },
      {
        name: "description",
        content:
          "India's premium experiential partner. 500+ events. Corporate, MICE travel, celebrity management, and culturally-rooted experiences since 2015.",
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

  useEffect(() => {
    // Reverse gold fade-in transition from gates
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        }}
      );
    }
  }, []);

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[10000]"
        style={{
          background: "radial-gradient(circle at center, rgba(255,215,0,0.9) 0%, rgba(255,140,0,0.6) 40%, #1a0a0a 80%)",
        }}
      />
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />
      <Navigation logoReveal />
      <main>
        <Hero />
        <Philosophy />
        <Pillars />
        <Stats />
        <Gallery />
        <VideoReel />
        <ClientLogos />
        <Team />
        <Process />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
