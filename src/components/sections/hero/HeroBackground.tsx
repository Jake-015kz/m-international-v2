"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <Image
          src="/media/hero-bg.png"
          alt="Nature background"
          fill
          className="object-cover opacity-30 sm:opacity-40"
          priority
        />
      </motion.div>

      {/* Radial white glow behind center text — smaller on mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-white/30 rounded-full blur-3xl" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
