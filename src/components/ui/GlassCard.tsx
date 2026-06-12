"use client";

import { type ReactNode, type CSSProperties, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "elevated" | "glass" | "glow";
  tilt?: boolean;
  tiltStrength?: number;
  glowColor?: string;
  style?: CSSProperties;
}

const variantStyles: Record<string, string> = {
  default: "bg-bg-elevated border border-border-subtle shadow-sm",
  subtle: "bg-bg-sunken/80 border border-border-subtle",
  elevated:
    "bg-bg-elevated border border-border-subtle shadow-lg shadow-fg-primary/5",
  glass:
    "bg-bg-elevated/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-fg-primary/5",
  glow: "bg-bg-elevated border border-accent-200/50 shadow-lg shadow-accent-500/10",
};

const GlassCard = memo(function GlassCard({
  children,
  className,
  variant = "default",
  tilt = false,
  tiltStrength = 8,
  glowColor = "oklch(55% 0.18 160 / 0.15)",
  style,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]);

  const springConfig = { stiffness: 300, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Glow position follows cursor — compute outside JSX
  const glowX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${String(gx)} ${String(gy)}, ${glowColor} 0%, transparent 60%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relX);
      y.set(relY);
    },
    [tilt, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-2xl overflow-hidden relative",
        variantStyles[variant],
        className
      )}
      style={
        tilt
          ? {
              ...style,
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 800,
              transformStyle: "preserve-3d",
            }
          : style
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={tilt ? { z: 10 } : undefined}
    >
      {/* Dynamic glow following cursor */}
      {tilt && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-0"
          style={{
            background: glowBackground,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});

export default GlassCard;
