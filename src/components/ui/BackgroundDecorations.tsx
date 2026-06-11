"use client";

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
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
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

      {/* Glow orbs — CSS-animated, section only, hidden on mobile.
          Replaced Framer Motion infinite loops with GPU-composited CSS keyframes.
          contain: paint limits blur repaint area.
          Disabled via prefers-reduced-motion in globals.css */}
      {isSection && (
        <div className="blob-container absolute inset-0">
          <div
            className="blob blob-a hidden md:block"
            style={{
              width: "clamp(300px, 30vw, 400px)",
              height: "clamp(300px, 30vw, 400px)",
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.05) 0%, transparent 70%)",
              left: "5%",
              top: "30%",
              filter: "blur(80px)",
            }}
            aria-hidden="true"
          />
          <div
            className="blob blob-c hidden md:block"
            style={{
              width: "clamp(250px, 25vw, 350px)",
              height: "clamp(250px, 25vw, 350px)",
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.04) 0%, transparent 70%)",
              right: "10%",
              bottom: "20%",
              filter: "blur(90px)",
            }}
            aria-hidden="true"
          />
        </div>
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
