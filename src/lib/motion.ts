"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when user prefers reduced motion.
 * SSR-safe: defaults to false on server, hydrates to actual value.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
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
 * Combined hook: returns true when animations should be disabled
 * (either mobile OR user prefers reduced motion).
 */
export function useShouldDisableAnimations(breakpoint = 768): boolean {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile(breakpoint);
  return prefersReduced || isMobile;
}
