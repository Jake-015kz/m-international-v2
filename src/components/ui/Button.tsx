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
          "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer",
          "min-h-[44px]",
          variant === "primary" && "bg-text-primary text-surface-elevated hover:opacity-90 active:scale-[0.98]",
          variant === "secondary" && "bg-surface-elevated/10 text-surface-elevated backdrop-blur-sm border border-surface-elevated/20 hover:bg-surface-elevated/20",
          variant === "ghost" && "bg-transparent hover:bg-surface-elevated/5",
          size === "sm" && "px-4 py-2 text-sm rounded-lg",
          size === "md" && "px-8 py-3 text-base rounded-xl",
          size === "lg" && "px-6 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg rounded-xl",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
));

Button.displayName = "Button";
export default Button;
