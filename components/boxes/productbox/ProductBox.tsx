"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Skelton from "@/components/ui/skelton/Skelton";
import styles from "./ProductBox.module.scss";

export interface ProductBoxProps {
  id?: string;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  rating?: number;
  reviewsCount?: number;
  image: string;
  imageAlt?: string;
  badge?: string;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

export function ProductBoxSkeleton({ className = "" }: { className?: string }) {
  return (
    <article
      className={`${styles.cardWrapper} ${styles.skeletonCard} ${className}`}
      aria-busy="true"
      aria-label="Loading product details"
    >
      <div className={styles.imageContainer}>
        <Skelton height="100%" borderRadius={10} />
      </div>

      <div className={styles.content}>
        <Skelton width={80} height={10} style={{ marginBottom: 6 }} />
        <Skelton width="90%" height={18} style={{ marginBottom: 8 }} />
        <Skelton width={110} height={12} style={{ marginBottom: 12 }} />

        <div className={styles.footerRow}>
          <Skelton width={90} height={22} />
        </div>
      </div>
    </article>
  );
}

export default function ProductBox({
  title = "5-Mukhi Sacred Rudraksha Mala",
  category = "Sacred Malas",
  price = "₹1,299",
  originalPrice = "₹1,899",
  discountBadge = "30% OFF",
  rating = 5,
  reviewsCount = 142,
  image = "/images/banner/banner-1.webp",
  imageAlt,
  badge = "Bestseller",
  href = "/shop",
  className = "",
  isLoading = false,
}: ProductBoxProps) {
  if (isLoading) {
    return <ProductBoxSkeleton className={className} />;
  }

  return (
    <article className={`${styles.cardWrapper} ${className}`}>
      {/* Top Image Section */}
      <div className={styles.imageContainer}>
        <Link href={href} className={styles.imageLink} aria-label={title}>
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 290px"
            className={styles.productImage}
          />
        </Link>

        {/* Promo / Consecrated Badge */}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>

        <h3 className={styles.title}>
          <Link href={href} className={styles.titleLink}>
            {title}
          </Link>
        </h3>

        {/* Rating and Reviews */}
        <div className={styles.ratingRow}>
          <div className={styles.stars} aria-label={`Rating: ${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                size={12}
                className={idx < rating ? styles.starFilled : styles.starEmpty}
                fill="currentColor"
              />
            ))}
          </div>
          {reviewsCount && (
            <span className={styles.reviewsCount}>({reviewsCount})</span>
          )}
        </div>

        {/* Price Section */}
        <div className={styles.footerRow}>
          <div className={styles.priceCol}>
            <div className={styles.priceValues}>
              <span className={styles.currentPrice}>{price}</span>
              {originalPrice && (
                <span className={styles.originalPrice}>{originalPrice}</span>
              )}
            </div>
            {discountBadge && (
              <span className={styles.discountBadge}>{discountBadge}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
