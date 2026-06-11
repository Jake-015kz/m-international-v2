"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/* ── Apple-style line-by-line text reveal ──
 *
 * Each child is treated as a separate "line" and revealed sequentially
 * with clip-path + opacity + translateY.  The animation uses a
 * spring-ish cubic-bezier that matches Apple's keynote style.
 *
 * Usage:
 *   <TextReveal>
 *     <span>Line one</span>
 *     <span>Line two</span>
 *   </TextReveal>
 */

const STAGGER_DELAY = 0;          // seconds between each line
const LINE_DELAY = 0.1;          // stagger between lines

/* Per-line wrapper — clips its content during reveal */
function RevealLine({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 28, clipPath: "inset(100% 0 0 0)" }}
        animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
        transition={{
          delay,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],   // Apple-style spring curve
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function TextReveal({
  children,
  className,
  stagger = LINE_DELAY,
  initialDelay = STAGGER_DELAY,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  initialDelay?: number;
}) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childArray.map((child, i) => (
        <RevealLine key={i} delay={initialDelay + i * stagger}>
          {child}
        </RevealLine>
      ))}
    </div>
  );
}

/* ── Single-word / single-char reveal (for hero title emphasis) ── */

export function TextRevealWords({
  text,
  className,
  stagger = 0.06,
  initialDelay = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  initialDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className ?? ""}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              delay: initialDelay + i * stagger,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
