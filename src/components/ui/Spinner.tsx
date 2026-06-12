"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const Spinner = memo(function Spinner({
  size = "md",
  className,
  label = "Загрузка...",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-3",
  };

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      aria-label={label}
    >
      <div
        className={cn(
          "rounded-full border-border-subtle border-t-accent-500",
          "animate-[anim-spin_0.6s_linear_infinite]",
          sizeClasses[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
});

export default Spinner;
