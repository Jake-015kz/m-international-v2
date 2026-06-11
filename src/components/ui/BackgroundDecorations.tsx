"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface BackgroundDecorationsProps {
  variant?: "section" | "subtle";
  accentColor?: string;
  className?: string;
}

export const BackgroundDecorations = memo(function BackgroundDecorations({
  variant = "section",
  className = "",
}: BackgroundDecorationsProps) {
  const isSection = variant === "section";
  const isSubtle = variant === "subtle";

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Mesh gradient base */}
      {!isSubtle && (
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 50% 40% at 20% 50%, oklch(55% 0.18 160 / 0.03) 0%, transparent 60%)",
              "radial-gradient(ellipse 40% 30% at 80% 40%, oklch(55% 0.18 160 / 0.02) 0%, transparent 55%)",
            ].join(", "),
          }}
        />
      )}

      {/* Glow orbs — section only, hidden on mobile to save GPU */}
      {isSection && (
        <>
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full hidden md:block will-change-transform"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.05) 0%, transparent 70%)",
              left: "5%",
              top: "30%",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full hidden md:block will-change-transform"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.04) 0%, transparent 70%)",
              right: "10%",
              bottom: "20%",
              filter: "blur(90px)",
            }}
            animate={{
              x: [0, -15, 10, 0],
              y: [0, 15, -8, 0],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      {/* Dot grid pattern */}
      {!isSubtle && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, oklch(55% 0.18 160) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
    </div>
  );
});

export default BackgroundDecorations;
