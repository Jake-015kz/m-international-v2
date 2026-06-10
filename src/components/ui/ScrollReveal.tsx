"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  direction = "up",
}: ScrollRevealProps) {
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
      ? "translateY(30px)"
      : direction === "left"
        ? "translateX(-30px)"
        : direction === "right"
          ? "translateX(30px)"
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
}
