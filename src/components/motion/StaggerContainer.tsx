"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  /** Amount of container visible before triggering (0-1) */
  amount?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/**
 * StaggerContainer — staggers children on scroll into view.
 * Each direct child gets a fade-up animation with sequential delay.
 *
 * Usage:
 *   <StaggerContainer staggerDelay={0.08}>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *   </StaggerContainer>
 */
export default function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  amount = 0.2,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        ...containerVariants,
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
