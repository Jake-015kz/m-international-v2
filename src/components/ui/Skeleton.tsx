"use client";

import { type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton = memo(function Skeleton({
  className,
  variant = "text",
  width,
  height,
  lines = 1,
  style,
  ...props
}: SkeletonProps) {
  const base = "bg-muted overflow-hidden relative";

  const variantClasses = {
    text: "h-4 rounded w-full",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-none",
    rounded: "rounded-lg",
  };

  // Single skeleton
  if (lines <= 1) {
    return (
      <div
        className={cn(base, variantClasses[variant], "anim-shimmer", className)}
        style={{ width, height, ...style }}
        aria-hidden="true"
        role="presentation"
        {...props}
      />
    );
  }

  // Multi-line skeleton (text variant only)
  return (
    <div className="space-y-2" aria-hidden="true" role="presentation">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            base,
            variantClasses[variant],
            "anim-shimmer",
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )}
          style={i === 0 ? { width, height, ...style } : undefined}
        />
      ))}
    </div>
  );
});

export default Skeleton;
