"use client";

import { motion, AnimatePresence, type Easing } from "framer-motion";
import { type ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

interface AnimateHeightProps {
  children: ReactNode;
  className?: string;
  /** Whether content is visible */
  isOpen?: boolean;
  /** Animation duration in seconds */
  duration?: number;
  /** easing */
  ease?: Easing | Easing[];
}

const DEFAULT_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * AnimateHeight — smoothly animates height when content changes.
 * Useful for FAQ accordions, expandable sections, etc.
 *
 * Usage:
 *   <AnimateHeight isOpen={expanded}>
 *     <p>Content that expands/collapses</p>
 *   </AnimateHeight>
 */
export default function AnimateHeight({
  children,
  className,
  isOpen = true,
  duration = 0.4,
  ease = DEFAULT_EASE,
}: AnimateHeightProps) {
  const reducedMotion = usePrefersReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(isOpen ? "auto" : 0);
  const [isVisible, setIsVisible] = useState(isOpen);

  const measure = useCallback(() => {
    if (contentRef.current) {
      return contentRef.current.scrollHeight;
    }
    return 0;
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(isOpen);
      setHeight("auto");
      return;
    }

    if (isOpen) {
      setIsVisible(true);
      // Measure after render
      requestAnimationFrame(() => {
        const h = measure();
        setHeight(h);
        // After animation, set to auto for dynamic content
        setTimeout(() => setHeight("auto"), duration * 1000);
      });
    } else {
      // First set explicit height, then 0
      const h = measure();
      setHeight(h);
      // Force reflow
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
          setTimeout(() => setIsVisible(false), duration * 1000);
        });
      });
    }
  }, [isOpen, reducedMotion, duration, measure]);

  if (reducedMotion) {
    return isVisible ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className={`overflow-hidden ${className ?? ""}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration, ease }}
        >
          <div ref={contentRef}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
