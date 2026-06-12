"use client";

import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_REVEAL, STAGGER_FAST } from "@/lib/motion";

interface SectionHeaderProps {
  badge?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  /** Enable entrance animation (default: true) */
  animated?: boolean;
  /** Delay before animation starts */
  delay?: number;
}

const SectionHeader = memo(function SectionHeader({
  badge,
  title,
  description,
  className,
  align = "center",
  animated = true,
  delay = 0,
}: SectionHeaderProps) {
  if (!animated) {
    return (
      <div
        className={cn(
          align === "center" && "text-center",
          align === "left" && "text-left",
          className
        )}
      >
        {badge && <div className="mb-4 md:mb-6">{badge}</div>}
        <h2
          className={cn(
            "font-unbounded font-bold text-xl sm:text-2xl md:text-3xl leading-[1.1] tracking-normal text-text-primary",
            "mb-2 md:mb-3"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn(
            "text-sm md:text-base text-text-secondary font-onest font-light leading-relaxed max-w-md",
            align === "center" && "mx-auto",
            align === "left" && "ml-0"
          )}>
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: STAGGER_FAST,
            delayChildren: delay,
          },
        },
      }}
    >
      {badge && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_REVEAL } },
          }}
          className="mb-4 md:mb-6"
        >
          {badge}
        </motion.div>
      )}

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_REVEAL } },
        }}
        className={cn(
          "font-unbounded font-bold text-xl sm:text-2xl md:text-3xl leading-[1.1] tracking-normal text-text-primary",
          "mb-2 md:mb-3"
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_REVEAL } },
          }}
          className={cn(
            "text-sm md:text-base text-text-secondary font-onest font-light leading-relaxed max-w-md",
            align === "center" && "mx-auto",
            align === "left" && "ml-0"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
});

export default SectionHeader;
