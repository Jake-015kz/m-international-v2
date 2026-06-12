"use client";

import { type ReactNode, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "luxury";
  size?: "sm" | "md" | "lg";
  magneticStrength?: number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
}

interface RippleData {
  id: number;
  x: number;
  y: number;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30",
  secondary:
    "bg-bg-elevated hover:bg-bg-sunken text-fg-primary border border-border-subtle hover:border-border-default shadow-sm",
  ghost:
    "bg-transparent hover:bg-bg-alt text-fg-secondary hover:text-fg-primary",
  outline:
    "bg-transparent border border-border-default hover:border-fg-accent text-fg-primary hover:text-fg-accent",
  luxury:
    "bg-[oklch(16%_0.008_85)] hover:bg-[oklch(22%_0.01_85)] text-[oklch(88%_0.10_85)] border border-[oklch(65%_0.16_85_/_0.2)] hover:border-[oklch(65%_0.16_85_/_0.35)] shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_oklch(65%_0.16_85_/_0.08)] hover:shadow-[0_4px_24px_oklch(65%_0.16_85_/_0.12),0_1px_3px_rgba(0,0,0,0.25)]",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

/* Glow color per variant */
const glowColor: Record<string, string> = {
  primary: "oklch(70% 0.18 60 / 0.35)",
  secondary: "oklch(70% 0.12 85 / 0.2)",
  ghost: "oklch(70% 0.12 85 / 0.15)",
  outline: "oklch(70% 0.16 85 / 0.2)",
  luxury: "oklch(65% 0.16 85 / 0.3)",
};

const MagneticButton = memo(function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  magneticStrength = 0.4,
  disabled,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<RippleData[]>([]);
  const rippleId = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  /* Glow follows cursor inside button */
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springGlowX = useSpring(glowX, { stiffness: 300, damping: 30 });
  const springGlowY = useSpring(glowY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;
      x.set(deltaX);
      y.set(deltaY);
      /* Glow position relative to button center */
      glowX.set(e.clientX - rect.left);
      glowY.set(e.clientY - rect.top);
    },
    [disabled, magneticStrength, x, y, glowX, glowY]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      /* Ripple effect */
      const rect = e.currentTarget.getBoundingClientRect();
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;
      const id = ++rippleId.current;
      setRipples((prev) => [...prev, { id, x: rx, y: ry }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
      onClick?.();
    },
    [disabled, onClick]
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center font-onest font-semibold rounded-xl transition-colors duration-300 overflow-hidden",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {/* ── Glow halo that follows cursor ── */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            x: springGlowX,
            y: springGlowY,
            width: 160,
            height: 160,
            marginLeft: -80,
            marginTop: -80,
            background: `radial-gradient(circle, ${glowColor[variant] || glowColor.primary}, transparent 70%)`,
            filter: "blur(20px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* ── Ripple effects ── */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-white/20"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, opacity: 0.5, marginLeft: 0, marginTop: 0 }}
            animate={{
              width: 300,
              height: 300,
              opacity: 0,
              marginLeft: -150,
              marginTop: -150,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* ── Button content ── */}
      <span className="relative z-10 inline-flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
});

export default MagneticButton;
