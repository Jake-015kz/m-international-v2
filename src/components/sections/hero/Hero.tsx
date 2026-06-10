"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import FloatingCards from "./FloatingCards";
import CTAButton from "./CTAButton";

const stats = [
  { value: "10 000+", label: "клиентов" },
  { value: "50+", label: "стран" },
  { value: "15 лет", label: "опыта" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-[#FBFBFB] overflow-hidden">
      <HeroBackground />

      {/* Floating glass cards — hidden on mobile, visible from lg */}
      <div className="hidden lg:block">
        <FloatingCards />
      </div>

      {/* Center content */}
      <div className="relative z-10 container mx-auto px-4 min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 lg:py-0">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide bg-black/10 text-zinc-800 border border-black/5 shadow-sm">
              Международная компания
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

          {/* Mobile-only: inline stats below CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex lg:hidden justify-center items-center gap-6 sm:gap-8 mt-10 sm:mt-12 border-t border-black/5 pt-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <div className="w-px h-8 sm:h-10 bg-black/10" />}
                <div className="text-center">
                  <div className="font-unbounded text-sm sm:text-base font-bold text-[#1A1A1A] tracking-wide">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 font-onest">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom statistics panel — desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="hidden lg:block absolute bottom-0 left-0 right-0 bg-black/5 backdrop-blur-sm py-4 z-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-16">
                {i > 0 && <div className="w-px h-10 bg-black/10" />}
                <div className="text-center">
                  <div className="font-unbounded text-base md:text-lg font-bold text-[#1A1A1A] tracking-wide">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 font-onest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-zinc-400 font-onest tracking-wider">SCROLL</span>
          <div className="w-px h-6 bg-gradient-to-b from-zinc-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
