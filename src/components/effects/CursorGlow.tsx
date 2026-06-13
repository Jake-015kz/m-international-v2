"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * CursorGlow — a soft gradient orb that follows the cursor.
 * - Uses `useMotionValue` + `useSpring` for 60fps without re-renders.
 * - Hidden on mobile and when prefers-reduced-motion is set.
 * - pointer-events-none so it never blocks clicks.
 */
const CursorGlow = memo(function CursorGlow() {
  const reducing = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const springCfg = { stiffness: 120, damping: 18, mass: 0.6 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [x, y, visible],
  );

  const handleLeave = useCallback(() => setVisible(false), []);
  const handleEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    if (reducing) return;
    // Only enable on non-touch devices ("fine" pointer = mouse/stylus)
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [reducing, handleMove, handleLeave, handleEnter]);

  // Track inline so the JSX stays a single expression (no nested ternary)
  const opacity = visible && !reducing ? 1 : 0;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Soft teal-to-gold gradient glow */}
      <div
        className="rounded-full"
        style={{
          width: 280,
          height: 280,
          background:
            "radial-gradient(circle, oklch(72% 0.16 85 / 0.12) 0%, oklch(65% 0.18 60 / 0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Inner brighter core */}
      <div
        className="absolute rounded-full"
        style={{
          width: 60,
          height: 60,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(85% 0.20 85 / 0.18) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </motion.div>
  );
});

export default CursorGlow;
