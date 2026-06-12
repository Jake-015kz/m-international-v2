"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const HeroBackground = memo(function HeroBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* ── Base gradient — deep dark with emerald tint ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(8% 0.005 160) 0%, oklch(12% 0.008 160) 40%, oklch(10% 0.006 160) 100%)",
        }}
      />

      {/* ── Radial glow — top-left, emerald ── */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(55% 0.18 160 / 0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        initial={{ opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Radial glow — bottom-right, subtle ── */}
      <motion.div
        className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(55% 0.18 160 / 0.04) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        initial={{ opacity: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Dot grid — Linear-style, white neutral dots ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(100% 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Noise texture overlay — SVG turbulence, ultra-subtle ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Bottom fade to surface ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent z-[2]" />
    </div>
  );
});

export default HeroBackground;
