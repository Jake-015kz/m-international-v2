import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "glass";
}

export default function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variant === "default" && "bg-black text-white",
        variant === "outline" && "border border-current text-current",
        variant === "glass" && "bg-white/20 backdrop-blur-sm border border-white/20 text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
