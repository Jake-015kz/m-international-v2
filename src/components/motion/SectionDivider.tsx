"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionDividerProps {
  className?: string;
  variant?: "dot" | "line" | "fade";
}

/**
 * SectionDivider — анимированный разделитель между секциями.
 *
 * Variants:
 * - dot: центральная точка с линиями по бокам
 * - line: тонкая линия, появляющаяся при скролле
 * - fade: мягкий градиентный переход
 *
 * Использование:
 *   <SectionDivider variant="dot" />
 */
export default function SectionDivider({
  className = "",
  variant = "line",
}: SectionDividerProps) {
  if (variant === "dot") {
    return (
      <div className={`flex items-center justify-center gap-4 py-2 ${className}`} aria-hidden="true">
        <motion.div
          className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-border-subtle"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-accent-500/40"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 300 }}
        />
        <motion.div
          className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-border-subtle"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    );
  }

  if (variant === "fade") {
    return (
      <div className={`h-16 md:h-24 ${className}`} aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-b from-transparent via-accent-50/5 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </div>
    );
  }

  // Default: line
  return (
    <div className={`px-6 md:px-12 py-1 ${className}`} aria-hidden="true">
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
