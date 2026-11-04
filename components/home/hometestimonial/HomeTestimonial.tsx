"use client";

import React from "react";
import Image from "next/image";
import { Star, CheckCircle, Quote } from "lucide-react";
import SecHead from "@/components/boxes/sechead/SecHead";
import styles from "./HomeTestimonial.module.scss";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  tag: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Dr. Ananya Sen",
    role: "Ayurvedic Physician · Rishikesh",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Authentic Rudraksha",
    content:
      "The 5-mukhi Rudraksha mala from Yogi & Yathra carries an undeniable calm energy. Certified, pristine, and blessed with sacred devotion. It has become an essential part of my daily japa meditation.",
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Vinyasa Student · London",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Yogify Workshop",
    content:
      "Joining the Prana & Flow live weekend masterclass with Lucas completely shifted my breath alignment. The personal corrections and depth of philosophy made me feel as if I were in a Himalayan ashram.",
  },
  {
    id: "3",
    name: "Samyuktha Menon",
    role: "Meditation Facilitator · Bengaluru",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Spiritual Yathra",
    content:
      "The Varanasi pilgrimage journey curated by Yogi & Yathra was life-altering. Every detail was held with mindful reverence, quiet stillness, and supreme respect for Vedic heritage. Deeply grateful.",
  },
];

export default function HomeTestimonial() {
  return (
    <section className={styles.testimonialSection} aria-label="Seeker & Student Testimonials">
      <div className="container">
        {/* Section Header */}
        <SecHead
          eyebrow="VOICES OF OUR SANGHA"
          title="Stories of Healing, Stillness & *Mindful* Living"
          hookWord="Mindful"
          description="Authentic experiences from conscious seekers and students who practice with our guidance and embrace our sacred essentials."
          align="center"
        />

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {testimonials.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                {/* 5-Star Rating */}
                <div className={styles.stars} aria-label={`Rating: ${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} size={15} className={styles.starIcon} fill="currentColor" />
                  ))}
                </div>

                <Quote size={24} className={styles.quoteIcon} aria-hidden="true" />
              </div>

              {/* Tag Pill */}
              <span className={styles.tagBadge}>{item.tag}</span>

              {/* Review Content */}
              <p className={styles.feedback}>“{item.content}”</p>

              {/* Author Profile */}
              <div className={styles.authorRow}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="44px"
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.authorMeta}>
                  <div className={styles.nameWithBadge}>
                    <h4 className={styles.authorName}>{item.name}</h4>
                    <span title="Verified Practitioner" className={styles.verifiedIconWrap}>
                      <CheckCircle size={14} className={styles.verifiedIcon} />
                    </span>
                  </div>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
