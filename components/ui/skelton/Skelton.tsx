"use client";

import React from "react";
import ReactSkeleton, {
  SkeletonProps as ReactSkeletonProps,
  SkeletonTheme,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Skelton.module.scss";

export interface SkeltonProps extends ReactSkeletonProps {
  className?: string;
  theme?: "earth" | "dark" | "default";
}

export default function Skelton({
  className = "",
  theme = "earth",
  baseColor,
  highlightColor,
  ...props
}: SkeltonProps) {
  // Theme color presets harmonized with Yogi & Yathra palette
  const themeColors = {
    earth: {
      base: "#dad6c9",
      highlight: "#eae7dd",
    },
    dark: {
      base: "#24201c",
      highlight: "#35302a",
    },
    default: {
      base: "#ebebeb",
      highlight: "#f5f5f5",
    },
  };

  const selectedTheme = themeColors[theme] || themeColors.earth;
  const resolvedBase = baseColor || selectedTheme.base;
  const resolvedHighlight = highlightColor || selectedTheme.highlight;

  return (
    <ReactSkeleton
      baseColor={resolvedBase}
      highlightColor={resolvedHighlight}
      className={`${styles.skeleton} ${className}`}
      {...props}
    />
  );
}

export { SkeletonTheme };

