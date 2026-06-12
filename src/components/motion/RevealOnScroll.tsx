"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type RevealVariant = "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "none";

interface RevealOnScrollProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const variantMap: Record<RevealVariant, { initial: any; animate: any }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  none: {
    initial: {},
    animate: {},
  },
};

/**
 * RevealOnScroll — universal scroll-triggered reveal with named variants.
 * Replaces ScrollReveal (GSAP dependency) with pure Framer Motion.
 *
 * Usage:
 *   <RevealOnScroll variant="fadeUp" delay={0.1}>...</RevealOnScroll>
 *   <RevealOnScroll variant="blur">...</RevealOnScroll>
 */
export default function RevealOnScroll({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.3,
}: RevealOnScrollProps) {
  const v = variantMap[variant];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
