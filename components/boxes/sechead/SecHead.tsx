"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button/Button";
import styles from "./SecHead.module.scss";

export interface SecHeadProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  hookWord?: string;
  description?: string | React.ReactNode;
  align?: "left" | "center" | "space-between";
  action?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline" | "outlineWhite" | "ghost";
  };
  theme?: "light" | "dark";
  className?: string;
}

/**
 * Parses and wraps the highlighted hook word in an elegant serif italic tag,
 * ensuring no markdown asterisks leak out to the rendered UI.
 */
function renderFormattedTitle(
  title: string | React.ReactNode,
  hookWord?: string
) {
  if (typeof title !== "string") {
    return title;
  }

  // 1. If title has *word* markdown pattern (e.g. "Transform Your Practice with *Expert-Led* Classes")
  if (/\*([^*]+)\*/.test(title)) {
    const parts = title.split(/\*([^*]+)\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <em key={index} className={styles.italicHook}>
          {part}
        </em>
      ) : (
        part.replace(/\*/g, "")
      )
    );
  }

  // 2. If hookWord is explicitly passed (e.g. hookWord="Loved" or hookWord="Sacred")
  if (hookWord) {
    const cleanTitle = title.replace(/\*/g, "");
    const escaped = hookWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = cleanTitle.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === hookWord.toLowerCase() ? (
        <em key={index} className={styles.italicHook}>
          {part}
        </em>
      ) : (
        part
      )
    );
  }

  return title.replace(/\*/g, "");
}

export default function SecHead({
  eyebrow,
  title,
  hookWord,
  description,
  align = "left",
  action,
  theme = "light",
  className = "",
}: SecHeadProps) {
  const isCentered = align === "center";
  const isSpaceBetween = align === "space-between" && action;

  return (
    <div
      className={`
        ${styles.secHead}
        ${isCentered ? styles.center : ""}
        ${isSpaceBetween ? styles.spaceBetween : ""}
        ${theme === "dark" ? styles.darkTheme : ""}
        ${className}
      `}
    >
      <div className={styles.textGroup}>
        {/* Eyebrow Label */}
        {eyebrow && (
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrowText}>{eyebrow}</span>
          </div>
        )}

        {/* Main Section Title with Italic Hook */}
        <h2 className={styles.title}>
          {renderFormattedTitle(title, hookWord)}
        </h2>

        {/* Optional Section Description */}
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {/* Action CTA Button using reusable Button component */}
      {action && (
        <div className={styles.actionCol}>
          <Button
            variant={action.variant || (theme === "dark" ? "outlineWhite" : "outline")}
            size="sm"
            href={action.href}
            icon={<ArrowRight size={15} />}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}
