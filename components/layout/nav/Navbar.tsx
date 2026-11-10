"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Calendar, ShoppingBag } from "lucide-react";
import styles from "./Navbar.module.scss";
import SideNav, { NavItem } from "./sidenav/SideNav";

export const navLinks: NavItem[] = [
  { label: "Home", href: "/#home", targetId: "home" },
  { label: "Updates", href: "/#update", targetId: "update" },
  { label: "Products", href: "/#product", targetId: "product" },
  { label: "Courses", href: "/#course", targetId: "course" },
  { label: "About", href: "/#about", targetId: "about" },
  // { label: "Reviews", href: "/#testimonial", targetId: "testimonial" },
  { label: "FAQ", href: "/#faq", targetId: "faq" },
  // { label: "Blogs", href: "/#blogs", targetId: "blogs" },
  { label: "Contact", href: "/#newsletter", targetId: "newsletter" },
];

function MeditationIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="12" cy="4" r="2.2" />
      <path d="M12 7.2c-1.1 0-2.1.8-2.3 1.9l-.2 1.6-2.5 1.5c-.5.3-.6 1-.3 1.5.3.5 1 .6 1.5.3l2.2-1.3v2.8l-3.3 1.9c-.5.3-.7.9-.4 1.4.3.5.9.7 1.4.4l3.1-1.8v1.6H7c-.6 0-1 .4-1 1s.4 1 1 1h10c.6 0 1-.4 1-1s-.4-1-1-1h-4.2v-1.6l3.1 1.8c.5.3 1.1.1 1.4-.4.3-.5.1-1.1-.4-1.4l-3.3-1.9v-2.8l2.2 1.3c.5.3 1.2.2 1.5-.3.3-.5.2-1.2-.3-1.5l-2.5-1.5-.2-1.6c-.2-1.1-1.2-1.9-2.3-1.9z" />
    </svg>
  );
}

function AirplaneIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

export interface PillarItem {
  label: string;
  href: string;
  iconColor: string;
  icon: (size?: number) => React.ReactNode;
}

export const corePillars: PillarItem[] = [
  {
    label: "Workshop",
    href: "https://www.yogiandyathra.com/",
    iconColor: "#874429",
    icon: (size = 14) => <MeditationIcon size={size} />,
  },
  {
    label: "Spiritual Store",
    href: "https://www.yogiandyathra.com/",
    iconColor: "#7950f2",
    icon: (size = 15) => <ShoppingBag size={size} strokeWidth={2.2} />,
  },
  {
    label: "Events",
    href: "https://www.yogiandyathra.com/",
    iconColor: "#0ca678",
    icon: (size = 15) => <Calendar size={size} strokeWidth={2.2} />,
  },
  {
    label: "Travel",
    href: "https://www.yogiandyathra.com/",
    iconColor: "#ea580c",
    icon: (size = 14) => <AirplaneIcon size={size} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // ScrollSpy: observe sections as user scrolls and update active link
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to accurately track the active visible section
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionElements = navLinks
      .map((link) => document.getElementById(link.targetId))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [pathname]);

  // Smooth click scroll handler for main nav links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(targetId);
        window.history.pushState(null, "", `#${targetId}`);
      }
      setIsSideNavOpen(false);
    } else {
      setIsSideNavOpen(false);
    }
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className="container">
          <div className={styles.navbarWrapper}>
            {/* Left Side: Brand Logo + Core Pillar Pills (matching reference image) */}
            <div className={styles.leftGroup}>
              <div className={styles.logoCol}>
                <Link
                  href="/#home"
                  onClick={(e) => handleNavClick(e, "home")}
                  className={styles.logoLink}
                  aria-label="Yogi & Yathra Home"
                >
                  <Image
                    src="/logo-01.png"
                    alt="Yogi & Yathra"
                    width={72}
                    height={50}
                    className={styles.logoImg}
                    priority
                  />
                </Link>
              </div>

              {/* Pillar Pills Capsule Container on the right side of the Logo (Desktop View) */}
              <div
                className={`${styles.pillsContainer} ${styles.desktopPills}`}
                role="region"
                aria-label="Core Pillars"
              >
                {corePillars.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pillItem}
                    aria-label={`Visit ${item.label} on Yogi & Yathra`}
                  >
                    <span className={styles.pillIcon} style={{ color: item.iconColor }}>
                      {item.icon()}
                    </span>
                    <span className={styles.pillLabel}>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side: Nav Links (Desk View) + Toggle Menu Button */}
            <div className={styles.rightGroup}>
              {/* Navigation Links placed on the right side, immediately to the left of the toggle button */}
              <nav className={styles.navCol} aria-label="Main Navigation">
                <ul className={styles.navList}>
                  {navLinks.map((item) => {
                    const isActive = activeSection === item.targetId;

                    return (
                      <li key={item.label} className={styles.navItem}>
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.targetId)}
                          className={`${styles.navLink} ${
                            isActive ? styles.active : ""
                          }`}
                        >
                          <span className={styles.navText}>{item.label}</span>
                          {/* Clean Active Underline Indicator */}
                          {isActive && <span className={styles.activeIndicator} />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Toggle Menu Button on the far right */}
              <div className={styles.actionsCol}>
                <button
                  type="button"
                  className={`${styles.toggleBtn} ${
                    isSideNavOpen ? styles.open : ""
                  }`}
                  onClick={() => setIsSideNavOpen((prev) => !prev)}
                  aria-expanded={isSideNavOpen}
                  aria-label="Toggle navigation menu"
                >
                  <span className={styles.toggleSpan1} />
                  <span className={styles.toggleSpan2} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Sub-Nav Bar (Active on 1024px, 768px, 480px, 420px) */}
        <div
          className={styles.subNav}
          role="navigation"
          aria-label="Core Pillars Sub Navigation"
        >
          <div className="container">
            <div className={styles.subNavInner}>
              <div
                className={`${styles.pillsContainer} ${styles.subNavPills}`}
                role="region"
                aria-label="Core Pillars"
              >
                {corePillars.map((item) => (
                  <a
                    key={`sub-${item.label}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.pillItem}
                    aria-label={`Visit ${item.label} on Yogi & Yathra`}
                  >
                    <span className={styles.pillIcon} style={{ color: item.iconColor }}>
                      {item.icon()}
                    </span>
                    <span className={styles.pillLabel}>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Off-Canvas Responsive SideNav Drawer */}
      <SideNav
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </>
  );
}
