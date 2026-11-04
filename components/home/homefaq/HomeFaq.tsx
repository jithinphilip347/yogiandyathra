"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import SecHead from "@/components/boxes/sechead/SecHead";
import Button from "@/components/ui/button/Button";
import styles from "./HomeFaq.module.scss";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do you guarantee the authenticity of Rudraksha malas?",
    answer:
      "All our sacred Rudraksha beads are ethically handpicked from natural groves in Nepal and Indonesia. Each piece undergoes strict authenticity testing and comes with a certified gemological lab certification guaranteeing natural origin, density, and untreated purity.",
    category: "Sacred Store",
  },
  {
    id: "faq-2",
    question: "Are the Yogify yoga workshops beginner-friendly?",
    answer:
      "Yes! Our workshops range from 'All Levels' gentle breathwork and restorative yoga to advanced Ashtanga masterclasses. Each course card clearly indicates the skill level, and our instructors always offer thoughtful variations for practitioners of all experience levels.",
    category: "Workshops",
  },
  {
    id: "faq-3",
    question: "How do I access live masterclasses after enrolling?",
    answer:
      "Upon enrollment, you will receive an instant confirmation email with calendar integration and a direct high-definition stream link. You can join live from your computer, tablet, or phone, with two-way camera interaction for personal posture corrections.",
    category: "Workshops",
  },
  {
    id: "faq-4",
    question: "What happens if I miss a scheduled live class?",
    answer:
      "Every registered participant receives unlimited access to the recorded session and guided pranayama audio within 12 hours of completion. You can revisit the class anytime at your own pace.",
    category: "Workshops",
  },
  {
    id: "faq-5",
    question: "Do you ship sacred spiritual products worldwide?",
    answer:
      "Yes, we provide insured international shipping to over 45 countries with end-to-end tracking. Products are consecrated, blessed, and carefully cushioned in eco-friendly protective packaging to ensure safe arrival.",
    category: "Shipping",
  },
  {
    id: "faq-6",
    question: "What is your return and satisfaction policy?",
    answer:
      "We provide a 14-day mindful return window for all spiritual artifacts and jewelry. If an item arrives damaged or does not align with your intentions, our compassionate sangha support team will promptly issue an exchange or full refund.",
    category: "Orders",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className={styles.faqSection} aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <SecHead
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything You Need to *Know* Before You Begin"
          hookWord="Know"
          description="Clear answers about our certified Vedic essentials, live workshop accessibility, and worldwide deliveries."
          align="center"
        />

        {/* Accordion Container */}
        <div className={styles.accordionWrapper}>
          <div className={styles.faqList}>
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.id}
                  className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                >
                  <button
                    type="button"
                    className={styles.questionButton}
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className={styles.questionText}>
                      <span className={styles.categoryPill}>{item.category}</span>
                      {item.question}
                    </span>
                    <span className={`${styles.iconWrap} ${isOpen ? styles.iconOpen : ""}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${item.id}`}
                    className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : ""}`}
                    role="region"
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answerText}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need More Assistance Box */}
          <div className={styles.supportBox}>
            <div className={styles.supportInfo}>
              <MessageCircleQuestion size={26} className={styles.supportIcon} />
              <div>
                <h4 className={styles.supportTitle}>Still have questions?</h4>
                <p className={styles.supportDesc}>
                  Our mindful support team is here to assist with workshop bookings and product inquiries.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              href="/contact"
            >
              Contact Our Sangha
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

