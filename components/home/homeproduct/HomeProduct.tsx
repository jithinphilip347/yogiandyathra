"use client";

import React from "react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import ProductBox, { ProductBoxProps, ProductBoxSkeleton } from "@/components/boxes/productbox/ProductBox";
import EmptyCatalogueState from "@/components/boxes/emptycatalogue/EmptyCatalogueState";
import { PackageSearch } from "lucide-react";
import { sectionFadeIn, staggerContainer, itemFadeUp } from "@/components/ui/animation/motionVariants";
import styles from "./HomeProduct.module.scss";

export interface ProductItem extends ProductBoxProps {
  id: string;
}

export interface HomeProductProps {
  eyebrow?: string;
  title?: string;
  hookWord?: string;
  description?: string;
  products?: ProductItem[];
  isLoading?: boolean;
  hasLoadError?: boolean;
}

export default function HomeProduct({
  eyebrow = "YOGI & YATHRA SACRED COLLECTION",
  title = "Sacred Spiritual Essentials for *Mindful* Living",
  hookWord = "Mindful",
  description = "Consecrated Himalayan rudraksha beads, pure hammered copper vessels, and handcrafted meditation aids designed to anchor your daily practice.",
  products = [],
  isLoading = false,
  hasLoadError = false,
}: HomeProductProps) {
  return (
    <section id="product" className={styles.productSection} aria-label="Featured Sacred Products">
      <div className="container">
        {/* Animated Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionFadeIn}
        >
          <SecHead
            eyebrow={eyebrow}
            title={title}
            hookWord={hookWord}
            description={description}
            align="space-between"
            action={{
              label: "Explore Full Collection",
              href: "https://www.yogiandyathra.com/products",
            }}
          />
        </motion.div>

        {/* 4-Item Responsive Product Grid with Stagger Entrance */}
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ProductBoxSkeleton key={`skeleton-${idx}`} />
              ))
            : products.length === 0 ? (
              <div style={{ gridColumn: "1 / -1" }}>
                <EmptyCatalogueState
                  icon={<PackageSearch size={24} strokeWidth={1.6} />}
                  eyebrow="Yogi & Yathra Store"
                  title={hasLoadError ? "Our collection is taking a moment" : "A new collection is on its way"}
                  description={hasLoadError
                    ? "We could not load the products just now. Please try the store while we reconnect."
                    : "There are no featured products to show at the moment. Visit the store to browse the full collection."}
                  actionLabel="Visit the store"
                  actionHref="https://www.yogiandyathra.com/products"
                />
              </div>
            ) : products.map((item) => (
                <motion.div key={item.id} variants={itemFadeUp} style={{ width: "100%" }}>
                  <ProductBox
                    title={item.title}
                    category={item.category}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    discountBadge={item.discountBadge}
                    rating={item.rating}
                    reviewsCount={item.reviewsCount}
                    image={item.image}
                    badge={item.badge}
                    href={item.href}
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}

