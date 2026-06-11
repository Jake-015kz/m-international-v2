import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "elevated";
}

export default function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variant === "default" && "bg-white border border-zinc-200/60 shadow-sm",
        variant === "subtle" && "bg-zinc-50/80 border border-zinc-100",
        variant === "elevated" && "bg-white border border-zinc-200/40 shadow-lg shadow-zinc-100/50",
        className
      )}
    >
      {children}
    </div>
  );
}
