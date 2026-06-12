"use client";

import { type ReactNode, type ButtonHTMLAttributes, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  magneticStrength?: number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
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
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

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
    },
    [disabled, magneticStrength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

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
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
});

export default MagneticButton;
