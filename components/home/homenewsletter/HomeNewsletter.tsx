"use client";

import React, { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SecHead from "@/components/boxes/sechead/SecHead";
import Button from "@/components/ui/button/Button";
import { mindfulEase } from "@/components/ui/animation/motionVariants";
import styles from "./HomeNewsletter.module.scss";

export default function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="newsletter" className={styles.newsletterSection} aria-label="Join our mindful community newsletter">
      <div className="container">
        <motion.div
          className={styles.newsletterCard}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: mindfulEase }}
        >
          {/* Section Header */}
          <SecHead
            eyebrow="JOIN OUR MINDFUL SANGHA"
            title="Receive Weekly *Wisdom* & Sacred Blessings"
            hookWord="Wisdom"
            description="Subscribe to our gentle circular for Vedic teachings, seasonal yoga flows, guided meditation audios, and priority flash collection access."
            align="center"
          />

          {submitted ? (
            <motion.div
              className={styles.successMessage}
              role="status"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: mindfulEase }}
            >
              <div className={styles.successIconBox}>
                <Check size={24} />
              </div>
              <h3 className={styles.successTitle}>Namaste & Welcome to Our Sangha!</h3>
              <p className={styles.successDesc}>
                We have sent a special welcome blessing and your 10% sacred code to <strong>{email}</strong>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.mailIcon} />
                <input
                  type="email"
                  required
                  placeholder="Enter your mindful email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  aria-label="Email Address"
                />
              </div>

              <Button
                variant="primary"
                size="md"
                type="submit"
                icon={<Sparkles size={16} />}
              >
                Join the Sangha
              </Button>
            </form>
          )}

          {/* Perks list */}
          <div className={styles.perksRow}>
            <span className={styles.perk}>✦ 10% Welcome Blessing</span>
            <span className={styles.perkSeparator}>•</span>
            <span className={styles.perk}>✦ Unsubscribe Anytime</span>
            <span className={styles.perkSeparator}>•</span>
            <span className={styles.perk}>✦ Zero Spam Policy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
