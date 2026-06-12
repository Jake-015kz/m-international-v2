"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const offsetMap = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
};

/**
 * SlideIn — slides in from a direction with fade.
 * Usage: <SlideIn direction="left" delay={0.2}>...</SlideIn>
 */
export default function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.7,
  distance,
  className,
  once = true,
  amount = 0.3,
}: SlideInProps) {
  const base = offsetMap[direction];
  const offset = distance !== undefined
    ? direction === "left"
      ? { x: -distance, y: 0 }
      : direction === "right"
        ? { x: distance, y: 0 }
        : direction === "up"
          ? { x: 0, y: distance }
          : { x: 0, y: -distance }
    : base;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
