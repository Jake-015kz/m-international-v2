"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "hot" | "sale" | "info" | "success";

interface AnimatedBadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-accent-500 text-white",
  hot: "bg-red-500 text-white",
  sale: "bg-amber-500 text-white",
  info: "bg-blue-500 text-white",
  success: "bg-emerald-500 text-white",
};

/**
 * AnimatedBadge — пульсирующий бейдж для новых/акционных элементов.
 * Поддерживает spring-анимацию появления и опциональный pulse-эффект.
 *
 * Использование:
 *   <AnimatedBadge variant="new">Новинка</AnimatedBadge>
 *   <AnimatedBadge variant="hot" pulse>Хит</AnimatedBadge>
 */
export default function AnimatedBadge({
  children,
  variant = "new",
  className,
  pulse = false,
}: AnimatedBadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-onest font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {pulse && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-white/80 mr-1.5"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.span>
  );
}
