"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /** Trigger on scroll into view (default: true = whileInView) */
  once?: boolean;
  /** Amount of element visible before triggering (0-1) */
  amount?: number;
}

const offsetMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { y: 0, x: 0 },
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FadeIn — directional fade + translate on scroll.
 * Usage: <FadeIn direction="up" delay={0.1}>...</FadeIn>
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
  once = true,
  amount = 0.3,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsetMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
