"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Skelton from "@/components/ui/skelton/Skelton";
import styles from "./ClassBox.module.scss";

export interface ClassBoxProps {
  id?: string;
  title?: string;
  image?: string;
  imageAlt?: string;
  instructor?: {
    name: string;
    avatar: string;
    role?: string;
  };
  type?: string;
  time?: string;
  level?: string;
  price?: string;
  badge?: string;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

/**
 * Dedicated Skeleton Loader matching ClassBox dimensions exactly
 */
export function ClassBoxSkeleton({ className = "" }: { className?: string }) {
  return (
    <article
      className={`${styles.cardWrapper} ${styles.skeletonCard} ${className}`}
      aria-busy="true"
      aria-label="Loading workshop details"
    >
      {/* Top Image Skeleton */}
      <div className={styles.imageContainer}>
        <Skelton height="100%" borderRadius={10} />

        {/* Floating Instructor Pill Skeleton */}
        <div className={styles.instructorBadge}>
          <div className={styles.avatarWrapper}>
            <Skelton circle width={28} height={28} />
          </div>
          <div className={styles.instructorInfo}>
            <Skelton width={38} height={8} style={{ marginBottom: 3 }} />
            <Skelton width={62} height={10} />
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <Skelton width={130} height={20} borderRadius={4} />
          <Skelton circle width={18} height={18} />
        </div>

        {/* Meta Specifications Grid (Type | Time | Level) Skeleton */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <Skelton width={30} height={8} style={{ marginBottom: 4 }} />
            <Skelton width={44} height={12} />
          </div>

          <div className={styles.metaDivider} aria-hidden="true" />

          <div className={styles.metaItem}>
            <Skelton width={30} height={8} style={{ marginBottom: 4 }} />
            <Skelton width={40} height={12} />
          </div>

          <div className={styles.metaDivider} aria-hidden="true" />

          <div className={styles.metaItem}>
            <Skelton width={30} height={8} style={{ marginBottom: 4 }} />
            <Skelton width={46} height={12} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ClassBox({
  title = "Still & Strong",
  image = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
  imageAlt = "Yoga posture workout class",
  instructor = {
    name: "Lucas Moretti",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "Instructor",
  },
  type = "Vinyasa",
  time = "1 Hour",
  level = "Advanced",
  price,
  badge,
  href = "/courses",
  className = "",
  isLoading = false,
}: ClassBoxProps) {
  if (isLoading) {
    return <ClassBoxSkeleton className={className} />;
  }

  return (
    <article className={`${styles.cardWrapper} ${className}`}>
      <Link href={href} className={styles.cardLink} aria-label={title}>
        {/* Top Image Section */}
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className={styles.cardImage}
          />

          {/* Optional Tag Badge (e.g. Popular / New) */}
          {badge && <span className={styles.categoryBadge}>{badge}</span>}

          {/* Floating Instructor Badge */}
          <div className={styles.instructorBadge}>
            <div className={styles.avatarWrapper}>
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                fill
                unoptimized
                sizes="28px"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.instructorInfo}>
              <span className={styles.instructorRole}>
                {instructor.role || "Instructor"}
              </span>
              <span className={styles.instructorName}>{instructor.name}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.arrowIcon} aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </div>

          {/* Meta Specifications Grid (Type | Time | Level) */}
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Type</span>
              <span className={styles.metaValue}>{type}</span>
            </div>

            <div className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Time</span>
              <span className={styles.metaValue}>{time}</span>
            </div>

            <div className={styles.metaDivider} aria-hidden="true" />

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Level</span>
              <span className={styles.metaValue}>{level}</span>
            </div>
          </div>

          {/* Optional Price Display */}
          {price && (
            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Fee</span>
              <span className={styles.priceValue}>{price}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
