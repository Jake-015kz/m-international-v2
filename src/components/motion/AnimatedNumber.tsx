"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { EASE_COUNTER } from "@/lib/motion";

interface AnimatedNumberProps {
  /** Target value */
  value: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix (e.g. "$", "~") */
  prefix?: string;
  /** Suffix (e.g. "+", "%", "K") */
  suffix?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Custom formatter */
  format?: (n: number) => string;
  /** Locale for number formatting */
  locale?: string;
  /** Additional className */
  className?: string;
  /** Whether to trigger on scroll into view (default: true) */
  triggerOnScroll?: boolean;
  /** Amount of element visible before triggering (0-1) */
  amount?: number;
}

/**
 * AnimatedNumber — animated counter with formatting.
 * Triggers when element scrolls into view.
 *
 * Usage:
 *   <AnimatedNumber value={50} suffix="+" />
 *   <AnimatedNumber value={98.5} decimals={1} suffix="%" />
 *   <AnimatedNumber value={10000} locale="ru-RU" />
 */
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  format,
  locale,
  className,
  triggerOnScroll = true,
  amount = 0.3,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 40, damping: 15 });
  const [display, setDisplay] = useState(() => formatNumber(0, decimals, locale, format));
  const [hasAnimated, setHasAnimated] = useState(false);

  const formatDisplay = useCallback(
    (n: number) => formatNumber(n, decimals, locale, format),
    [decimals, locale, format]
  );

  useEffect(() => {
    if (!triggerOnScroll || isInView) {
      setHasAnimated(true);
      const controls = animate(motionVal, value, {
        duration,
        delay,
        ease: EASE_COUNTER,
        onUpdate: (v) => setDisplay(formatDisplay(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, delay, motionVal, triggerOnScroll, formatDisplay]);

  // Spring smoothing
  useEffect(() => {
    if (!hasAnimated) return;
    const unsub = springVal.on("change", (v) => {
      setDisplay(formatDisplay(v));
    });
    return unsub;
  }, [springVal, hasAnimated, formatDisplay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function formatNumber(
  n: number,
  decimals: number,
  locale?: string,
  format?: (n: number) => string
): string {
  if (format) return format(n);
  if (locale) return n.toLocaleString(locale, { maximumFractionDigits: decimals });
  return n.toFixed(decimals);
}
