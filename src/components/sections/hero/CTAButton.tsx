"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CTAButton({ children, onClick, variant = "primary", size = "md", className }: CTAButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      <Button onClick={onClick} variant={variant} size={size}>
        {children}
      </Button>
    </motion.div>
  );
}
