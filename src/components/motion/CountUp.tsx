"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { type ReactNode, useRef, useEffect, useState } from "react";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  format?: (n: number) => string;
  once?: boolean;
  amount?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CountUp — animated number counter using Framer Motion.
 * Triggers when element scrolls into view.
 *
 * Usage:
 *   <CountUp to={50} suffix="+" />
 *   <CountUp to={98.5} decimals={1} suffix="%" prefix="~" />
 */
export default function CountUp({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  format,
  once = true,
  amount = 0.3,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount });
  const motionVal = useMotionValue(from);
  const springVal = useSpring(motionVal, { stiffness: 40, damping: 15 });
  const [display, setDisplay] = useState(() =>
    format ? format(from) : from.toFixed(decimals)
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, to, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        setDisplay(format ? format(v) : v.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [isInView, to, from, duration, delay, decimals, format, motionVal]);

  // Spring smoothing for sub-integer jitter
  useEffect(() => {
    const unsub = springVal.on("change", (v) => {
      setDisplay(format ? format(v) : v.toFixed(decimals));
    });
    return unsub;
  }, [springVal, decimals, format]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/**
 * CountUpText — wrapper that renders animated counter inline with text.
 *
 * Usage:
 *   <CountUpText to={50} suffix="+" label="стран" />
 */
export function CountUpText({
  to,
  label,
  ...props
}: CountUpProps & { label: ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <CountUp to={to} {...props} />
      <span className="text-fg-tertiary text-[0.7em]">{label}</span>
    </span>
  );
}
