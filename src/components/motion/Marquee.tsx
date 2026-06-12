"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { type ReactNode, useRef, useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: number;
}

export default function Marquee({
  children,
  className,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
  gap = 16,
}: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth / 2 + gap / 2);
    }
  }, [children, gap]);

  const directionFactor = direction === "left" ? -1 : 1;

  useAnimationFrame((_, delta) => {
    if (reducedMotion || isPaused || contentWidth === 0) return;
    const move = (speed * directionFactor * delta) / 1000;
    const currentX = x.get();
    let nextX = currentX + move;

    if (direction === "left" && nextX <= -contentWidth) {
      nextX += contentWidth;
    } else if (direction === "right" && nextX >= 0) {
      nextX -= contentWidth;
    }
    x.set(nextX);
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  const gapStyle = { gap: `${gap}px` };

  if (reducedMotion) {
    return (
      <div className={className} ref={containerRef}>
        <div className="flex gap-4 flex-wrap">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="flex w-max" style={{ x }}>
        <div ref={contentRef} className="flex items-center" style={gapStyle}>
          {children}
        </div>
        <div className="flex items-center" style={gapStyle} aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
