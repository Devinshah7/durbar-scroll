import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useCallback } from "react";
import { ClientOnly } from "@/components/ClientOnly";
import logoSrc from "@/assets/brand/majestic-bharat-logo.png";

const CinematicLoaderLazy = lazy(() =>
  import("@/components/loader/CinematicLoader")
);

export const Route = createFileRoute("/")({
  component: LoaderRoute,
  head: () => ({
    meta: [
      { title: "The Majestic Bharat — Where Every Experience Becomes A Sacred Journey" },
      {
        name: "description",
        content: "India's premium experiential partner. Events, Tourism & Cultural Storytelling.",
      },
    ],
  }),
});

function LoaderRoute() {
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    navigate({ to: "/gates" });
  }, [navigate]);

  return (
    <ClientOnly
      fallback={
        <div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ background: "#000" }}>
          <img src={logoSrc} alt="The Majestic Bharat" style={{ height: 100, width: "auto" }} />
        </div>
      }
    >
      {() => (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ background: "#000" }}>
              <img src={logoSrc} alt="The Majestic Bharat" style={{ height: 100, width: "auto" }} />
            </div>
          }
        >
          <CinematicLoaderLazy onComplete={handleComplete} />
        </Suspense>
      )}
    </ClientOnly>
  );
}
