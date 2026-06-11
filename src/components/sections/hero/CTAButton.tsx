"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import Button from "@/components/ui/Button";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CTAButton = memo(function CTAButton({ children, onClick, variant = "primary", size = "md", className }: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
      className={className}
    >
      <Button onClick={onClick} variant={variant} size={size}>
        {children}
      </Button>
    </motion.div>
  );
});

export default CTAButton;
