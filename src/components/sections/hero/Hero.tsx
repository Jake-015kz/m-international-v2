"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Globe, CalendarDays } from "lucide-react";
import HeroBackground from "./HeroBackground";
import FloatingCards from "./FloatingCards";
import CTAButton from "./CTAButton";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated counter hook ── */
function useCountUp(end: number, duration: number = 2, suffix: string = "", prefix: string = "") {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          setCount(Math.round(obj.val));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration]);

  return { ref, display: `${prefix}${count.toLocaleString("ru-RU")}${suffix}` };
}

/* ── Stat card with icon ── */
function StatCard({ icon, value, label, delay }: { icon: React.ReactNode; value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <span className="font-unbounded text-lg md:text-2xl font-bold text-[#1A1A1A] tracking-tight">
        {value}
      </span>
      <span className="text-[10px] md:text-xs text-zinc-500 font-onest font-medium uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

const stats = [
  {
    icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
    value: "10 000+",
    label: "Клиентов",
    delay: 0.1,
  },
  {
    icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
    value: "50+",
    label: "Стран",
    delay: 0.2,
  },
  {
    icon: <CalendarDays className="w-5 h-5 md:w-6 md:h-6" />,
    value: "15 лет",
    label: "Опыта",
    delay: 0.3,
  },
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax: content fades & moves up faster than background
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
    <section className="relative min-h-[100dvh] bg-[#FBFBFB] overflow-hidden">
      <HeroBackground />

      {/* Floating glass cards — hidden on mobile, visible from lg */}
      <div className="hidden lg:block">
        <FloatingCards />
      </div>

      {/* Center content — parallax layer (moves faster than bg) */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 lg:py-0 will-change-transform">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide bg-black/10 text-zinc-800 border border-black/5 shadow-sm">
              M-International
            </span>
          </motion.div>

          {/* Title — weight contrast: 900 vs 100 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-unbounded text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-normal mb-4 sm:mb-6"
          >
            <span className="font-black text-[#1A1A1A]">
              Интеллект природы
            </span>{" "}
            <span className="font-extralight text-zinc-500">
              для вашего здоровья
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-zinc-500 font-onest font-light leading-relaxed max-w-xl mb-6 sm:mb-8 px-2"
          >
            Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. 50+ стран.
          </motion.p>

          {/* CTA Buttons — full width on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <CTAButton size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-900/10">Смотреть каталог</CTAButton>
            <CTAButton variant="ghost" size="lg" className="w-full sm:w-auto">
              О компании
            </CTAButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom statistics panel — desktop only, parallax fade */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="hidden lg:block absolute bottom-0 left-0 right-0 bg-black/5 backdrop-blur-sm py-5 z-20 will-change-transform"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-12 md:gap-20">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-12 md:gap-20">
                {i > 0 && <div className="w-px h-12 bg-black/10" />}
                <StatCard
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={stat.delay}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile stats — inline, below CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="lg:hidden flex justify-center items-center gap-8 sm:gap-10 mt-10 sm:mt-12 border-t border-black/5 pt-6"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-8 sm:gap-10">
            {i > 0 && <div className="w-px h-8 sm:h-10 bg-black/10" />}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                {stat.icon}
              </div>
              <span className="font-unbounded text-sm sm:text-base font-bold text-[#1A1A1A]">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 font-onest uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
