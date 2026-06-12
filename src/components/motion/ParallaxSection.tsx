"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

const SCROLL_OFFSET = ["start end", "end start"] as const;

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0 = no parallax, 1 = full scroll lock, negative = reverse
}

/**
 * ParallaxSection — applies vertical parallax to its children based on scroll.
 *
 * Usage:
 *   <ParallaxSection speed={0.3}>
 *     <div>Content moves slower than scroll</div>
 *   </ParallaxSection>
 */
export default function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSET as unknown as ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ParallaxLayer — individual layer with configurable speed.
 * Use inside ParallaxSection for multi-layer effects.
 *
 * Usage:
 *   <ParallaxLayer speed={-0.5}>Background moves opposite to scroll</ParallaxLayer>
 */
export function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "transform" }}
      initial={false}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeOnScroll — fades content in/out based on scroll progress.
 *
 * Usage:
 *   <FadeOnScroll>Content fades as you scroll past</FadeOnScroll>
 */
export function FadeOnScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSET as unknown as ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
