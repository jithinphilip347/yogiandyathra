"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import { sectionFadeIn, staggerContainer, itemFadeUp } from "@/components/ui/animation/motionVariants";
import styles from "./HomeBlog.module.scss";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  href: string;
}

const posts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Sacred Geometry of 5 Mukhi Rudraksha: Science and Spirituality",
    category: "Vedic Wisdom",
    excerpt:
      "Explore why ancient sages revered the five faced bead for balancing heart rhythms, harmonizing neural frequencies, and anchoring daily meditation.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    date: "Nov 2, 2026",
    readTime: "6 min read",
    href: "/blog/sacred-geometry-rudraksha",
  },
  {
    id: "post-2",
    title: "Pranayama Before Sunrise: How Morning Breathwork Resets the Mind",
    category: "Breath & Prana",
    excerpt:
      "A deep dive into Brahma Muhurta and three foundational pranayama techniques that regulate the nervous system and foster unshakeable calm.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    date: "Oct 28, 2026",
    readTime: "8 min read",
    href: "/blog/morning-pranayama-routine",
  },
  {
    id: "post-3",
    title: "Walking the Path of Yathra: Sacred Pilgrimage as Inner Healing",
    category: "Mindful Travel",
    excerpt:
      "Stepping outside familiar routines to embark on sacred journeys through Rishikesh and Himalayas cultivates deep spiritual clarity and stillness.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    date: "Oct 20, 2026",
    readTime: "5 min read",
    href: "/blog/path-of-sacred-yathra",
  },
];

export default function HomeBlog() {
  return (
    <section id="blogs" className={styles.blogSection} aria-label="Wisdom Journal & Articles">
      <div className="container">
        {/* Animated Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionFadeIn}
        >
          <SecHead
            eyebrow="ANCIENT WISDOM & MODERN LIVING"
            title="Insights, Teachings & *Vedic* Perspectives"
            hookWord="Vedic"
            description="Explore curated reflections on yogic philosophy, mindful daily rituals, sacred malas, and the art of inner stillness."
            align="space-between"
            action={{
              label: "Explore Journal",
              href: "/blog",
            }}
          />
        </motion.div>

        {/* 3-Column Editorial Grid with Stagger Entrance */}
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {posts.map((post) => (
            <motion.article key={post.id} className={styles.card} variants={itemFadeUp}>
              <Link href={post.href} className={styles.imageLink} aria-label={post.title}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 380px"
                    className={styles.postImage}
                  />
                  <span className={styles.categoryBadge}>{post.category}</span>
                </div>
              </Link>

              <div className={styles.content}>
                {/* Meta details: Date & Read Time */}
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <Calendar size={13} className={styles.metaIcon} />
                    {post.date}
                  </span>
                  <span className={styles.dotSeparator}>•</span>
                  <span className={styles.metaItem}>
                    <Clock size={13} className={styles.metaIcon} />
                    {post.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className={styles.title}>
                  <Link href={post.href} className={styles.titleLink}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className={styles.excerpt}>{post.excerpt}</p>

                {/* Read Link */}
                <div className={styles.footerRow}>
                  <Link href={post.href} className={styles.readMore}>
                    <span>Read Article</span>
                    <ArrowUpRight size={16} className={styles.readArrow} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
