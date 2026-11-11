"use client";

import React from "react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import ClassBox, { ClassBoxProps, ClassBoxSkeleton } from "@/components/boxes/classbox/ClassBox";
import { sectionFadeIn, staggerContainer, itemFadeUp } from "@/components/ui/animation/motionVariants";
import styles from "./HomeCourse.module.scss";

export interface CourseData extends ClassBoxProps {
  id: string;
}

export interface HomeCourseProps {
  eyebrow?: string;
  title?: string;
  hookWord?: string;
  description?: string;
  courses?: CourseData[];
  isLoading?: boolean;
}

export default function HomeCourse({
  eyebrow = "YOGIFY WORKSHOPS",
  title = "Transform Your Practice with *Expert Led* Classes",
  hookWord = "Expert Led",
  description = "Join immersive live sessions and self-paced journeys designed by master practitioners to elevate your mind, body, and breath.",
  courses = [],
  isLoading = false,
}: HomeCourseProps) {
  return (
    <section id="course" className={styles.courseSection} aria-label="Featured Yoga Courses and Workshops">
      <div className="container">
        {/* Animated Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionFadeIn}
        >
          <SecHead
            eyebrow={eyebrow}
            title={title}
            hookWord={hookWord}
            description={description}
            align="space-between"
            action={{
              label: "Explore All Classes",
              href: "/courses",
            }}
          />
        </motion.div>

        {/* 4-Item Courses Cards Grid with Smooth Stagger Entrance */}
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ClassBoxSkeleton key={`skeleton-${idx}`} />
              ))
            : courses.map((course) => (
                <motion.div key={course.id} variants={itemFadeUp} style={{ width: "100%" }}>
                  <ClassBox
                    title={course.title}
                    image={course.image}
                    imageAlt={course.imageAlt}
                    instructor={course.instructor}
                    type={course.type}
                    time={course.time}
                    level={course.level}
                    price={course.price}
                    badge={course.badge}
                    href={course.href}
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
