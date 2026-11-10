import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Sparkles,
  Heart,
} from "lucide-react";
import styles from "./Footer.module.scss";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = 2026;

  const spiritualStoreLinks = [
    { label: "Rudraksha Malas & Beads", href: "https://www.yogiandyathra.com/products" },
    { label: "Pure Copperware & Vessels", href: "https://www.yogiandyathra.com/products" },
    { label: "Consecrated Yantras", href: "https://www.yogiandyathra.com/products" },
    { label: "Meditation Cushions & Aids", href: "https://www.yogiandyathra.com/products" },
    { label: "Flash Sale & Limited Editions", href: "https://www.yogiandyathra.com/products" },
  ];

  const workshopLinks = [
    { label: "Still & Strong Vinyasa", href: "/#course" },
    { label: "Prana & Breath Mastery", href: "/#course" },
    { label: "Ashtanga Flow Series", href: "/#course" },
    { label: "Restorative Yin & Sound", href: "/#course" },
    { label: "Teacher Training Immersions", href: "/#course" },
  ];

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      {/* Top Pre-Footer Mindful Trust Bar */}
      <div className={styles.trustBar}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <ShieldCheck size={20} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Certified Vedic Authenticity</span>
                <span className={styles.trustDesc}>Lab tested & quality pick</span>
              </div>
            </div>

            <div className={styles.trustDivider} aria-hidden="true" />

            <div className={styles.trustItem}>
              <Sparkles size={20} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Yoga Alliance Certified Acharyas</span>
                <span className={styles.trustDesc}>Lineage rooted master guidance</span>
              </div>
            </div>

            <div className={styles.trustDivider} aria-hidden="true" />

            <div className={styles.trustItem}>
              <Heart size={20} className={styles.trustIcon} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>100% Ethical & Sustainable</span>
                <span className={styles.trustDesc}>Supporting artisan temple sanghas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className={styles.mainFooter}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Column 1 (Left Side): Brand Story & Social Media Icon */}
            <div className={styles.brandCol}>
              <Link href="/#home" className={styles.logoLink}>
                <span className={styles.logoText}>
                  Yogi <span className={styles.logoAccent}>&</span> Yathra
                </span>
              </Link>
              <p className={styles.brandTagline}>
                Mindful Living · Sacred Yathra · Spiritual Store · Workshops
              </p>
              <p className={styles.brandBio}>
                Rooted in authentic Himalayan and Vedic traditions. Bridging certified sacred spiritual artifacts with transformative master led yoga immersions for conscious seekers worldwide.
              </p>

              {/* Social Channels Underneath */}
              <div className={styles.socialRow}>
                <a
                  href="https://www.instagram.com/yogify.yy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Follow Yogi & Yathra on Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Spiritual Store Categories */}
            <div className={styles.linkCol}>
              <h4 className={styles.colHeading}>
                <span>Spiritual Store</span>
              </h4>
              <ul className={styles.linkList}>
                {spiritualStoreLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Workshop Categories */}
            <div className={styles.linkCol}>
              <h4 className={styles.colHeading}>
                <span>Workshop</span>
              </h4>
              <ul className={styles.linkList}>
                {workshopLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 (Last Right Side): Contact Details */}
            <div className={styles.contactCol}>
              <h4 className={styles.colHeading}>
                <span>Contact Us</span>
              </h4>
              <div className={styles.contactList}>
                <a href="mailto:yy.yogify@gmail.com" className={styles.contactItem}>
                  <Mail size={16} className={styles.contactIcon} />
                  <span>yy.yogify@gmail.com</span>
                </a>
                <a href="tel:+917994219909" className={styles.contactItem}>
                  <Phone size={16} className={styles.contactIcon} />
                  <span>+91 7994219909</span>
                </a>
                <div className={styles.contactItem}>
                  <MapPin size={16} className={styles.contactIcon} />
                  <span>
                    Yogify, Srividya Yoga Gurukulam, Elavoor Kavala, Karukutty, Angamaly, Kerala 683576
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Legal & Developer Credits */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomWrapper}>
            <div className={styles.copyrightCol}>
              <p className={styles.copyrightText}>
                © {currentYear} Yogi &amp; Yathra. All rights reserved.
              </p>
            </div>

            <div className={styles.legalLinks}>
              <Link href="/#about" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <span className={styles.legalDot}>•</span>
              <Link href="/#about" className={styles.legalLink}>
                Terms &amp; Conditions
              </Link>
            </div>

            <div className={styles.developerCol}>
              <a
                href="https://varixialabs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.developerLink}
                aria-label="Developed by Varixia Labs"
              >
                <span className={styles.developerText}>Developed by</span>
                <Image
                  src="/images/design-logo.png"
                  alt="VATL - Varixia Labs"
                  width={48}
                  height={28}
                  className={styles.vatlLogo}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
