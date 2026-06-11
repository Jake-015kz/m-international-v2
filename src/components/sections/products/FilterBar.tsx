"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  key: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}

const FilterBar = memo(function FilterBar({
  options,
  active,
  onChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      {options.map((opt) => {
        const isActive = opt.key === active;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={cn(
              "relative px-4 py-2 rounded-full text-xs font-unbounded font-bold tracking-wide transition-colors duration-300 min-h-[36px]",
              isActive
                ? "text-white"
                : "text-fg-secondary hover:text-fg-primary bg-bg-elevated border border-border-subtle hover:border-border-default"
            )}
          >
            {/* Active background pill */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="filter-active"
                  className="absolute inset-0 rounded-full bg-accent-500"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default FilterBar;
