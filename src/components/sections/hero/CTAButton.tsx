"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantMap = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
} as const;

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
} as const;

const CTAButton = memo(function CTAButton({ children, onClick, variant = "primary", size = "md", className }: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ borderColor: "oklch(1 0 0 / 0.2)", filter: "brightness(115%)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
      className={className}
    >
      <Button onClick={onClick} variant={variantMap[variant]} size={sizeMap[size]}>
        {children}
      </Button>
    </motion.div>
  );
});

export default CTAButton;
