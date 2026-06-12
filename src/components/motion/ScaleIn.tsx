"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ScaleIn — scale + fade entrance for cards, modals, images.
 * Usage: <ScaleIn scale={0.9} delay={0.1}>...</ScaleIn>
 */
export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.92,
  className,
  once = true,
  amount = 0.3,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
