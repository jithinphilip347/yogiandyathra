"use client";

import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import styles from "./Navbar.module.scss";

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Course", href: "/course" },
  { label: "Blogs", href: "/blogs" },
  { label: "Testimonial", href: "/testimonial" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.navbar}>
      <div className="container">
      <div className={styles.navbarWrapper}>
        {/* Left Side: Logo */}
        <div className={styles.logoCol}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoText}>
              Yogi <span className={styles.logoAccent}>&</span> Yathra
            </span>
          </Link>

          {/* 
            === Logo Image Placeholder ===
            Uncomment and provide your logo image path below when ready:
            <Link href="/" className={styles.logoImgLink}>
              <Image 
                src="/images/logo.png" 
                alt="Yogi & Yathra" 
                width={150} 
                height={40} 
                priority 
                className={styles.logoImg} 
              />
            </Link>
          */}
        </div>

        {/* Center: Navigation Links */}
        <nav className={styles.navCol} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navLinks.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.label} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className={styles.activeLine} />}
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
            href="/contact"
            className={styles.contactBtn}
            aria-label="Contact Us"
          >
            <Phone size={18} className={styles.contactIcon} />
          </Link>

          {/* Toggle Menu Button (with 2 span tags with custom widths) */}
          <button
            type="button"
            className={styles.toggleBtn}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.toggleSpan1} />
            <span className={styles.toggleSpan2} />
          </button>
        </div>
      </div>
      </div>
    </header>
  );
}
