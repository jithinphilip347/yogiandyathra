"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, HeartHandshake, Compass } from "lucide-react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import { sectionFadeIn, staggerContainer, itemFadeUp, mindfulEase } from "@/components/ui/animation/motionVariants";
import styles from "./HomeAbout.module.scss";

export default function HomeAbout() {
  const pillars = [
    {
      icon: <ShieldCheck size={22} className={styles.pillarIcon} />,
      title: "Sacred Authenticity",
      description:
        "Every Rudraksha bead, copper vessel, and meditation aid is ethically sourced and blessed in sacred Himalayan traditions.",
    },
    {
      icon: <Sparkles size={22} className={styles.pillarIcon} />,
      title: "Master Led Immersions",
      description:
        "Practice with certified Yoga Acharyas who teach beyond postures.",
    },
    {
      icon: <Compass size={22} className={styles.pillarIcon} />,
      title: "Conscious Yathra (Journeys)",
      description:
        "Curated spiritual pilgrimages to sacred sanctuaries across India designed for deep self reflection and inner renewal.",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Conscious Seekers" },
    { value: "15+", label: "Years of Experience" },
    { value: "100%", label: "Authentic & Ethical" },
  ];

  return (
    <section id="about" className={styles.aboutSection} aria-label="About Yogi & Yathra and Yogify">
      <div className="container">
        {/* Animated Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionFadeIn}
        >
          <SecHead
            eyebrow="OUR PHILOSOPHY & STORY"
            title="Bridging Timeless Vedic Heritage with *Conscious* Living"
            hookWord="Conscious"
            description="Born from a reverence for ancient yogic wisdom, Yogi & Yathra and Yogify unite mindful travel, sacred wellness essentials, and transformative classes into a single sanctuary."
            align="center"
          />
        </motion.div>

        <div className={styles.aboutContent}>
          {/* Left Column: Visual Showcase with Smooth Left Entrance */}
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: mindfulEase }}
          >
            <div className={styles.mainImageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
                alt="Mindful meditation and yoga practice in natural light"
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                className={styles.aboutImage}
              />
              <motion.div
                className={styles.floatingBadge}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: mindfulEase }}
              >
                <HeartHandshake size={20} className={styles.badgeIcon} />
                <div className={styles.badgeText}>
                  <span className={styles.badgeTitle}>Rooted in Lineage</span>
                  <span className={styles.badgeSubtitle}>Yoga Alliance Certified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Core Pillars with Smooth Right Entrance */}
          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: mindfulEase }}
          >
            <div className={styles.storyBlock}>
              <h3 className={styles.storyHeading}>
                More than a practice, a return to stillness.
              </h3>
              <p className={styles.storyParagraph}>
                In a world that never stops moving, we create spaces and tools that invite you to pause. Whether through authentic prayer malas that anchor your daily mantra or live interactive workshops that align breath and posture, every offering is crafted with pure intention.
              </p>
            </div>

            {/* Core Pillars Staggered */}
            <motion.div
              className={styles.pillarsList}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {pillars.map((pillar, idx) => (
                <motion.div key={idx} className={styles.pillarItem} variants={itemFadeUp}>
                  <div className={styles.iconBox}>{pillar.icon}</div>
                  <div className={styles.pillarText}>
                    <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                    <p className={styles.pillarDesc}>{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: mindfulEase }}
            >
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
