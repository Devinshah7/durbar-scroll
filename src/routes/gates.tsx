import { createFileRoute } from "@tanstack/react-router";
import { GatesPage } from "@/components/Gates";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/gates")({
  component: GatesRoute,
  head: () => ({
    meta: [
      { title: "Choose Your Journey — The Majestic Bharat" },
      { name: "description", content: "Three sacred gates. Three realms of Bharat. One unforgettable path." },
      { property: "og:title", content: "Choose Your Journey — The Majestic Bharat" },
      { property: "og:description", content: "Events, Celebrity, Tourism — enter the gate that calls to you." },
    ],
  }),
});

function GatesRoute() {
  return (
    <>
      <CustomCursor />
      <GatesPage />
    </>
  );
}
