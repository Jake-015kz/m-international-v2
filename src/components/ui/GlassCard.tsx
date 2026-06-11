import { type ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "elevated";
}

const GlassCard = memo(function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variant === "default" && "bg-surface-elevated border border-border-subtle shadow-sm",
        variant === "subtle" && "bg-surface-sunken/80 border border-border-subtle",
        variant === "elevated" && "bg-surface-elevated border border-border-subtle shadow-lg shadow-text-primary/5",
        className
      )}
    >
      {children}
    </div>
  );
});

export default GlassCard;
