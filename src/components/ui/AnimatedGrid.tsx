"use client";

import { type ReactNode, useRef, useEffect, useCallback, memo } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  staggerDelay?: number;
  itemClassName?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
}

const gridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const itemVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  },
  down: {
    hidden: { opacity: 0, y: -32, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  },
  left: {
    hidden: { opacity: 0, x: -32, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  },
  right: {
    hidden: { opacity: 0, x: 32, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  },
  none: {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.4,
      },
    }),
  },
};

const AnimatedGrid = memo(function AnimatedGrid({
  children,
  className,
  columns = 3,
  staggerDelay = 0.08,
  itemClassName,
  direction = "up",
}: AnimatedGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const childArray = Array.isArray(children) ? children : [children];
  const variants = itemVariants[direction] || itemVariants.up;

  return (
    <div ref={ref} className={cn("grid gap-4 md:gap-6", gridCols[columns], className)}>
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          custom={i}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
          className={cn("will-change-[transform,opacity]", itemClassName)}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
});

export default AnimatedGrid;
