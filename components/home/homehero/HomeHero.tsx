"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/button/Button";

import "swiper/css";
import "swiper/css/effect-fade";

import styles from "./HomeHero.module.scss";

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
  secondaryBtn: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt: string;
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
      href: "/shop",
    },
    secondaryBtn: {
      label: "Our Philosophy",
      href: "/philosophy",
    },
    image: "/images/banner/banner-1.webp",
    imageAlt: "Sacred Rudraksha mala prayer beads for yoga and meditation",
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
      "Join expert-led yoga workshops and transformative courses designed to nurture your mind, body, and spirit.",
    primaryBtn: {
      label: "Explore Workshops",
      href: "/workshops",
    },
    secondaryBtn: {
      label: "Discover Our Courses",
      href: "/courses",
    },
    image: "/images/banner/banner-2.webp",
    imageAlt: "Yogify yoga workshops and courses banner",
  },
];

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const firstSlide = slides[0];

  return (
    <section className={styles.heroSection} aria-label="Home Hero Banner">

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

              {/* Left Aligned Content */}
              <div className="container">
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

                  {/* Title - 2 balanced lines */}
                  <h1 className={styles.title}>
                    <span className={styles.titleLine}>
                      {slide.titleLine1}
                    </span>
                    <span className={styles.titleLine}>
                      {slide.titleLine2}
                    </span>
                  </h1>

                  {/* Description - 2 lines max */}
                  <p className={styles.description}>{slide.description}</p>

                  {/* Buttons */}
                  <div className={styles.btnGroup}>
                    <Button
                      variant="primary"
                      size="md"
                      href={slide.primaryBtn.href}
                      icon={<ArrowRight size={16} />}
                    >
                      {slide.primaryBtn.label}
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      href={slide.secondaryBtn.href}
                      icon={<ArrowUpRight size={16} />}
                    >
                      {slide.secondaryBtn.label}
                    </Button>
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

                <Button
                  variant="outline"
                  size="md"
                  href={firstSlide.secondaryBtn.href}
                  icon={<ArrowUpRight size={16} />}
                >
                  {firstSlide.secondaryBtn.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
