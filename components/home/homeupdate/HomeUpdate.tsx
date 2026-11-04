"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SecHead from "@/components/boxes/sechead/SecHead";
import Button from "@/components/ui/button/Button";
import styles from "./HomeUpdate.module.scss";

export default function HomeUpdate() {
  return (
    <section
      className={styles.updateSection}
      aria-label="Latest Updates and Featured Highlights"
    >
      <div className="container">
        {/* Centered Section Header with Italic Hook Word */}
        <SecHead
          eyebrow="Special Updates"
          title="Our Most-*Loved* Highlights"
          description="Carefully curated for you — discover sacred spiritual essentials alongside transformative yoga immersions."
          align="center"
        />

        {/* Single Unified Master Box housing Top & Bottom Alternating Rows */}
        <div className={styles.unifiedBox}>
          {/* Top Row: Left Text, Right Image (Yogi & Yathra Flash Sale) */}
          <div className={`${styles.bannerRow} ${styles.topRow}`}>
            <div className={styles.contentCol}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span>Flash Sale · Yogi & Yathra</span>
              </div>

              <h3 className={styles.title}>Sacred Abundance</h3>

              <p className={styles.description}>
                Get 25% off authentic Rudraksha malas and gold-accented bracelets with code:{" "}
                <span className={styles.promoCode}>YOGI25</span>.
              </p>

              <div className={styles.btnWrapper}>
                <Button
                  variant="primary"
                  size="md"
                  href="/shop"
                  icon={<ArrowRight size={16} />}
                >
                  View Full Collection
                </Button>
              </div>
            </div>

            <Link
              href="/shop"
              className={styles.imageCol}
              aria-label="View Sacred Abundance collection"
            >
              <Image
                src="/images/products/rudraksha-bracelet.jpg"
                alt="Authentic Rudraksha bracelet with polished gold spacers"
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className={styles.bannerImage}
              />
            </Link>
          </div>

          {/* Horizontal Divider Line between Top & Bottom rows */}
          <div className={styles.horizontalDivider} aria-hidden="true" />

          {/* Bottom Row: Left Image, Right Text (Yogify Live Workshop) */}
          <div className={`${styles.bannerRow} ${styles.bottomRow}`}>
            <Link
              href="/workshops"
              className={styles.imageCol}
              aria-label="Explore Yogify yoga classes and workshops"
            >
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                alt="Yogify yoga class master practicing mindfulness meditation"
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className={styles.bannerImage}
              />
            </Link>

            <div className={styles.contentCol}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                <span>Live Workshop · Yogify</span>
              </div>

              <h3 className={styles.title}>Prana & Flow</h3>

              <p className={styles.description}>
                Transform your breath and movement with expert-led weekend yoga immersions and masterclasses.
              </p>

              <div className={styles.btnWrapper}>
                <Button
                  variant="primary"
                  size="md"
                  href="/workshops"
                  icon={<ArrowRight size={16} />}
                >
                  Explore All Classes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
