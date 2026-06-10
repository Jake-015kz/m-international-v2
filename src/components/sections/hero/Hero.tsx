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
    <section className="relative min-h-screen bg-[#FBFBFB] overflow-hidden">
      <HeroBackground />

      {/* Floating glass cards with Framer Motion */}
      <FloatingCards />

      {/* Center content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-black/5 text-zinc-600 border border-black/5">
              Международная компания
            </span>
          </motion.div>

          {/* Title — weight contrast: 900 vs 100 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-unbounded text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-normal mb-6"
          >
            <span className="font-black text-[#1A1A1A]">
              Интеллект природы
            </span>{" "}
            <span className="font-extralight text-zinc-500">
              для вашего долголетия
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-zinc-500 font-onest font-light leading-relaxed max-w-xl mb-8"
          >
            Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. Продукция представлена в 50+ странах.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <CTAButton size="lg">Смотреть каталог</CTAButton>
            <CTAButton variant="ghost" size="lg">
              О компании
            </CTAButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom statistics panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 bg-black/5 backdrop-blur-sm py-4 z-20"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-16">
                {i > 0 && <div className="w-px h-8 bg-black/10" />}
                <div className="text-center">
                  <div className="font-unbounded text-sm md:text-base font-bold text-[#1A1A1A]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 font-onest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
