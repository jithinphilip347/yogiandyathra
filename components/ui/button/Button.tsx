"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "outlineWhite" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
  target?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  children,
  className = "",
  target,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === "right" && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || target === "_blank";
    if (isExternal) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target={target || "_blank"}
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {content}
    </button>
  );
}
