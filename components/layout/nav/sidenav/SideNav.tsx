"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Home,
  Flame,
  ShoppingBag,
  BookOpen,
  Heart,
  Star,
  HelpCircle,
  Newspaper,
  Mail,
  ArrowRight,
  Phone,
} from "lucide-react";
import styles from "./SideNav.module.scss";

export interface NavItem {
  label: string;
  href: string;
  targetId: string;
}

export const sideNavSections: {
  label: string;
  href: string;
  targetId: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { label: "Home", href: "/#home", targetId: "home", icon: Home },
  { label: "Updates", href: "/#update", targetId: "update", icon: Flame },
  { label: "Products", href: "/#product", targetId: "product", icon: ShoppingBag },
  { label: "Courses", href: "/#course", targetId: "course", icon: BookOpen },
  { label: "About", href: "/#about", targetId: "about", icon: Heart },
  // { label: "Reviews", href: "/#testimonial", targetId: "testimonial", icon: Star },
  { label: "FAQ", href: "/#faq", targetId: "faq", icon: HelpCircle },
  // { label: "Blogs", href: "/#blogs", targetId: "blogs", icon: Newspaper },
  { label: "Newsletter", href: "/#newsletter", targetId: "newsletter", icon: Mail },
];

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export default function SideNav({
  isOpen,
  onClose,
  activeSection,
  onNavClick,
}: SideNavProps) {
  // Lock body scroll and handle Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-over Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        aria-label="Side Navigation Menu"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className={styles.header}>
          <Link
            href="/#home"
            onClick={(e) => {
              onNavClick(e, "home");
              onClose();
            }}
            className={styles.logoLink}
            aria-label="Yogi & Yathra Home"
          >
            <Image
              src="/logo-01.png"
              alt="Yogi & Yathra"
              width={120}
              height={42}
              className={styles.logoImg}
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Content */}
        <div className={styles.navContent}>
          <div className={styles.sectionEyebrow}>Explore Sacred Journey</div>
          <ul className={styles.navList}>
            {sideNavSections.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.targetId;

              return (
                <li key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      onNavClick(e, item.targetId);
                      onClose();
                    }}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                  >
                    <div className={styles.linkLeft}>
                      <IconComponent size={18} className={styles.linkIcon} />
                      <span>{item.label}</span>
                    </div>

                    <div className={styles.linkRight}>
                      <ArrowRight size={15} className={styles.arrowIcon} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Footer: Quick Sangha Contact */}
        <div className={styles.footer}>
          <a href="tel:+917994219909" className={styles.contactItem}>
            <Phone size={16} className={styles.contactIcon} />
            <span>+91 7994219909</span>
          </a>
          <a href="mailto:yy.yogify@gmail.com" className={styles.contactItem}>
            <Mail size={16} className={styles.contactIcon} />
            <span>yy.yogify@gmail.com</span>
          </a>
        </div>
      </aside>
    </>
  );
}

