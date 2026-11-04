"use client";

import React from "react";
import SecHead from "@/components/boxes/sechead/SecHead";
import ClassBox, { ClassBoxProps, ClassBoxSkeleton } from "@/components/boxes/classbox/ClassBox";
import styles from "./HomeCourse.module.scss";

export interface CourseData extends ClassBoxProps {
  id: string;
}

const defaultCourses: CourseData[] = [
  {
    id: "still-and-strong",
    title: "Still & Strong",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Still and Strong Vinyasa flow workout",
    instructor: {
      name: "Lucas Moretti",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "Instructor",
    },
    type: "Vinyasa",
    time: "1 Hour",
    level: "Advanced",
    price: "₹1,499",
    badge: "Popular",
    href: "/courses/still-and-strong",
  },
  {
    id: "prana-breath-flow",
    title: "Prana & Breath Mastery",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Pranayama breathwork and mindful meditation session",
    instructor: {
      name: "Aarohi Patel",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      role: "Yoga Acharya",
    },
    type: "Pranayama",
    time: "45 Mins",
    level: "All Levels",
    price: "₹999",
    badge: "Live Workshop",
    href: "/courses/prana-breath-flow",
  },
  {
    id: "ashtanga-primary-series",
    title: "Ashtanga Flow Series",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ashtanga yoga primary series practice",
    instructor: {
      name: "Devanand Nair",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "Senior Yogi",
    },
    type: "Ashtanga",
    time: "75 Mins",
    level: "Intermediate",
    price: "₹1,799",
    badge: "Intensive",
    href: "/courses/ashtanga-flow-series",
  },
  {
    id: "restorative-yin-sound",
    title: "Restorative Yin & Sound",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Restorative Yin yoga and sound healing immersion",
    instructor: {
      name: "Maya Lin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Sound Alchemist",
    },
    type: "Yin Yoga",
    time: "60 Mins",
    level: "Beginner",
    price: "₹1,299",
    badge: "Mindful",
    href: "/courses/restorative-yin-sound",
  },
];

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
  title = "Transform Your Practice with *Expert-Led* Classes",
  hookWord = "Expert-Led",
  description = "Join immersive live sessions and self-paced journeys designed by master practitioners to elevate your mind, body, and breath.",
  courses = defaultCourses,
  isLoading = false,
}: HomeCourseProps) {
  return (
    <section className={styles.courseSection} aria-label="Featured Yoga Courses and Workshops">
      <div className="container">
        {/* Section Header with Serif Italic Hook and Reusable Button CTA */}
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

        {/* 4-Item Courses Cards Grid */}
        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ClassBoxSkeleton key={`skeleton-${idx}`} />
              ))
            : courses.map((course) => (
                <ClassBox
                  key={course.id}
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
              ))}
        </div>
      </div>
    </section>
  );
}
