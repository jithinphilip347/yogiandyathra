"use client";

import React from "react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import ProductBox, { ProductBoxProps, ProductBoxSkeleton } from "@/components/boxes/productbox/ProductBox";
import { sectionFadeIn, staggerContainer, itemFadeUp } from "@/components/ui/animation/motionVariants";
import styles from "./HomeProduct.module.scss";

export interface ProductItem extends ProductBoxProps {
  id: string;
}

const defaultProducts: ProductItem[] = [
  {
    id: "prod-1",
    title: "5-Mukhi Sacred Rudraksha Mala",
    category: "Sacred Malas",
    price: "₹1,299",
    originalPrice: "₹1,899",
    discountBadge: "30% OFF",
    rating: 5,
    reviewsCount: 142,
    image: "/images/banner/banner-1.webp",
    badge: "Bestseller",
    href: "/product/rudraksha-mala",
  },
  {
    id: "prod-2",
    title: "Gold-Accented Rudraksha Bracelet",
    category: "Spiritual Adornment",
    price: "₹999",
    originalPrice: "₹1,499",
    discountBadge: "33% OFF",
    rating: 5,
    reviewsCount: 96,
    image: "/images/products/rudraksha-bracelet.jpg",
    badge: "Consecrated",
    href: "/product/gold-rudraksha-bracelet",
  },
  {
    id: "prod-3",
    title: "Pure Hammered Copper Tamra Carafe",
    category: "Ayurvedic Living",
    price: "₹1,599",
    originalPrice: "₹2,299",
    discountBadge: "30% OFF",
    rating: 5,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80",
    badge: "Handmade",
    href: "/product/copper-tamra-carafe",
  },
  {
    id: "prod-4",
    title: "Consecrated Sri Yantra Meditation Plate",
    category: "Sacred Yantras",
    price: "₹1,899",
    originalPrice: "₹2,599",
    discountBadge: "25% OFF",
    rating: 5,
    reviewsCount: 114,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    badge: "Energized",
    href: "/product/sri-yantra-plate",
  },
];

export interface HomeProductProps {
  eyebrow?: string;
  title?: string;
  hookWord?: string;
  description?: string;
  products?: ProductItem[];
  isLoading?: boolean;
}

export default function HomeProduct({
  eyebrow = "YOGI & YATHRA SACRED COLLECTION",
  title = "Sacred Spiritual Essentials for *Mindful* Living",
  hookWord = "Mindful",
  description = "Consecrated Himalayan rudraksha beads, pure hammered copper vessels, and handcrafted meditation aids designed to anchor your daily practice.",
  products = defaultProducts,
  isLoading = false,
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
              href: "/product",
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
            : products.map((item) => (
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

