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
import { catalogueStore } from "@/lib/catalogueStore";

export const revalidate = 300;

export default async function Home() {
  const [productResult, courseResult] = await Promise.allSettled([
    catalogueStore.featuredProducts(),
    catalogueStore.featuredCourses(),
  ]);
  const products = productResult.status === "fulfilled" ? productResult.value : [];
  const courses = courseResult.status === "fulfilled" ? courseResult.value : [];

  if (productResult.status === "rejected") {
    console.error("Unable to load featured YogiYatra products", productResult.reason);
  }
  if (courseResult.status === "rejected") {
    console.error("Unable to load featured Yogify courses", courseResult.reason);
  }

  return (
    <main>
      {/* 1. Grand Hero Entrance: Dual slide banner for Yogi & Yathra and Yogify */}
      <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
        <HomeHero featuredProducts={products} featuredCourses={courses} />
      </Suspense>

      {/* 2. Highlights & Promo: Flash sale & latest live workshop */}
      <HomeUpdate />

      {/* 3. Sacred Store Featured Products: 4-item grid with ProductBox */}
      <HomeProduct products={products.slice(0, 4)} hasLoadError={productResult.status === "rejected"} />

      {/* 4. Workshops & Masterclasses: 4-item grid with ClassBox */}
      <HomeCourse
        courses={courses}
        hasLoadError={courseResult.status === "rejected"}
        catalogueHref={`${(process.env.YOGIFY_WORKSHOP_URL || "https://yogify.com").replace(/\/+$/, "")}/courses`}
      />

      {/* 5. Philosophy & Lineage: Vedic heritage, 3 core pillars, stats */}
      <HomeAbout />

      {/* 6. Voices of Sangha: Practitioner & seeker verified testimonials (commented out as requested) */}
      {/* <HomeTestimonial /> */}

      {/* 7. Frequently Asked Questions: Interactive accordion */}
      <HomeFaq />

      {/* 8. Wisdom Journal: Ancient teachings & mindful perspectives (commented out as requested) */}
      {/* <HomeBlog /> */}

      {/* 9. Mindful Circular: Join the Sangha newsletter */}
      <HomeNewsletter />
    </main>
  );
}
