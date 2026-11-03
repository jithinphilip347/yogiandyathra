
import { Suspense } from "react";
import HomeHero from "@/components/home/homehero/HomeHero";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
        <HomeHero />
      </Suspense>
    </main>
  );
}
