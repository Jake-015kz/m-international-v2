"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer relative overflow-hidden",
          "min-h-[44px]",
          /* ── Focus-visible ring for keyboard navigation ── */
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(55%_0.18_160)] focus-visible:rounded-xl",
          /* ── Primary: Linear/Apple dark button with accent glow ── */
          variant === "primary" && [
            "bg-[oklch(20%_0.01_160)] text-white rounded-xl",
            "border border-white/[0.08]",
            "hover:bg-[oklch(26%_0.01_160)] hover:border-white/[0.12]",
            "active:scale-[0.97]",
            "shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]",
            "hover:shadow-[0_4px_16px_oklch(55%_0.18_160_/_0.12),0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]",
          ],
          /* ── Secondary: Glass / translucent ── */
          variant === "secondary" && [
            "bg-white/[0.06] text-white rounded-xl backdrop-blur-sm",
            "border border-white/[0.1]",
            "hover:bg-white/[0.1] hover:border-white/[0.15]",
            "active:scale-[0.97]",
          ],
          /* ── Ghost: No bg, just text + subtle hover ── */
          variant === "ghost" && [
            "bg-transparent text-text-primary rounded-xl",
            "hover:bg-text-primary/[0.04]",
            "active:scale-[0.97]",
          ],
          /* ── Sizes ── */
          size === "sm" && "px-4 py-2 text-[13px]",
          size === "md" && "px-8 py-3 text-sm",
          size === "lg" && "px-6 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base tracking-[0.01em]",
          className
        )}
        {...props}
      >
        {/* Subtle shine sweep on hover — CSS-only */}
        <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
));

Button.displayName = "Button";
export default Button;
