"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button/Button";
import styles from "./EmptyCatalogueState.module.scss";

interface EmptyCatalogueStateProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyCatalogueState({
  icon,
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyCatalogueStateProps) {
  return (
    <div className={styles.state} role="status">
      <div className={styles.iconWrap} aria-hidden="true">{icon}</div>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Button href={actionHref} variant="outline" size="sm" icon={<ArrowRight size={15} />}>
        {actionLabel}
      </Button>
    </div>
  );
}
