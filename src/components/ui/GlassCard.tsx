"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white/40 backdrop-blur-3xl border border-white/20 shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
