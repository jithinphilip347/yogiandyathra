"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, HeartHandshake, Compass, ArrowRight } from "lucide-react";
import SecHead from "@/components/boxes/sechead/SecHead";
import Button from "@/components/ui/button/Button";
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
      title: "Master-Led Immersions",
      description:
        "Practice with certified Yoga Acharyas who teach beyond postures — integrating breath, philosophy, and stillness.",
    },
    {
      icon: <Compass size={22} className={styles.pillarIcon} />,
      title: "Conscious Yathra (Journeys)",
      description:
        "Curated spiritual pilgrimages to sacred sanctuaries across India designed for deep self-reflection and inner renewal.",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Conscious Seekers" },
    { value: "250+", label: "Yoga Masterclasses" },
    { value: "100%", label: "Authentic & Ethical" },
  ];

  return (
    <section className={styles.aboutSection} aria-label="About Yogi & Yathra and Yogify">
      <div className="container">
        {/* Section Header */}
        <SecHead
          eyebrow="OUR PHILOSOPHY & STORY"
          title="Bridging Timeless Vedic Heritage with *Conscious* Living"
          hookWord="Conscious"
          description="Born from a reverence for ancient yogic wisdom, Yogi & Yathra and Yogify unite mindful travel, sacred wellness essentials, and transformative classes into a single sanctuary."
          align="center"
        />

        <div className={styles.aboutContent}>
          {/* Left Column: Visual Showcase with Floating Badge */}
          <div className={styles.imageCol}>
            <div className={styles.mainImageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
                alt="Mindful meditation and yoga practice in natural light"
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                className={styles.aboutImage}
              />
              <div className={styles.floatingBadge}>
                <HeartHandshake size={20} className={styles.badgeIcon} />
                <div className={styles.badgeText}>
                  <span className={styles.badgeTitle}>Rooted in Lineage</span>
                  <span className={styles.badgeSubtitle}>Yoga Alliance Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Core Pillars */}
          <div className={styles.textCol}>
            <div className={styles.storyBlock}>
              <h3 className={styles.storyHeading}>
                More than a practice — a return to stillness.
              </h3>
              <p className={styles.storyParagraph}>
                In a world that never stops moving, we create spaces and tools that invite you to pause. Whether through authentic prayer malas that anchor your daily mantra or live interactive workshops that align breath and posture, every offering is crafted with pure intention.
              </p>
            </div>

            {/* Core Pillars */}
            <div className={styles.pillarsList}>
              {pillars.map((pillar, idx) => (
                <div key={idx} className={styles.pillarItem}>
                  <div className={styles.iconBox}>{pillar.icon}</div>
                  <div className={styles.pillarText}>
                    <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                    <p className={styles.pillarDesc}>{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className={styles.actionRow}>
              <Button
                variant="primary"
                size="md"
                href="/about"
                icon={<ArrowRight size={16} />}
              >
                Discover Our Heritage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

