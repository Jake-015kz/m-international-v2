"use client";

import { memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxOrbs — extracted from Hero to avoid re-creating useTransform
 * on every Hero render. Memoized + receives scroll progress as prop.
 *
 * Quiet Luxury palette: warm gold / amber tones instead of emerald/violet.
 */
const ParallaxOrbs = memo(function ParallaxOrbs() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <>
      <motion.div
        className="absolute z-[1] pointer-events-none"
        style={{ y: orb1Y, x: orb1X, willChange: "transform" }}
      >
        <div
          className="w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, oklch(72% 0.16 85) 0%, transparent 70%)",
            filter: "blur(80px)",
            position: "absolute",
            top: "10%",
            left: "-5%",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute z-[1] pointer-events-none"
        style={{ y: orb2Y, willChange: "transform" }}
      >
        <div
          className="w-[300px] h-[300px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, oklch(65% 0.18 60) 0%, transparent 70%)",
            filter: "blur(100px)",
            position: "absolute",
            top: "30%",
            right: "-3%",
          }}
        />
      </motion.div>
    </>
  );
});

export default ParallaxOrbs;
