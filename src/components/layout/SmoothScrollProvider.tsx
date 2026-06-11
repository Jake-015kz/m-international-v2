"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Disable Lenis on mobile OR reduced-motion for performance & accessibility
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
          }
        }
      }
    };

    // Handle skip-link: move focus to target after scroll
    const handleSkipLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const skipLink = target.closest('.skip-link');
      if (skipLink) {
        const href = skipLink.getAttribute('href');
        if (href === '#main-content') {
          e.preventDefault();
          const el = document.querySelector('#main-content');
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 0.8 });
            // Move focus to main content for screen readers
            const mainEl = el as HTMLElement;
            if (!mainEl.hasAttribute('tabindex')) {
              mainEl.setAttribute('tabindex', '-1');
            }
            setTimeout(() => mainEl.focus({ preventScroll: true }), 900);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("click", handleSkipLink);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("click", handleSkipLink);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
