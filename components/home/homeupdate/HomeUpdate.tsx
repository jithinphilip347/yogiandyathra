"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import Button from "@/components/ui/button/Button";
import { sectionFadeIn, itemFadeUp, mindfulEase } from "@/components/ui/animation/motionVariants";
import styles from "./HomeUpdate.module.scss";

export default function HomeUpdate() {
  return (
    <section
      id="update"
      className={styles.updateSection}
      aria-label="Latest Updates and Featured Highlights"
    >
      <div className="container">
        {/* Animated Centered Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionFadeIn}
        >
          <SecHead
            title="Spiritual *Journey* for Both Mind and Body"
            align="center"
          />
        </motion.div>

        {/* Single Unified Master Box housing Top & Bottom Alternating Rows */}
        <motion.div
          className={styles.unifiedBox}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: mindfulEase }}
        >
          {/* Top Row: Left Text, Right Image (Yogify Sacred Product) */}
          <motion.div
            className={`${styles.bannerRow} ${styles.topRow}`}
            variants={itemFadeUp}
          >
            <div className={styles.contentCol}>
              {/* Yogify Brand Logo from public/images/Yogify.png */}
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/Yogify.png"
                  alt="Yogify"
                  width={140}
                  height={54}
                  className={styles.brandLogo}
                />
              </div>

              <h3 className={styles.title}>Spiritual Accessories</h3>

              <p className={styles.description}>
                Authentic consecrated malas, sacred beads, and mindful accessories crafted to bring serenity, focus, and spiritual depth to your daily practice.
              </p>

              <div className={styles.btnWrapper}>
                <Button
                  variant="primary"
                  size="md"
                  href="https://www.yogiandyathra.com/"
                  icon={<ArrowRight size={16} />}
                >
                  View Full Collection
                </Button>
              </div>
            </div>

            <Link
              href="https://www.yogiandyathra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageCol}
              aria-label="View Spiritual Accessories collection"
            >
              <Image
                src="/images/products/rudraksha-bracelet.jpg"
                alt="Authentic Rudraksha bracelet with polished gold spacers"
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className={styles.bannerImage}
              />
            </Link>
          </motion.div>

          {/* Horizontal Divider Line between Top & Bottom rows */}
          <div className={styles.horizontalDivider} aria-hidden="true" />

          {/* Bottom Row: Left Image, Right Text (Yogify Live Workshop) */}
          <motion.div
            className={`${styles.bannerRow} ${styles.bottomRow}`}
            variants={itemFadeUp}
          >
            <Link
              href="/workshops"
              className={styles.imageCol}
              aria-label="Explore Yoga & Meditation classes and workshops"
            >
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                alt="Mindfulness yoga and meditation master practicing at sunrise"
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className={styles.bannerImage}
              />
            </Link>

            <div className={styles.contentCol}>
              {/* Yogi & Yathra Brand Logo from public/images/yogi-and-yathra.png */}
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/yogi-and-yathra.png"
                  alt="Yogi & Yathra"
                  width={64}
                  height={64}
                  className={styles.yogiLogo}
                />
              </div>

              <h3 className={styles.title}>Yoga & Meditation</h3>

              <p className={styles.description}>
                Harmonize mind, body, and breath through authentic yogic practices and guided meditation sessions designed to cultivate lasting inner calm and vitality.
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
