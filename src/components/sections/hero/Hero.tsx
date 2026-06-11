"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "./HeroBackground";
import FloatingCards from "./FloatingCards";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "10 000+", label: "Клиентов" },
  { value: "50+", label: "Стран" },
  { value: "15 лет", label: "Опыта" },
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      if (statsRef.current) {
        gsap.to(statsRef.current, {
          y: 20,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: statsRef.current.parentElement,
            start: "top top",
            end: "40% top",
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

      {/* Floating glass cards — hidden on mobile, visible from lg */}
      <div className="hidden lg:block">
        <FloatingCards />
      </div>

      {/* Center content — parallax layer */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 lg:py-0 will-change-transform">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Title — weight contrast: 900 vs 200 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-unbounded text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-normal mb-4 sm:mb-6"
          >
            <span className="font-black text-text-primary">
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
            <CTAButton variant="ghost" size="lg" className="w-full sm:w-auto">
              О компании
            </CTAButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom statistics — inline text, not metric cards */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden lg:block absolute bottom-0 left-0 right-0 py-5 z-20 will-change-transform"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 md:gap-12 text-text-tertiary font-onest text-sm">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-12">
                {i > 0 && <div className="w-px h-6 bg-border-subtle" />}
                <span>
                  <strong className="font-unbounded text-base md:text-lg font-bold text-text-primary">{stat.value}</strong>
                  {" "}{stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile stats — inline, below CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="lg:hidden flex justify-center items-center gap-6 sm:gap-8 mt-10 sm:mt-12 text-text-tertiary font-onest text-xs sm:text-sm"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-6 sm:gap-8">
            {i > 0 && <div className="w-px h-6 sm:h-8 bg-border-subtle" />}
            <span>
              <strong className="font-unbounded text-sm sm:text-base font-bold text-text-primary">{stat.value}</strong>
              {" "}{stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
