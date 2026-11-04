"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: "Blogs", href: "/#blogs", targetId: "blogs" },
  { label: "Contact", href: "/#newsletter", targetId: "newsletter" },
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
            {/* Left Side: Brand Logo */}
            <div className={styles.logoCol}>
              <Link
                href="/#home"
                onClick={(e) => handleNavClick(e, "home")}
                className={styles.logoLink}
              >
                <span className={styles.logoText}>
                  Yogi<span className={styles.logoAccent}>&amp;</span>Yathra
                </span>
              </Link>
            </div>

            {/* Center: Navigation Links matching landing page sections */}
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

            {/* Right Side: Toggle Menu Button with custom animated spans */}
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
