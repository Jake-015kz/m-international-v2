"use client";

import { type ReactNode, useRef, useEffect, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Use GSAP ScrollTrigger instead of IntersectionObserver for smoother animations */
  useGsap?: boolean;
}

/* ── GSAP path — single useEffect, no fallback overhead ── */

const GsapReveal = memo(function GsapReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  direction = "up",
}: Omit<ScrollRevealProps, "useGsap">) {
  const ref = useRef<HTMLDivElement>(null);

  const initAnimation = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const directionMap = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: -40 },
      right: { y: 0, x: 40 },
      none: { y: 0, x: 0 },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, ...directionMap[direction] },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: "power3.out" as const,
          scrollTrigger: {
            trigger: el,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, threshold, direction]);

  useEffect(() => {
    return initAnimation();
  }, [initAnimation]);

  return (
    <div ref={ref} className={cn("will-change-[transform,opacity]", className)}>
      {children}
    </div>
  );
});

/* ── IntersectionObserver fallback path ── */

const IoReveal = memo(function IoReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  direction = "up",
}: Omit<ScrollRevealProps, "useGsap">) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const initialTransform =
    direction === "up"
      ? "translateY(40px)"
      : direction === "down"
        ? "translateY(-40px)"
        : direction === "left"
          ? "translateX(-40px)"
          : direction === "right"
            ? "translateX(40px)"
            : "none";

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : initialTransform,
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
});

/* ── Main component — picks one path, no overlap ── */

function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  direction = "up",
  useGsap = true,
}: ScrollRevealProps) {
  if (useGsap) {
    return (
      <GsapReveal
        className={className}
        delay={delay}
        duration={duration}
        threshold={threshold}
        direction={direction}
      >
        {children}
      </GsapReveal>
    );
  }

  return (
    <IoReveal
      className={className}
      delay={delay}
      duration={duration}
      threshold={threshold}
      direction={direction}
    >
      {children}
    </IoReveal>
  );
}

export default ScrollReveal;
