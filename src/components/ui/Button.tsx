"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "luxury";
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
          /* ── Focus-visible ring ── */
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(65%_0.16_85)] focus-visible:rounded-xl",
          /* ── Primary: Quiet Luxury dark button with gold glow ── */
          variant === "primary" && [
            "bg-[oklch(16%_0.008_85)] text-white rounded-xl",
            "border border-[oklch(65%_0.16_85_/_0.15)]",
            "hover:bg-[oklch(22%_0.01_85)] hover:border-[oklch(65%_0.16_85_/_0.3)]",
            "active:scale-[0.97]",
            "shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]",
            "hover:shadow-[0_4px_24px_oklch(65%_0.16_85_/_0.12),0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]",
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
          /* ── Luxury: Gold outline, glass fill — signature CTA ── */
          variant === "luxury" && [
            "bg-[oklch(65%_0.16_85_/_0.08)] text-[oklch(88%_0.12_85)] rounded-xl",
            "border border-[oklch(65%_0.16_85_/_0.25)]",
            "hover:bg-[oklch(65%_0.16_85_/_0.14)] hover:border-[oklch(65%_0.16_85_/_0.4)]",
            "active:scale-[0.97]",
            "shadow-[0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_oklch(65%_0.16_85_/_0.1)]",
            "hover:shadow-[0_4px_32px_oklch(65%_0.16_85_/_0.15),0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_oklch(65%_0.16_85_/_0.15)]",
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
