"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * CSS-only Hero Background with Aurora mesh gradient.
 * Layer 1: Deep dark base (oklch(8% 0.005 160))
 * Layer 2: Aurora — 3 radial gradients (emerald, violet, amber) with CSS animation
 * Layer 3: Dot grid overlay (Linear-style)
 * Layer 4: Noise texture
 * Layer 5: Bottom fade to surface
 */
const HeroBackground = memo(function HeroBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* ── Layer 1: Deep dark base ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "oklch(6% 0.004 160)",
        }}
      />

      {/* ── Layer 2: Aurora mesh gradient ── */}
      {/* Emerald glow — top-left */}
      <motion.div
        className="absolute top-[-25%] left-[-15%] w-[70%] h-[70%] rounded-full pointer-events-none aurora-blob aurora-blob-1"
        style={{
          background:
            "radial-gradient(circle, oklch(55% 0.2 160 / 0.1) 0%, transparent 65%)",
          filter: "blur(80px)",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0 }}
        animate={
          reducedMotion
            ? { opacity: 0.8 }
            : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.04, 1], x: [0, 2, 0], y: [0, -1, 0] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet glow — top-right */}
      <motion.div
        className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full pointer-events-none aurora-blob aurora-blob-2"
        style={{
          background:
            "radial-gradient(circle, oklch(55% 0.22 290 / 0.08) 0%, transparent 65%)",
          filter: "blur(90px)",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0 }}
        animate={
          reducedMotion
            ? { opacity: 0.6 }
            : { opacity: [0.4, 0.7, 0.4], scale: [1, 0.97, 1], x: [0, -1.5, 0], y: [0, 1.5, 0] }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Amber glow — bottom-center */}
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full pointer-events-none aurora-blob aurora-blob-3"
        style={{
          background:
            "radial-gradient(circle, oklch(65% 0.18 80 / 0.06) 0%, transparent 65%)",
          filter: "blur(100px)",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0 }}
        animate={
          reducedMotion
            ? { opacity: 0.5 }
            : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1], x: [0, 1, 0], y: [0, -1, 0] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* ── Layer 3: Dot grid — Linear-style ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(100% 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Layer 4: Noise texture ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Layer 5: Bottom fade to surface ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface-base to-transparent z-[2]" />
    </div>
  );
});

export default HeroBackground;
