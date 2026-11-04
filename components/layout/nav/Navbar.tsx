"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";
import styles from "./Navbar.module.scss";

interface NavItem {
  label: string;
  href: string;
  targetId: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/#home", targetId: "home" },
  { label: "About", href: "/#about", targetId: "about" },
  { label: "Product", href: "/#product", targetId: "product" },
  { label: "Course", href: "/#course", targetId: "course" },
  { label: "Blogs", href: "/#blogs", targetId: "blogs" },
  { label: "Testimonial", href: "/#testimonial", targetId: "testimonial" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
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

  // Smooth click scroll handler
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
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div className={styles.navbarWrapper}>
          {/* Left Side: Brand Logo */}
          <div className={styles.logoCol}>
            <Link
              href="/#home"
              onClick={(e) => handleNavClick(e, "home")}
              className={styles.logoLink}
            >
              <span className={styles.logoText}>
                Yogi <span className={styles.logoAccent}>&</span> Yathra
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links with Enhanced Animations */}
          <nav className={styles.navCol} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {navLinks.map((item) => {
                const isActive = activeSection === item.targetId;

                return (
                  <li key={item.label} className={styles.navItem}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.targetId)}
                      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    >
                      <span className={styles.navText}>{item.label}</span>
                      {/* Active Indicator with smooth animated glow line */}
                      {isActive && (
                        <span className={styles.activeIndicator}>
                          <span className={styles.activeDot} />
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Side: Contact Icon & Toggle Menu */}
          <div className={styles.actionsCol}>
            {/* Contact Icon */}
            <Link
              href="/#newsletter"
              onClick={(e) => handleNavClick(e, "newsletter")}
              className={styles.contactBtn}
              aria-label="Connect with Sangha"
              title="Connect with Sangha"
            >
              <Phone size={17} className={styles.contactIcon} />
            </Link>

            {/* Toggle Menu Button (Mobile) */}
            <button
              type="button"
              className={`${styles.toggleBtn} ${mobileMenuOpen ? styles.open : ""}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span className={styles.toggleSpan1} />
              <span className={styles.toggleSpan2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container">
          <ul className={styles.mobileNavList}>
            {navLinks.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <li key={item.label} className={styles.mobileNavItem}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ""}`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className={styles.mobileArrow} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
