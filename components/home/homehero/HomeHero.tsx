"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button/Button";

import "swiper/css";
import "swiper/css/effect-fade";

import styles from "./HomeHero.module.scss";

interface FeatureCard {
  title: string;
  info: string;
  image: string;
  href: string;
}

interface HeroSlide {
  id: string;
  slideNumber: string;
  totalSlides: string;
  brand: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryBtn: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
  card: FeatureCard;
}

const slides: HeroSlide[] = [
  {
    id: "ecommerce",
    slideNumber: "01",
    totalSlides: "02",
    brand: "YOGI AND YATHRA",
    eyebrow: "MINDFUL LIVING · CONSCIOUS SHOPPING",
    titleLine1: "Find Your Balance,",
    titleLine2: "Naturally.",
    description:
      "Discover thoughtfully curated yoga essentials and wellness products that bring peace, balance, and mindful living into everyday life.",
    primaryBtn: {
      label: "Explore Collection",
      href: "https://www.yogiandyathra.com/",
    },
    image: "/images/banner/banner-1.webp",
    imageAlt: "Sacred Rudraksha mala prayer beads for yoga and meditation",
    card: {
      title: "Rudraksha Mala",
      info: "Certified Authentic • ₹1,299",
      image: "/images/banner/banner-1.webp",
      href: "https://www.yogiandyathra.com/",
    },
  },
  {
    id: "workshops",
    slideNumber: "02",
    totalSlides: "02",
    brand: "YOGIFY",
    eyebrow: "LEARN · PRACTICE · TRANSFORM",
    titleLine1: "Your Journey to Inner",
    titleLine2: "Peace Begins Here.",
    description:
      "Join expert led yoga workshops and transformative courses designed to nurture your mind, body, and spirit.",
    primaryBtn: {
      label: "Explore Workshops",
      href: "/workshops",
    },
    image: "/images/banner/banner-2.webp",
    imageAlt: "Yogify yoga workshops and courses banner",
    card: {
      title: "Yoga Online Class",
      info: "Interactive Live • 90 Mins",
      image: "/images/banner/banner-2.webp",
      href: "/workshops",
    },
  },
];

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const firstSlide = slides[0];

  return (
    <section id="home" className={styles.heroSection} aria-label="Home Hero Banner">
      {mounted ? (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          className={styles.swiper}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className={styles.slide}>
              {/* Background Image */}
              <div className={styles.imageContainer}>
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={styles.bgImage}
                />
              </div>

              {/* Dark Ambient Overlay */}
              <div className={styles.overlay} />

              {/* Container for content and right-side vertical cards */}
              <div className="container">
                <div className={styles.heroRow}>
                  {/* Left Column: Heading, description, CTAs */}
                  <div className={styles.content}>
                    {/* Number & Brand */}
                    <div className={styles.meta}>
                      <span className={styles.slideNumber}>
                        {slide.slideNumber}{" "}
                        <span className={styles.slash}>/</span>{" "}
                        {slide.totalSlides}
                      </span>
                      <span className={styles.brandSeparator}>•</span>
                      <span className={styles.brandName}>{slide.brand}</span>
                    </div>

                    {/* Eyebrow Label */}
                    <div className={styles.eyebrow}>
                      <Sparkles size={13} className={styles.sparkleIcon} />
                      <span>{slide.eyebrow}</span>
                    </div>

                    {/* Title */}
                    <h1 className={styles.title}>
                      <span className={styles.titleLine}>
                        {slide.titleLine1}
                      </span>
                      <span className={styles.titleLine}>
                        {slide.titleLine2}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className={styles.description}>{slide.description}</p>

                    {/* Button */}
                    <div className={styles.btnGroup}>
                      <Button
                        variant="primary"
                        size="md"
                        href={slide.primaryBtn.href}
                        icon={<ArrowRight size={16} />}
                      >
                        {slide.primaryBtn.label}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Single Featured Card matching reference design */}
                  <div className={styles.featureCardsCol}>
                    <Link
                      href={slide.card.href}
                      className={styles.featureCard}
                      target={slide.card.href.startsWith("http") ? "_blank" : undefined}
                      rel={slide.card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <div className={styles.cardThumb}>
                        <Image
                          src={slide.card.image}
                          alt={slide.card.title}
                          fill
                          sizes="(max-width: 1200px) 340px, 380px"
                          className={styles.cardThumbImg}
                        />
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.cardInfoCol}>
                          <h4 className={styles.cardTitle}>{slide.card.title}</h4>
                          <p className={styles.cardSubtitle}>{slide.card.info}</p>
                        </div>

                        <div className={styles.cardBtn} aria-hidden="true">
                          <ArrowUpRight size={20} className={styles.cardBtnIcon} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        /* Static SSR fallback */
        <div className={styles.staticHero}>
          <div className={styles.imageContainer}>
            <Image
              src={firstSlide.image}
              alt={firstSlide.imageAlt}
              fill
              priority
              sizes="100vw"
              className={styles.bgImage}
            />
          </div>
          <div className={styles.overlay} />
          <div className="container">
            <div className={styles.heroRow}>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.slideNumber}>
                    {firstSlide.slideNumber}{" "}
                    <span className={styles.slash}>/</span>{" "}
                    {firstSlide.totalSlides}
                  </span>
                  <span className={styles.brandSeparator}>•</span>
                  <span className={styles.brandName}>{firstSlide.brand}</span>
                </div>

                <div className={styles.eyebrow}>
                  <Sparkles size={13} className={styles.sparkleIcon} />
                  <span>{firstSlide.eyebrow}</span>
                </div>

                <h1 className={styles.title}>
                  <span className={styles.titleLine}>
                    {firstSlide.titleLine1}
                  </span>
                  <span className={styles.titleLine}>
                    {firstSlide.titleLine2}
                  </span>
                </h1>
                <p className={styles.description}>{firstSlide.description}</p>

                <div className={styles.btnGroup}>
                  <Button
                    variant="primary"
                    size="md"
                    href={firstSlide.primaryBtn.href}
                    icon={<ArrowRight size={16} />}
                  >
                    {firstSlide.primaryBtn.label}
                  </Button>
                </div>
              </div>

              {/* Static Right Column: Single Featured Card matching reference design */}
              <div className={styles.featureCardsCol}>
                <Link
                  href={firstSlide.card.href}
                  className={styles.featureCard}
                  target={firstSlide.card.href.startsWith("http") ? "_blank" : undefined}
                  rel={firstSlide.card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <div className={styles.cardThumb}>
                    <Image
                      src={firstSlide.card.image}
                      alt={firstSlide.card.title}
                      fill
                      sizes="(max-width: 1200px) 340px, 380px"
                      className={styles.cardThumbImg}
                    />
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardInfoCol}>
                      <h4 className={styles.cardTitle}>{firstSlide.card.title}</h4>
                      <p className={styles.cardSubtitle}>{firstSlide.card.info}</p>
                    </div>

                    <div className={styles.cardBtn} aria-hidden="true">
                      <ArrowUpRight size={20} className={styles.cardBtnIcon} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
