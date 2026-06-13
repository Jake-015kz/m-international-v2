"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Animated scroll indicator that fades out as user scrolls.
 * Shows a mouse-wheel animation that responds to scroll progress.
 */
export default function ScrollIndicator() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Mouse shape */}
      <motion.div
        className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-1 h-1.5 rounded-full bg-white/40"
          animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Scroll progress line */}
      <div className="h-8 w-px bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="w-full bg-[oklch(65%_0.16_85)]/50 rounded-full origin-top"
          style={{ height: "100%", scaleY }}
        />
      </div>

      {/* Fade out after 10% scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 20 }).get() > 0.1 ? 0 : 1,
        }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0 }}
      />
    </motion.div>
  );
}
