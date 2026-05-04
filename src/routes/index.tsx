import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Stats } from "@/components/Stats";
import { Gallery } from "@/components/Gallery";
import { VideoReel } from "@/components/VideoReel";
import { ClientLogos } from "@/components/ClientLogos";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Values } from "@/components/Values";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Loader = lazy(() =>
  import("@/components/Loader.client").then((m) => ({ default: m.Loader })),
);
const Pillars = lazy(() =>
  import("@/components/Pillars.client").then((m) => ({ default: m.Pillars })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Majestic Bharat — Events, Tourism & Cultural Storytelling" },
      {
        name: "description",
        content:
          "India's premium experiential partner. 500+ events. Corporate, MICE travel, celebrity management, and culturally-rooted experiences since 2015.",
      },
      { property: "og:title", content: "The Majestic Bharat" },
      {
        property: "og:description",
        content: "A blend of culture through events & tourism. India's most trusted experiential partner.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 z-[10000] bg-black" />}>
        <Loader />
      </Suspense>
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <Suspense fallback={<div className="h-screen bg-[#0a0510]" />}>
          <Pillars />
        </Suspense>
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
