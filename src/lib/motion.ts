"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   Easing presets
   ═══════════════════════════════════════════════════════ */

/** Smooth expo-out — fast start, gentle end. Best for reveals. */
export const EASE_REVEAL = [0.16, 1, 0.3, 1] as const;

/** Slower, more dramatic. Hero entrances, large elements. */
export const EASE_DRAMATIC = [0.22, 1, 0.36, 1] as const;

/** Subtle, quick. Micro-interactions, hovers, small fades. */
export const EASE_SUBTLE = [0.25, 0.46, 0.45, 0.94] as const;

/** Bouncy spring feel via cubic-bezier. Playful CTAs. */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

/** Standard ease-out for counters and numbers. */
export const EASE_COUNTER = [0.16, 1, 0.3, 1] as const;

/** Linear — for marquee / infinite animations. */
export const EASE_LINEAR = "linear" as const;

/* ═══════════════════════════════════════════════════════
   Duration presets (seconds)
   ═══════════════════════════════════════════════════════ */

export const DUR_FAST = 0.3;
export const DUR_NORMAL = 0.5;
export const DUR_SLOW = 0.7;
export const DUR_DRAMATIC = 1.0;

/* ═══════════════════════════════════════════════════════
   Stagger presets
   ═══════════════════════════════════════════════════════ */

export const STAGGER_FAST = 0.04;
export const STAGGER_NORMAL = 0.08;
export const STAGGER_SLOW = 0.12;

/* ═══════════════════════════════════════════════════════
   Hooks
   ═══════════════════════════════════════════════════════ */

/**
 * Returns true when user prefers reduced motion.
 * Uses framer-motion's built-in hook for consistency.
 * SSR-safe: defaults to false on server.
 */
export function usePrefersReducedMotion(): boolean {
  const shouldReduce = useReducedMotion();
  return shouldReduce ?? false;
}

/**
 * Returns true when viewport is mobile (< 768px).
 * SSR-safe: defaults to false on server.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Combined hook: returns true when heavy animations should be disabled
 * (either mobile OR user prefers reduced motion).
 */
export function useShouldDisableAnimations(breakpoint = 768): boolean {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(breakpoint);
  return prefersReduced || isMobile;
}

/**
 * useMediaQuery — generic media query hook.
 * SSR-safe: defaults to provided `defaultVal` on server.
 *
 * Usage:
 *   const isDark = useMediaQuery("(prefers-color-scheme: dark)");
 */
export function useMediaQuery(query: string, defaultVal = false): boolean {
  const [matches, setMatches] = useState(defaultVal);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/**
 * useViewportSize — returns current viewport width and height.
 * SSR-safe: returns { width: 0, height: 0 } on server.
 */
export function useViewportSize(): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
