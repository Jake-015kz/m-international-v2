"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

/* ── Apple-style line-by-line text reveal ── */

const STAGGER_DELAY = 0;
const LINE_DELAY = 0.1;

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
          ease: [0.16, 1, 0.3, 1],
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

/* ── Word-by-word reveal with blur + opacity (premium hero style) ── */

export function TextRevealWords({
  text,
  className,
  stagger = 0.06,
  initialDelay = 0,
  accentIndex,
  reducedMotion = false,
}: {
  text: string;
  className?: string;
  stagger?: number;
  initialDelay?: number;
  accentIndex?: number; // index of word to highlight with gradient
  reducedMotion?: boolean;
}) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className ?? ""}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={reducedMotion ? false : { opacity: 0, y: "100%", filter: "blur(8px)" }}
            animate={reducedMotion ? false : { opacity: 1, y: "0%", filter: "blur(0px)" }}
            transition={reducedMotion ? undefined : {
              delay: initialDelay + i * stagger,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={reducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Character-by-character reveal for extra premium feel ── */

export function TextRevealChars({
  text,
  className,
  stagger = 0.03,
  initialDelay = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  initialDelay?: number;
}) {
  const chars = text.split("");

  return (
    <span className={className ?? ""}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "100%", filter: "blur(6px)" }}
            animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
            transition={{
              delay: initialDelay + i * stagger,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
