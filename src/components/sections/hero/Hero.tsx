"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "./HeroBackground";
import FloatingCards from "./FloatingCards";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger);

/* ── Desktop-only wrapper: completely removes FloatingCards from DOM on mobile ── */

const FloatingCardsWrapper = memo(function FloatingCardsWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  if (!isDesktop) return null;
  return <FloatingCards />;
});

const Hero = memo(function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -10,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current.parentElement,
            start: "top top",
            end: "50% top",
            scrub: 0.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[100dvh] bg-surface-base overflow-hidden">
      <HeroBackground />

      {/* Floating glass cards — desktop only, not rendered on mobile at all */}
      <FloatingCardsWrapper />

      {/* Center content — parallax layer */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 lg:py-0 will-change-transform">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-6 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-xs font-onest font-medium text-accent-700">Натуральные БАДы премиум класса</span>
          </motion.div>

          {/* Title — gradient text on key phrase */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-unbounded text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-normal mb-4 sm:mb-6"
          >
            <span className="text-text-primary font-black">
              Интеллект природы
            </span>{" "}
            <span className="font-extralight text-text-secondary">
              для вашего здоровья
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-text-secondary font-onest font-light leading-relaxed max-w-xl mb-6 sm:mb-8 px-2"
          >
            Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. 50+ стран.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <CTAButton size="lg" className="w-full sm:w-auto shadow-lg shadow-accent-900/10">Смотреть каталог</CTAButton>
            <CTAButton variant="ghost" size="lg" className="w-full sm:w-auto border border-text-primary/20 hover:border-text-primary/40 hover:bg-text-primary/5">
              О компании
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
