"use client";

import { memo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_REVEAL } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** @deprecated useGsap is ignored — always uses Framer Motion */
  useGsap?: boolean;
}

const directionOffset = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { y: 0, x: -30 },
  right: { y: 0, x: 30 },
  none: { y: 0, x: 0 },
};

const ScrollReveal = memo(function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  direction = "up",
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn("will-change-[transform,opacity]", className)}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: EASE_REVEAL }}
    >
      {children}
    </motion.div>
  );
});

export default ScrollReveal;
