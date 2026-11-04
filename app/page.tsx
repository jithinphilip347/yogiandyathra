import { Suspense } from "react";
import HomeHero from "@/components/home/homehero/HomeHero";
import HomeUpdate from "@/components/home/homeupdate/HomeUpdate";
import HomeProduct from "@/components/home/homeproduct/HomeProduct";
import HomeCourse from "@/components/home/homecourse/HomeCourse";
import HomeAbout from "@/components/home/homeabout/HomeAbout";
import HomeTestimonial from "@/components/home/hometestimonial/HomeTestimonial";
import HomeFaq from "@/components/home/homefaq/HomeFaq";
import HomeBlog from "@/components/home/homeblog/HomeBlog";
import HomeNewsletter from "@/components/home/homenewsletter/HomeNewsletter";

export default function Home() {
  return (
    <main>
      {/* 1. Grand Hero Entrance: Dual slide banner for Yogi & Yathra and Yogify */}
      <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
        <HomeHero />
      </Suspense>

      {/* 2. Highlights & Promo: Flash sale & latest live workshop */}
      <HomeUpdate />

      {/* 3. Sacred Store Featured Products: 4-item grid with ProductBox */}
      <HomeProduct />

      {/* 4. Workshops & Masterclasses: 4-item grid with ClassBox */}
      <HomeCourse />

      {/* 5. Philosophy & Lineage: Vedic heritage, 3 core pillars, stats */}
      <HomeAbout />

      {/* 6. Voices of Sangha: Practitioner & seeker verified testimonials (commented out as requested) */}
      {/* <HomeTestimonial /> */}

      {/* 7. Frequently Asked Questions: Interactive accordion */}
      <HomeFaq />

      {/* 8. Wisdom Journal: Ancient teachings & mindful perspectives */}
      <HomeBlog />

      {/* 9. Mindful Circular: Join the Sangha newsletter */}
      <HomeNewsletter />
    </main>
  );
}
